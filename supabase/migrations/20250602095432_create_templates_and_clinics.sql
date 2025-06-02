create table public.templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  preview_image_url text,
  created_at timestamp with time zone default now()
);

create table public.clinics (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade,
  name text not null,
  subdomain text not null unique,
  template_id uuid references public.templates(id),
  settings jsonb default '{}'::jsonb,
  created_at timestamp with time zone default now()
);
