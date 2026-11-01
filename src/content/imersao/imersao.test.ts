import { describe, expect, it } from "vitest";
import { acharAula, aulas, aulaVizinha, passosDa } from "./index";
import { tokenPara, tokenValido } from "@/lib/acesso.server";

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

describe("código da turma", () => {
  it("aceita SEBRAE-GNIA (sem diferenciar maiúsculas)", async () => {
    const t = await tokenPara(" sebrae-gnia ");
    expect(t).toBeTruthy();
    expect(await tokenValido(t!)).toBe(true);
  });
  it("recusa código errado e cookie falso", async () => {
    expect(await tokenPara("ERRADO")).toBeNull();
    expect(await tokenValido("abc")).toBe(false);
    expect(await tokenValido(undefined)).toBe(false);
  });
});
