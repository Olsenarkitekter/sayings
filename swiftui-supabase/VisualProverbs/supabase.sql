create extension if not exists pgcrypto;

create table if not exists public.proverbs (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  image_url text,
  category text,
  language text not null default 'da',
  favorite_count integer not null default 0 check (favorite_count >= 0),
  created_at timestamptz not null default now()
);

create index if not exists proverbs_created_at_idx on public.proverbs (created_at desc);
create index if not exists proverbs_category_idx on public.proverbs (category);
create index if not exists proverbs_language_idx on public.proverbs (language);

alter table public.proverbs enable row level security;

create policy "Public can read proverbs"
  on public.proverbs
  for select
  using (true);

create or replace function public.adjust_proverb_favorite_count(proverb_id uuid, amount integer)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  next_count integer;
begin
  if amount not in (-1, 1) then
    raise exception 'Favorite count adjustment must be -1 or 1';
  end if;

  update public.proverbs
     set favorite_count = greatest(0, favorite_count + amount)
   where id = proverb_id
   returning favorite_count into next_count;

  if next_count is null then
    raise exception 'Proverb not found: %', proverb_id;
  end if;

  return next_count;
end;
$$;

grant usage on schema public to anon, authenticated;
grant select on public.proverbs to anon, authenticated;
grant execute on function public.adjust_proverb_favorite_count(uuid, integer) to anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'proverb-images',
  'proverb-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;
