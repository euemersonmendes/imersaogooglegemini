import { useSyncExternalStore } from "react";
import type { User } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";
import { desvincularUsuario, vincularUsuario } from "./progresso";

export type Sessao = { carregando: boolean; user: User | null; admin: boolean; nome: string };

const INICIAL: Sessao = { carregando: true, user: null, admin: false, nome: "" };
let estado: Sessao = INICIAL;
let iniciado = false;
const ouvintes = new Set<() => void>();

function definir(novo: Sessao) {
  estado = novo;
  ouvintes.forEach((o) => o());
}

async function aplicar(user: User | null) {
  if (!user) {
    desvincularUsuario();
    return definir({ carregando: false, user: null, admin: false, nome: "" });
  }
  const [{ data: admin }, { data: perfil }] = await Promise.all([
    supabase.rpc("has_role", { _user_id: user.id, _role: "admin" }),
    supabase.from("profiles").select("nome").eq("id", user.id).maybeSingle(),
    vincularUsuario(user.id),
  ]);
  definir({ carregando: false, user, admin: !!admin, nome: perfil?.nome || user.email || "" });
}

function iniciar() {
  if (iniciado || typeof window === "undefined") return;
  iniciado = true;
  void supabase.auth.getUser().then(({ data }) => aplicar(data.user ?? null));
  supabase.auth.onAuthStateChange((evento, s) => {
    if (evento !== "SIGNED_IN" && evento !== "SIGNED_OUT" && evento !== "USER_UPDATED") return;
    if ((s?.user?.id ?? null) === (estado.user?.id ?? null) && evento === "SIGNED_IN") return;
    void aplicar(s?.user ?? null);
  });
}

function assinar(cb: () => void) {
  iniciar();
  ouvintes.add(cb);
  return () => ouvintes.delete(cb);
}

export function useSessao(): Sessao {
  return useSyncExternalStore(assinar, () => estado, () => INICIAL);
}

export async function sair() {
  await supabase.auth.signOut();
}
