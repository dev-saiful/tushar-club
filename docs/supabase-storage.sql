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

drop policy if exists "Admin upload club images" on storage.objects;

create policy "Admin upload club images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'club-images'
  and (storage.foldername(name))[1] in ('projects', 'gallery')
  and exists (
    select 1
    from public.admin_users
    where id = (select auth.uid())
  )
);