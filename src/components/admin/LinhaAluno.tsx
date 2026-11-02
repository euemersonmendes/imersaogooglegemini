import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { Award, FileDown, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { definirCertificado, removerAluno, type AlunoStatus } from "@/lib/conta.functions";
import { TOTAL_AULAS_CURSO } from "@/lib/certificado";
import { cn } from "@/lib/utils";
import { PdfCertificado } from "@/components/admin/PdfCertificado";

export function dataCurta(d: string | null) {
  return d ? new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" }) : "—";
}

export function LinhaAluno({ a, aoMudar, semTurma = false }: { a: AlunoStatus; aoMudar: () => void; semTurma?: boolean }) {
  const cert = useServerFn(definirCertificado);
  const remover = useServerFn(removerAluno);
  const [confirmar, setConfirmar] = useState(false);
  const pct = Math.round((a.concluidas / TOTAL_AULAS_CURSO) * 100);
  const mCert = useMutation({
    mutationFn: (acao: "emitir" | "revogar") => cert({ data: { userId: a.id, acao } }),
    onSuccess: (_r, acao) => { toast.success(acao === "emitir" ? "Certificado emitido." : "Certificado revogado."); aoMudar(); },
    onError: () => toast.error("Não foi possível alterar o certificado."),
  });
  const mRem = useMutation({
    mutationFn: () => remover({ data: { userId: a.id } }),
    onSuccess: (r) => { if (r.ok) { toast.success("Acesso removido."); aoMudar(); } else toast.error(r.erro); },
  });

  return (
    <tr className="border-b border-linha align-top last:border-0">
      <td className="py-3 pr-3">
        <p className="font-semibold">{a.nome || "—"} {a.admin && <span className="ml-1 rounded bg-cobre-suave px-1.5 py-0.5 text-[10px] font-bold uppercase text-cobre-texto">admin</span>}</p>
        <p className="text-xs text-apagado">{a.email}</p>
      </td>
      {!semTurma && <td className="py-3 pr-3 font-mono text-xs">{a.turma ?? "—"}</td>}
      <td className="py-3 pr-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-24 overflow-hidden rounded-full bg-linha">
            <div className="h-full bg-verde" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-xs"><b>{pct}%</b> · {a.concluidas}/{TOTAL_AULAS_CURSO} aulas</span>
        </div>
        <p className="mt-1 text-xs text-apagado">{a.ultima_aula ? `Parou na aula ${a.ultima_aula}` : "Ainda não começou"}</p>
      </td>
      <td className="py-3 pr-3 text-xs">{dataCurta(a.ultimo_acesso)}</td>
      <td className="py-3 pr-3">
        <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", a.certificado === "emitido" ? "bg-verde-suave text-verde-texto" : a.certificado === "revogado" ? "bg-cobre-suave text-cobre-texto" : a.concluidas >= TOTAL_AULAS_CURSO ? "bg-verde-suave text-verde-texto" : "bg-linha text-apagado")}>
          {a.certificado === "emitido" ? "Emitido" : a.certificado === "revogado" ? "Revogado" : a.concluidas >= TOTAL_AULAS_CURSO ? "Liberado" : "Pendente"}
        </span>
        <div className="mt-2">
          {a.certificado === "emitido" || (a.certificado === "nenhum" && a.concluidas >= TOTAL_AULAS_CURSO) ? (
            <button type="button" disabled={mCert.isPending} onClick={() => mCert.mutate("revogar")} className="text-xs font-semibold text-cobre-texto hover:underline">Revogar</button>
          ) : (
            <button type="button" disabled={mCert.isPending} onClick={() => mCert.mutate("emitir")} className="flex items-center gap-1 text-xs font-semibold text-tinta hover:underline">
              <Award className="size-3.5" /> Emitir
            </button>
          )}
        </div>
      </td>
      <td className="py-3 text-right">
        {confirmar ? (
          <span className="flex items-center justify-end gap-2 text-xs">
            Remover?
            <button type="button" onClick={() => mRem.mutate()} className="font-bold text-cobre-texto">Sim</button>
            <button type="button" onClick={() => setConfirmar(false)} className="text-apagado">Não</button>
          </span>
        ) : (
          <button type="button" onClick={() => setConfirmar(true)} aria-label="Remover acesso" className="text-apagado hover:text-cobre-texto">
            <Trash2 className="size-4" />
          </button>
        )}
      </td>
    </tr>
  );
}
