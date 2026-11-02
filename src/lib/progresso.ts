import { useSyncExternalStore } from "react";

import { supabase } from "@/integrations/supabase/client";

const CHAVE = "imersao-gemini:v2";

export type Progresso = {
  /** Aulas concluídas ("1.1"). */
  concluidas: string[];
  /** Passos vistos por aula (índice 1-based). */
  vistos: Record<string, number[]>;
  /** Checklists marcados: chave "1.1" → índices. */
  checks: Record<string, number[]>;
  /** Autoavaliações: chave "4.4/2" → índice → nota. */
  notas: Record<string, Record<number, number>>;
  ultimo?: { aula: string; passo: number };
};

const VAZIO: Progresso = { concluidas: [], vistos: {}, checks: {}, notas: {} };

let estado: Progresso | null = null;
let usuario: string | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;
const ouvintes = new Set<() => void>();

function chave() {
  return usuario ? `${CHAVE}:${usuario}` : CHAVE;
}

/** Ao entrar: carrega o progresso salvo na conta (ou envia o local, se a conta ainda não tem). */
export async function vincularUsuario(id: string) {
  usuario = id;
  estado = null;
  const local = ler();
  const { data } = await supabase.from("progresso").select("dados").eq("user_id", id).maybeSingle();
  if (data?.dados && Object.keys(data.dados as object).length) {
    estado = { ...VAZIO, ...(data.dados as Partial<Progresso>) };
    try {
      window.localStorage.setItem(chave(), JSON.stringify(estado));
    } catch {
      /* sem armazenamento */
    }
    ouvintes.forEach((o) => o());
  } else if (local !== VAZIO) {
    enviar(local);
  }
}

export function desvincularUsuario() {
  usuario = null;
  estado = VAZIO;
  ouvintes.forEach((o) => o());
}

function enviar(p: Progresso) {
  if (!usuario) return;
  const id = usuario;
  clearTimeout(timer);
  timer = setTimeout(() => {
    void supabase
      .from("progresso")
      .upsert({ user_id: id, dados: p as never, concluidas: p.concluidas.length, atualizado_em: new Date().toISOString() }, { onConflict: "user_id" });
  }, 800);
}

function ler(): Progresso {
  if (estado) return estado;
  try {
    const bruto = window.localStorage.getItem(chave());
    estado = bruto ? { ...VAZIO, ...(JSON.parse(bruto) as Partial<Progresso>) } : VAZIO;
  } catch {
    estado = VAZIO;
  }
  return estado;
}

function gravar(novo: Progresso) {
  estado = novo;
  try {
    window.localStorage.setItem(chave(), JSON.stringify(novo));
  } catch {
    /* armazenamento bloqueado: segue em memória */
  }
  enviar(novo);
  ouvintes.forEach((o) => o());
}

function assinar(cb: () => void) {
  ouvintes.add(cb);
  return () => ouvintes.delete(cb);
}

export function useProgresso(): Progresso {
  return useSyncExternalStore(assinar, ler, () => VAZIO);
}

export function marcarVisto(aula: string, passo: number) {
  const s = ler();
  const atuais = s.vistos[aula] ?? [];
  if (s.ultimo?.aula === aula && s.ultimo.passo === passo && atuais.includes(passo)) return;
  gravar({
    ...s,
    ultimo: { aula, passo },
    vistos: { ...s.vistos, [aula]: atuais.includes(passo) ? atuais : [...atuais, passo] },
  });
}

export function alternarConcluida(aula: string, valor?: boolean) {
  const s = ler();
  const tem = s.concluidas.includes(aula);
  const quer = valor ?? !tem;
  if (quer === tem) return;
  gravar({ ...s, concluidas: quer ? [...s.concluidas, aula] : s.concluidas.filter((a) => a !== aula) });
}

export function alternarCheck(chave: string, item: number) {
  const s = ler();
  const atual = s.checks[chave] ?? [];
  const novo = atual.includes(item) ? atual.filter((i) => i !== item) : [...atual, item];
  gravar({ ...s, checks: { ...s.checks, [chave]: novo } });
}

export function darNota(chave: string, item: number, nota: number) {
  const s = ler();
  gravar({ ...s, notas: { ...s.notas, [chave]: { ...(s.notas[chave] ?? {}), [item]: nota } } });
}

export function zerarProgresso() {
  gravar(VAZIO);
}
