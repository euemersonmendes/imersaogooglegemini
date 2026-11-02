import { useEffect, useRef, useState } from "react";
import { PartyPopper, X } from "lucide-react";
import { toast } from "sonner";

import type { AlunoStatus } from "@/lib/conta.functions";
import { TOTAL_AULAS_CURSO } from "@/lib/certificado";

const CHAVE = "imersao-admin-conclusoes-vistas";

function lerVistos(): string[] {
  try {
    return JSON.parse(window.localStorage.getItem(CHAVE) ?? "[]");
  } catch {
    return [];
  }
}

/** Avisa o instrutor quando um aluno conclui as 20 aulas (até ele dispensar o aviso). */
export function AvisosConclusao({ alunos }: { alunos: AlunoStatus[] }) {
  const [vistos, setVistos] = useState<string[] | null>(null);
  const avisados = useRef(new Set<string>());

  useEffect(() => setVistos(lerVistos()), []);

  const novos = vistos === null ? [] : alunos.filter((a) => !a.admin && a.concluidas >= TOTAL_AULAS_CURSO && !vistos.includes(a.id));

  useEffect(() => {
    for (const a of novos) {
      if (avisados.current.has(a.id)) continue;
      avisados.current.add(a.id);
      toast.success(`${a.nome || a.email} concluiu todas as aulas!`, { description: `Turma ${a.turma ?? "sem código"}` });
    }
  }, [novos]);

  function dispensar(ids: string[]) {
    const lista = [...(vistos ?? []), ...ids];
    setVistos(lista);
    try {
      window.localStorage.setItem(CHAVE, JSON.stringify(lista));
    } catch {
      /* sem armazenamento */
    }
  }

  if (!novos.length) return null;
  return (
    <section role="status" aria-label="Alunos que concluíram" className="mt-6 rounded-2xl border border-cobre bg-cobre-suave p-4">
      <div className="flex items-center gap-2">
        <PartyPopper className="size-5 text-cobre-texto" />
        <h2 className="flex-1 font-bold">{novos.length === 1 ? "Uma aluna concluiu todas as aulas" : `${novos.length} alunos concluíram todas as aulas`}</h2>
        {novos.length > 1 && (
          <button type="button" onClick={() => dispensar(novos.map((a) => a.id))} className="text-xs font-semibold text-cobre-texto hover:underline">Marcar todos como vistos</button>
        )}
      </div>
      <ul className="mt-3 flex flex-col gap-2">
        {novos.map((a) => (
          <li key={a.id} className="flex items-center gap-3 rounded-xl bg-branco px-3 py-2 text-sm">
            <span className="min-w-0 flex-1">
              <b>{a.nome || a.email}</b> concluiu as {TOTAL_AULAS_CURSO} aulas · turma <span className="font-mono font-semibold">{a.turma ?? "sem código"}</span>
            </span>
            <button type="button" aria-label={`Dispensar aviso de ${a.nome}`} onClick={() => dispensar([a.id])} className="rounded-lg p-1 text-apagado hover:text-tinta">
              <X className="size-4" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
