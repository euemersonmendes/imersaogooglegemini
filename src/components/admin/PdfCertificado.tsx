// Janela do painel que mostra o certificado de um aluno e gera o PDF dele.
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { FileDown, Loader, X } from "lucide-react";
import { toast } from "sonner";

import { definirCertificado, type AlunoStatus } from "@/lib/conta.functions";
import { baixarPdf } from "@/lib/exportarCertificado";
import { supabase } from "@/integrations/supabase/client";
import { CartaoCertificado } from "@/components/admin/CartaoCertificado";

type Cert = { codigo: string; emitido_em: string; revogado: boolean } | null;

export function PdfCertificado({ aluno, aoFechar }: { aluno: AlunoStatus; aoFechar: () => void }) {
  const emitir = useServerFn(definirCertificado);
  const [cert, setCert] = useState<Cert | undefined>(undefined);
  const [gerando, setGerando] = useState(false);
  const cartao = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let vivo = true;
    (async () => {
      let { data } = await supabase.from("certificados").select("codigo, emitido_em, revogado").eq("user_id", aluno.id).maybeSingle();
      if (!data) {
        // Certificado ainda não gravado: emite agora para poder gerar o PDF.
        const r = await emitir({ data: { userId: aluno.id, acao: "emitir" } });
        if (!r?.ok) {
          if (vivo) setCert(null);
          toast.error("Não foi possível emitir o certificado deste aluno.");
          return;
        }
        ({ data } = await supabase.from("certificados").select("codigo, emitido_em, revogado").eq("user_id", aluno.id).maybeSingle());
      }
      if (vivo) setCert(data ?? null);
    })();
    return () => { vivo = false; };
  }, [aluno.id]); // eslint-disable-line react-hooks/exhaustive-deps

  async function baixar() {
    if (!cartao.current) return;
    setGerando(true);
    try {
      await baixarPdf(cartao.current, aluno.nome || aluno.email);
      toast.success("PDF do certificado baixado.");
    } catch {
      toast.error("Não foi possível gerar o arquivo. Tente de novo.");
    } finally {
      setGerando(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto barra-clara bg-preto/60 p-4 md:p-8" onClick={aoFechar}>
      <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <div className="mt-2 mb-4 flex items-center gap-3 rounded-2xl border border-linha bg-branco p-3 sombra">
          <p className="text-sm font-semibold">Certificado de {aluno.nome || aluno.email}</p>
          {cert === undefined && <span className="flex items-center gap-2 text-xs text-apagado"><Loader className="size-3.5 animate-spin" /> Preparando…</span>}
          <div className="ml-auto flex items-center gap-2">
            {cert && !cert.revogado && (
              <button type="button" disabled={gerando} onClick={() => void baixar()} className="btn-tinta flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold">
                {gerando ? <Loader className="size-4 animate-spin" /> : <FileDown className="size-4" />} Baixar PDF
              </button>
            )}
            <button type="button" onClick={aoFechar} aria-label="Fechar" className="rounded-xl px-2 py-2 text-apagado hover:text-tinta"><X className="size-5" /></button>
          </div>
        </div>
        {cert?.revogado ? (
          <p className="rounded-2xl border border-cobre bg-cobre-suave p-6 text-cobre-texto">O certificado deste aluno está revogado. Emita novamente para poder gerar o PDF.</p>
        ) : cert === null ? (
          <p className="rounded-2xl border border-linha bg-branco p-6 text-apagado">Não foi possível carregar o certificado.</p>
        ) : !cert ? null : (
          <CartaoCertificado userId={aluno.id} nome={aluno.nome || aluno.email} codigo={cert.codigo} emitidoEm={cert.emitido_em} cartaoRef={cartao} />
        )}
      </div>
    </div>
  );
}
