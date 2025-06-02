create table public.content_blocks (
  id uuid primary key default gen_random_uuid(),
  clinic_id uuid references public.clinics(id) on delete cascade,
  type text not null,
  data jsonb not null default '{}'::jsonb,
  "order" integer not null,
  created_at timestamp with time zone default now()
);