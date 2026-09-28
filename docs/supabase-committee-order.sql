-- Run this in the Supabase SQL Editor for the project used by the app.
-- Adds an explicit, admin-controlled display order for committee members so
-- the public section no longer depends on insertion (created_at) timing.

alter table public.committee_members
  add column if not exists display_order integer not null default 0;

-- Backfill existing rows from the previous ordering (oldest first) so nothing
-- visibly changes until an admin reorders someone.
with ranked as (
  select id, row_number() over (order by created_at) - 1 as rn
  from public.committee_members
)
update public.committee_members c
set display_order = r.rn
from ranked r
where c.id = r.id
  and c.display_order <> r.rn;

-- The public section reads every member once and sorts in the database.
create index if not exists committee_members_order_idx
  on public.committee_members (display_order);
