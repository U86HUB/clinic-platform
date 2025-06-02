-- Enable RLS
alter table public.clinics enable row level security;
alter table public.content_blocks enable row level security;
alter table public.blog_posts enable row level security;

-- RLS Policy for clinics
create policy "Allow owners to manage their own clinics"
  on public.clinics
  for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- RLS Policy for content_blocks
create policy "Allow content editing by clinic owner"
  on public.content_blocks
  for all
  using (
    exists (
      select 1 from public.clinics
      where clinics.id = content_blocks.clinic_id
      and clinics.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.clinics
      where clinics.id = content_blocks.clinic_id
      and clinics.owner_id = auth.uid()
    )
  );

-- RLS Policy for blog_posts
create policy "Allow blog management by clinic owner"
  on public.blog_posts
  for all
  using (
    exists (
      select 1 from public.clinics
      where clinics.id = blog_posts.clinic_id
      and clinics.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.clinics
      where clinics.id = blog_posts.clinic_id
      and clinics.owner_id = auth.uid()
    )
  );
