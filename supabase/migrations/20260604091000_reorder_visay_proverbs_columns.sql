-- Reorder Visay proverb columns for easier editing in Supabase Table Editor.
-- Keeps all rows and recreates the table with language quote/description pairs.

begin;

do $$
declare
  existing_count integer;
begin
  select count(*) into existing_count from public.proverbs;
  if existing_count <> 81 then
    raise exception 'Expected 81 proverbs before reorder, found %', existing_count;
  end if;
end;
$$;

lock table public.proverbs in access exclusive mode;

alter table public.proverbs rename to proverbs_column_order_backup_20260604;

create table public.proverbs (
  id text primary key default (gen_random_uuid())::text,
  category text,
  quote_en text,
  description_en text,
  quote_da text,
  description_da text,
  quote_de text,
  description_de text,
  quote_es text,
  description_es text,
  quote_no text,
  description_no text,
  quote_la text,
  description_la text,
  quote_it text,
  description_it text,
  quote_fr text,
  description_fr text,
  quote_fo text,
  description_fo text,
  image_url text,
  favorite_count integer not null default 0 check (favorite_count >= 0),
  created_at timestamptz not null default now()
);

insert into public.proverbs (
  id,
  category,
  quote_en,
  description_en,
  quote_da,
  description_da,
  quote_de,
  description_de,
  quote_es,
  description_es,
  quote_no,
  description_no,
  quote_la,
  description_la,
  quote_it,
  description_it,
  quote_fr,
  description_fr,
  quote_fo,
  description_fo,
  image_url,
  favorite_count,
  created_at
)
select
  id,
  category,
  quote_en,
  description_en,
  quote_da,
  description_da,
  quote_de,
  description_de,
  quote_es,
  description_es,
  quote_no,
  description_no,
  quote_la,
  description_la,
  quote_it,
  description_it,
  quote_fr,
  description_fr,
  quote_fo,
  description_fo,
  image_url,
  favorite_count,
  created_at
from public.proverbs_column_order_backup_20260604;

do $$
declare
  reordered_count integer;
begin
  select count(*) into reordered_count from public.proverbs;
  if reordered_count <> 81 then
    raise exception 'Expected 81 proverbs after reorder, found %', reordered_count;
  end if;
end;
$$;

drop table public.proverbs_column_order_backup_20260604;

create index if not exists proverbs_created_at_idx on public.proverbs (created_at desc);
create index if not exists proverbs_category_idx on public.proverbs (category);

alter table public.proverbs enable row level security;

create policy "Public can read proverbs"
  on public.proverbs
  for select
  using (true);

grant usage on schema public to anon, authenticated;
grant select on public.proverbs to anon, authenticated;

create or replace function public.adjust_proverb_favorite_count(proverb_id text, amount integer)
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

grant execute on function public.adjust_proverb_favorite_count(text, integer) to anon, authenticated;

commit;
