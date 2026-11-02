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
  /** Momento da última alteração (ms), para decidir entre cópia local e da conta. */
  em?: number;
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
  const remoto = data?.dados as Partial<Progresso> | undefined;
  const localMaisNovo = local !== VAZIO && (local.em ?? 0) > (remoto?.em ?? 0);
  if (remoto && Object.keys(remoto).length && !localMaisNovo) {
    estado = { ...VAZIO, ...remoto };
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
  descarregar();
  usuario = null;
  estado = VAZIO;
  ouvintes.forEach((o) => o());
}

let pendente: { id: string; p: Progresso } | null = null;

function descarregar() {
  clearTimeout(timer);
  if (!pendente) return;
  const { id, p } = pendente;
  pendente = null;
  void supabase
    .from("progresso")
    .upsert({ user_id: id, dados: p as never, concluidas: p.concluidas.length, atualizado_em: new Date().toISOString() }, { onConflict: "user_id" })
    .then(({ error }) => {
      if (error) console.error("Falha ao salvar progresso", error.message);
    });
}

if (typeof window !== "undefined") {
  window.addEventListener("pagehide", descarregar);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") descarregar();
  });
}

function enviar(p: Progresso) {
  if (!usuario) return;
  pendente = { id: usuario, p };
  clearTimeout(timer);
  timer = setTimeout(descarregar, 400);
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

function gravar(dados: Progresso) {
  const novo = { ...dados, em: Date.now() };
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

/** Aula conta como concluída quando todos os passos foram vistos. */
export function aulaCompleta(vistos: number[], totalPassos: number) {
  return totalPassos > 0 && Array.from({ length: totalPassos }, (_, k) => k + 1).every((p) => vistos.includes(p));
}

export function marcarVisto(aula: string, passo: number, totalPassos = 0) {
  const s = ler();
  const atuais = s.vistos[aula] ?? [];
  const novos = atuais.includes(passo) ? atuais : [...atuais, passo];
  const concluir = !s.concluidas.includes(aula) && aulaCompleta(novos, totalPassos);
  if (!concluir && s.ultimo?.aula === aula && s.ultimo.passo === passo && atuais.includes(passo)) return;
  gravar({
    ...s,
    ultimo: { aula, passo },
    vistos: { ...s.vistos, [aula]: novos },
    concluidas: concluir ? [...s.concluidas, aula] : s.concluidas,
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
