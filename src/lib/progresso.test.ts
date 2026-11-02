import { describe, expect, it } from "vitest";
import { podeConcluir } from "./progresso";

describe("regra de conclusão da aula", () => {
  it("só permite concluir com todos os itens do checklist marcados", () => {
    expect(podeConcluir([0, 1, 2, 3], 4)).toBe(true);
  });
  it("bloqueia a conclusão enquanto faltar um item do checklist", () => {
    expect(podeConcluir([0, 2, 3], 4)).toBe(false);
    expect(podeConcluir([], 4)).toBe(false);
  });
});
