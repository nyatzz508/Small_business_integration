-- enable uuid extension
create extension if not exists "pgcrypto";

create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  role text default 'owner',
  created_at timestamptz default now()
);

create table businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_user_id uuid references users(id) on delete cascade,
  timezone text not null default 'America/New_York',
  phone_number text,
  service_zips text[],
  created_at timestamptz default now()
);

create table calls (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  direction text check (direction in ('inbound','outbound')) default 'inbound',
  from_number text,
  to_number text,
  started_at timestamptz,
  ended_at timestamptz,
  transcription text,
  metadata jsonb,
  created_at timestamptz default now()
);

create table leads (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  call_id uuid references calls(id),
  name text,
  phone text,
  service_type text,
  details text,
  status text default 'new',
  created_at timestamptz default now()
);

create table appointments (
  id uuid primary key default gen_random_uuid(),
  business_id uuid references businesses(id) on delete cascade,
  lead_id uuid references leads(id),
  scheduled_for timestamptz,
  status text default 'scheduled',
  created_at timestamptz default now()
);
