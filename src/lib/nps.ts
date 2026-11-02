/** NPS = % promotores (9–10) − % detratores (0–6). */
export function calcularNps(notas: number[]) {
  const total = notas.length;
  const promotores = notas.filter((n) => n >= 9).length;
  const detratores = notas.filter((n) => n <= 6).length;
  const neutros = total - promotores - detratores;
  const nps = total ? Math.round(((promotores - detratores) / total) * 100) : 0;
  return { total, promotores, neutros, detratores, nps };
}

export function media(valores: (number | null | undefined)[]) {
  const v = valores.filter((x): x is number => typeof x === "number");
  return v.length ? Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 10) / 10 : 0;
}
