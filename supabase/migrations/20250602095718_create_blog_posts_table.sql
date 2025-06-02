create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid references public.clinics(id) on delete cascade,
  title text not null,
  slug text not null,
  body text,
  metadata jsonb default '{}'::jsonb,
  status text default 'draft',
  published_at timestamp,
  created_at timestamp with time zone default now()
);