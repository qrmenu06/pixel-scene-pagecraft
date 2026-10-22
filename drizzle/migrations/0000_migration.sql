create type public.app_role as enum ('admin');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "own roles readable" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create table public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  services text[] not null default '{}',
  package_slug text,
  sector text,
  description text not null,
  start_time text,
  name text not null,
  business text,
  email text,
  phone text,
  ip_hash text,
  status text not null default 'new'
);
grant select, update on public.quote_requests to authenticated;
grant all on public.quote_requests to service_role;
alter table public.quote_requests enable row level security;
create policy "admins read quotes" on public.quote_requests for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "admins update quotes" on public.quote_requests for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create index quote_requests_ip_created on public.quote_requests (ip_hash, created_at desc);