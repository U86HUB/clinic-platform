create table public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  role text not null default 'clinic-owner',
  created_at timestamp with time zone default now()
);