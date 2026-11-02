import { TOTAL_AULAS_CURSO } from "@/lib/certificado";

export type AlunoMetrica = { concluidas: number; certificado: "emitido" | "revogado" | "nenhum"; admin: boolean; turma: string | null };

/** Métricas de impacto: contas de administrador não contam como alunos. */
export function calcularMetricas(lista: AlunoMetrica[], total = TOTAL_AULAS_CURSO) {
  const alunos = lista.filter((a) => !a.admin);
  const inscritos = alunos.length;
  const aulasConcluidas = alunos.reduce((s, a) => s + Math.min(a.concluidas, total), 0);
  const concluiram = alunos.filter((a) => a.concluidas >= total).length;
  const certificados = alunos.filter((a) => a.certificado === "emitido" || (a.certificado === "nenhum" && a.concluidas >= total)).length;
  const comecaram = alunos.filter((a) => a.concluidas > 0).length;
  const taxaConclusao = inscritos ? Math.round((concluiram / inscritos) * 100) : 0;
  const andamentoMedio = inscritos ? Math.round((aulasConcluidas / (inscritos * total)) * 100) : 0;
  return { inscritos, aulasConcluidas, concluiram, certificados, comecaram, taxaConclusao, andamentoMedio };
}
