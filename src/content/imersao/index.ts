import type { Aula, Modulo, Passo } from "./tipos";
import { modulo1 } from "./modulo-1";
import { modulo2 } from "./modulo-2";
import { modulo3 } from "./modulo-3";
import { modulo4 } from "./modulo-4";
import { modulo5 } from "./modulo-5";

export const BOOK = {
  selo: "Book digital · Sebrae Maranhão · Para micro e pequenos empresários",
  nome: "Imersão Gemini",
  tituloAntes: "Imersão",
  tituloAcento: "Gemini",
  chamada:
    "Para quem toca o próprio negócio: o instrutor mostra a função, você faz na sua conta e já aplica em vendas, atendimento, divulgação e gestão da sua empresa. Acompanhe pelo telão ou pelo seu notebook: a tela é a mesma.",
  chamadaCelular: "Gemini para micro e pequenos empresários. Reveja os passos, copie os prompts e confira cada resultado.",
};

export const modulos: Modulo[] = [modulo1, modulo2, modulo3, modulo4, modulo5];

export type PassoObjetivo = { tipo: "objetivo"; rotulo: string; titulo: string };
export type PassoCompleto = PassoObjetivo | Passo;

export type AulaInfo = { aula: Aula; modulo: Modulo; indice: number };

export const aulas: AulaInfo[] = modulos.flatMap((modulo) => modulo.aulas.map((aula) => ({ aula, modulo, indice: 0 }))).map((a, indice) => ({ ...a, indice }));

export function acharAula(n: string): AulaInfo | undefined {
  return aulas.find((a) => a.aula.n === n);
}

/** Passos da aula com o "Objetivo" gerado como passo 1. */
export function passosDa(aula: Aula): PassoCompleto[] {
  return [{ tipo: "objetivo", rotulo: "Objetivo", titulo: aula.titulo }, ...aula.passos];
}

export function aulaVizinha(info: AulaInfo, delta: 1 | -1): AulaInfo | undefined {
  return aulas[info.indice + delta];
}

export const ROTULO_TIPO: Record<PassoCompleto["tipo"], string> = {
  objetivo: "Objetivo",
  tela: "Tela",
  prompt: "Prompt",
  texto: "Texto para copiar",
  catalogo: "O modelo",
  mapa: "Mapa",
  anatomia: "Anatomia do prompt",
  comparacao: "Por que conferir",
  avaliacao: "Diagnóstico rápido",
  resultado: "Resultado esperado",
};

export function contarPrompts(aula: Aula) {
  return aula.passos.filter((p) => p.tipo === "prompt" || p.tipo === "anatomia").length;
}
