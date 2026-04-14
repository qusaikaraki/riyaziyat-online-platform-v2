create extension if not exists "pgcrypto";

create table if not exists public.student_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  student_name text not null,
  parent_name text not null,
  phone text not null,
  grade text not null,
  preferred_language text not null,
  notes text default '',
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.student_profiles enable row level security;

create policy "Students can read own profile"
on public.student_profiles
for select
to authenticated
using (auth.uid() = user_id);

create policy "Students can update own profile"
on public.student_profiles
for update
to authenticated
using (auth.uid() = user_id);

create policy "Service role full access to student_profiles"
on public.student_profiles
for all
to service_role
using (true)
with check (true);

create or replace function public.handle_student_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_student_profiles_updated_at on public.student_profiles;
create trigger trg_student_profiles_updated_at
before update on public.student_profiles
for each row execute procedure public.handle_student_profiles_updated_at();
