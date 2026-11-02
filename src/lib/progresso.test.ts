import { describe, expect, it } from "vitest";
import { aulaCompleta } from "./progresso";

describe("conclusão automática da aula", () => {
  it("conclui quando todos os passos foram vistos", () => {
    expect(aulaCompleta([1, 2, 3, 4, 5, 6], 6)).toBe(true);
  });
  it("não conclui se faltar um passo", () => {
    expect(aulaCompleta([1, 2, 3, 5, 6], 6)).toBe(false);
  });
});
