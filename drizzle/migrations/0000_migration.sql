create type public.app_role as enum ('admin', 'aluno');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null default '',
  email text not null default '',
  turma text,
  criado_em timestamptz not null default now()
);
grant select, update on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create policy "ver próprio perfil ou admin" on public.profiles for select to authenticated
  using (id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "editar próprio perfil" on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());
create policy "ver próprios papéis" on public.user_roles for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));

create table public.turmas (
  codigo text primary key,
  nome text not null default '',
  ativa boolean not null default true,
  criado_em timestamptz not null default now()
);
grant all on public.turmas to service_role;
grant select, insert, update, delete on public.turmas to authenticated;
alter table public.turmas enable row level security;
create policy "admin gerencia turmas" on public.turmas for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
insert into public.turmas (codigo, nome) values ('IMERSAO-GEMINI', 'Turma inicial');

create table public.progresso (
  user_id uuid primary key,
  dados jsonb not null default '{}'::jsonb,
  concluidas int not null default 0,
  atualizado_em timestamptz not null default now()
);
grant select, insert, update on public.progresso to authenticated;
grant all on public.progresso to service_role;
alter table public.progresso enable row level security;
create policy "ler próprio progresso ou admin" on public.progresso for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "inserir próprio progresso" on public.progresso for insert to authenticated
  with check (user_id = auth.uid());
create policy "atualizar próprio progresso" on public.progresso for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

create table public.certificados (
  user_id uuid primary key,
  codigo uuid not null default gen_random_uuid() unique,
  emitido_em timestamptz not null default now(),
  revogado boolean not null default false
);
grant select, insert, update, delete on public.certificados to authenticated;
grant all on public.certificados to service_role;
alter table public.certificados enable row level security;
create policy "ver próprio certificado ou admin" on public.certificados for select to authenticated
  using (user_id = auth.uid() or public.has_role(auth.uid(), 'admin'));
create policy "aluno emite o próprio ao concluir" on public.certificados for insert to authenticated
  with check (user_id = auth.uid() and revogado = false
    and exists (select 1 from public.progresso p where p.user_id = auth.uid() and p.concluidas >= 20));
create policy "admin gerencia certificados" on public.certificados for all to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Perfil automático; o primeiro usuário cadastrado vira administrador.
create or replace function public.novo_usuario()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, nome, email, turma)
  values (new.id, coalesce(new.raw_user_meta_data->>'nome', ''), coalesce(new.email, ''), new.raw_user_meta_data->>'turma');
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  insert into public.user_roles (user_id, role) values (new.id, 'aluno') on conflict do nothing;
  return new;
end $$;
create trigger ao_criar_usuario after insert on auth.users
  for each row execute function public.novo_usuario();