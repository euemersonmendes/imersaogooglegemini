import { describe, expect, it } from "vitest";
import { acharAula, aulas, aulaVizinha, BOOK, passosDa } from "./index";
import { TOTAL_AULAS_CURSO, certificadoLiberado } from "@/lib/certificado";

describe("imersão", () => {
  it("aulas têm números únicos", () => {
    const ns = aulas.map((a) => a.aula.n);
    expect(new Set(ns).size).toBe(ns.length);
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
  it("o curso tem 20 aulas", () => {
    expect(aulas.length).toBe(TOTAL_AULAS_CURSO);
  });
  it("o certificado declara 16 horas de carga horária", () => {
    expect(BOOK.cargaHoraria).toBe("16 horas");
  });
});
