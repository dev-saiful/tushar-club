-- Run this in the Supabase SQL Editor for the project used by the app.

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'club-images',
  'club-images',
  true,
  6291456,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set public = true,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

-- Members of the public upload their own photo with a membership application.
-- Access is scoped to the 'members' folder so visitors can never overwrite
-- project or gallery images; admins still review every photo before approval.
drop policy if exists "Public upload member photos" on storage.objects;

create policy "Public upload member photos"
on storage.objects
for insert
to anon, authenticated
with check (
  bucket_id = 'club-images'
  and (storage.foldername(name))[1] = 'members'
);

drop policy if exists "Admin upload club images" on storage.objects;

create policy "Admin upload club images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'club-images'
  and (storage.foldername(name))[1] in ('projects', 'gallery', 'committee')
  and exists (
    select 1
    from public.admin_users
    where id = (select auth.uid())
  )
);

-- Membership applications store the uploaded photo URL from the public form,
-- and approved members keep it once they appear in the committee list.
alter table public.membership_applications
  add column if not exists photo_url text;

alter table public.committee_members
  add column if not exists photo_url text;