import { TOTAL_AULAS_CURSO } from "@/lib/certificado";
import type { AlunoStatus } from "@/lib/conta.functions";

export function resumoTurma(alunos: AlunoStatus[]) {
  const n = alunos.length;
  const soma = alunos.reduce((s, a) => s + a.concluidas, 0);
  return {
    alunos: n,
    comecaram: alunos.filter((a) => a.concluidas > 0 || a.ultima_aula).length,
    concluiram: alunos.filter((a) => a.concluidas >= TOTAL_AULAS_CURSO).length,
    certificados: alunos.filter((a) => a.certificado === "emitido").length,
    media: n ? Math.round((soma / n / TOTAL_AULAS_CURSO) * 100) : 0,
  };
}
