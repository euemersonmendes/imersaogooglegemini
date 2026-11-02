import { describe, expect, it } from "vitest";
import { acharAula, aulas, aulaVizinha, BOOK, passosDa } from "./index";
import { TOTAL_AULAS_CURSO, certificadoLiberado } from "@/lib/certificado";

describe("imersão", () => {
  it("aulas têm números únicos", () => {
    const ns = aulas.map((a) => a.aula.n);
    expect(new Set(ns).size).toBe(ns.length);
  });
  it("cada aula termina com o exercício prático do negócio", () => {
    for (const a of aulas) {
      const fim = a.aula.passos.at(-1);
      expect(fim?.tipo, `aula ${a.aula.n} não termina com o passo resultado`).toBe("resultado");
      if (fim?.tipo !== "resultado") continue;
      const { exercicio } = fim;
      expect(exercicio, `aula ${a.aula.n} sem exercício prático`).toBeDefined();
      expect(exercicio!.situacao.length).toBeGreaterThan(10);
      expect(exercicio!.tarefa.length).toBeGreaterThanOrEqual(2);
      expect(exercicio!.entrega.length).toBeGreaterThan(5);
      expect(exercicio!.tarefa.some((t) => t.includes("[[")), `aula ${a.aula.n} sem lacuna para os dados do aluno`).toBe(true);
    }
  });
  it("prompts copiáveis são reais: sem cenário fictício e com lacuna para os dados do aluno", () => {
    for (const a of aulas)
      for (const p of a.aula.passos) {
        if (p.tipo !== "prompt") continue;
        expect(p.prompt.toLowerCase(), `aula ${a.aula.n}: "${p.nomePrompt}" ainda é fictício`).not.toMatch(/fict[ií]ci/);
      }
  });
  it("o passo 1 de toda aula é o Objetivo", () => {
    for (const a of aulas) expect(passosDa(a.aula)[0]!.tipo).toBe("objetivo");
  });
  it("primeira aula sem anterior e última sem próxima", () => {
    expect(aulaVizinha(aulas[0]!, -1)).toBeUndefined();
    expect(aulaVizinha(aulas.at(-1)!, 1)).toBeUndefined();
    expect(acharAula("1.1")).toBeDefined();
  });
});

describe("certificado", () => {
  it("libera ao concluir as 20 aulas", () => {
    expect(certificadoLiberado(20, false)).toBe(true);
  });
  it("não libera com 19 aulas", () => {
    expect(certificadoLiberado(19, false)).toBe(false);
  });
  it("não libera quando revogado pelo administrador", () => {
    expect(certificadoLiberado(20, true)).toBe(false);
  });
  it("a imersão tem 20 aulas", () => {
    expect(aulas.length).toBe(TOTAL_AULAS_CURSO);
  });
  it("o certificado declara 16 horas de carga horária", () => {
    expect(BOOK.cargaHoraria).toBe("16 horas");
  });
});
