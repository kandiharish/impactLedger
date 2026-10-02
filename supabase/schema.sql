-- =====================================================================
--  The Impact Ledger — Supabase schema
--  Run once in: Supabase Dashboard → SQL Editor → New query → Run.
--  Safe to re-run: every statement is idempotent.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1. Admins
--    Only users listed here can create/edit content. Everyone else
--    (including the public website) can only read published content.
-- ---------------------------------------------------------------------
create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- True when the person making the request is a listed admin.
-- "security definer" lets it read the admins table even though
-- regular visitors are not allowed to.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;


-- ---------------------------------------------------------------------
-- 2. Content tables
-- ---------------------------------------------------------------------
create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  description text not null default '',
  icon_name   text not null default '',
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.stories (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  summary         text not null,
  content         text not null,
  category        text not null,
  author_name     text not null,
  author_role     text not null default '',
  author_avatar   text not null default '',     -- initials, e.g. "AM"
  featured_image  text not null,                -- image URL
  published_date  date not null default current_date,
  reading_time    text not null default '',     -- e.g. "5 min read"
  is_featured     boolean not null default false,
  is_editors_pick boolean not null default false,
  status          text not null default 'draft' check (status in ('draft', 'published')),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table if not exists public.magazine_issues (
  id                uuid primary key default gen_random_uuid(),
  issue_number      text not null,              -- e.g. "Vol. 12"
  title             text not null,
  month             text not null,              -- e.g. "June"
  year              text not null,              -- e.g. "2026"
  release_date      date not null,              -- used for ordering, newest first
  cover_image       text not null,
  editors_note      text not null default '',
  featured_articles text[] not null default '{}',
  pdf_url           text,                       -- the uploaded magazine PDF
  pages_base_url    text,                       -- folder of page images 01.webp, 02.webp … for the reader
  page_count        int,
  is_trending       boolean not null default false,
  is_most_read      boolean not null default false,
  status            text not null default 'draft' check (status in ('draft', 'published')),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- Columns added after the first release (no-ops on fresh installs)
alter table public.magazine_issues add column if not exists pages_base_url text;
alter table public.magazine_issues add column if not exists page_count int;

create table if not exists public.interviews (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  interviewee  text not null,
  position     text not null default '',
  organization text not null default '',
  photo        text not null,
  quote        text not null default '',
  highlights   text[] not null default '{}',
  questions    jsonb not null default '[]',     -- [{ "q": "...", "a": "..." }]
  status       text not null default 'draft' check (status in ('draft', 'published')),
  created_at   timestamptz not null default now()
);

create table if not exists public.testimonials (
  id           uuid primary key default gen_random_uuid(),
  quote        text not null,
  author       text not null,
  role         text not null default '',
  organization text not null default '',
  sort_order   int  not null default 0,
  created_at   timestamptz not null default now()
);

create table if not exists public.faqs (
  id         uuid primary key default gen_random_uuid(),
  question   text not null,
  answer     text not null,
  sort_order int  not null default 0,
  created_at timestamptz not null default now()
);


-- ---------------------------------------------------------------------
-- 3. Inbox tables (filled by the public forms, read by admins)
-- ---------------------------------------------------------------------
create table if not exists public.submissions (
  id             uuid primary key default gen_random_uuid(),
  organization   text not null,
  contact_person text not null,
  email          text not null,
  story_title    text not null,
  category       text not null,
  summary        text not null,
  impact_metrics text not null,
  status         text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at     timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  email        text not null,
  organization text,
  subject      text not null,
  message      text not null,
  is_read      boolean not null default false,
  created_at   timestamptz not null default now()
);


-- ---------------------------------------------------------------------
-- 4. Keep updated_at current on edits
-- ---------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists stories_touch on public.stories;
create trigger stories_touch before update on public.stories
  for each row execute function public.touch_updated_at();

drop trigger if exists magazine_issues_touch on public.magazine_issues;
create trigger magazine_issues_touch before update on public.magazine_issues
  for each row execute function public.touch_updated_at();


-- ---------------------------------------------------------------------
-- 5. Row Level Security (RLS) — who may do what
--    With RLS on, a table is locked by default; each policy below
--    opens exactly one door.
-- ---------------------------------------------------------------------
alter table public.admins           enable row level security;
alter table public.categories       enable row level security;
alter table public.stories          enable row level security;
alter table public.magazine_issues  enable row level security;
alter table public.interviews       enable row level security;
alter table public.testimonials     enable row level security;
alter table public.faqs             enable row level security;
alter table public.submissions      enable row level security;
alter table public.contact_messages enable row level security;

-- Admins can see who the admins are (nobody can change it from the website)
drop policy if exists "admins read admins" on public.admins;
create policy "admins read admins" on public.admins
  for select using (public.is_admin());

-- Public read: always-visible content
drop policy if exists "public read categories" on public.categories;
create policy "public read categories" on public.categories for select using (true);

drop policy if exists "public read testimonials" on public.testimonials;
create policy "public read testimonials" on public.testimonials for select using (true);

drop policy if exists "public read faqs" on public.faqs;
create policy "public read faqs" on public.faqs for select using (true);

-- Public read: only published items (drafts stay hidden); admins see everything
drop policy if exists "public read stories" on public.stories;
create policy "public read stories" on public.stories
  for select using (status = 'published' or public.is_admin());

drop policy if exists "public read magazines" on public.magazine_issues;
create policy "public read magazines" on public.magazine_issues
  for select using (status = 'published' or public.is_admin());

drop policy if exists "public read interviews" on public.interviews;
create policy "public read interviews" on public.interviews
  for select using (status = 'published' or public.is_admin());

-- Admin write: full control over all content tables
do $$
declare t text;
begin
  foreach t in array array['categories','stories','magazine_issues','interviews','testimonials','faqs'] loop
    execute format('drop policy if exists "admin write %1$s" on public.%1$I', t);
    execute format(
      'create policy "admin write %1$s" on public.%1$I for all using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- Forms: anyone may send; only admins may read, update or delete
drop policy if exists "public insert submissions" on public.submissions;
create policy "public insert submissions" on public.submissions
  for insert with check (status = 'pending');

drop policy if exists "admin manage submissions" on public.submissions;
create policy "admin manage submissions" on public.submissions
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public insert contact" on public.contact_messages;
create policy "public insert contact" on public.contact_messages
  for insert with check (is_read = false);

drop policy if exists "admin manage contact" on public.contact_messages;
create policy "admin manage contact" on public.contact_messages
  for all using (public.is_admin()) with check (public.is_admin());


-- ---------------------------------------------------------------------
-- 6. File storage buckets
--    "media"     → cover images and story photos (public, images only)
--    "magazines" → magazine PDFs (public to read)
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('media',     'media',     true, 10485760, array['image/jpeg','image/png','image/webp','image/avif']),
  ('magazines', 'magazines', true, 52428800, array['application/pdf'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Anyone can view files in these buckets; only admins can add, replace or remove them
drop policy if exists "public read media files" on storage.objects;
create policy "public read media files" on storage.objects
  for select using (bucket_id in ('media', 'magazines'));

drop policy if exists "admin upload files" on storage.objects;
create policy "admin upload files" on storage.objects
  for insert with check (bucket_id in ('media', 'magazines') and public.is_admin());

drop policy if exists "admin update files" on storage.objects;
create policy "admin update files" on storage.objects
  for update using (bucket_id in ('media', 'magazines') and public.is_admin());

drop policy if exists "admin delete files" on storage.objects;
create policy "admin delete files" on storage.objects
  for delete using (bucket_id in ('media', 'magazines') and public.is_admin());
