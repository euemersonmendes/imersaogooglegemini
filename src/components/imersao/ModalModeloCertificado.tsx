import { useEffect } from "react";
import { Award, Sparkles, X } from "lucide-react";

import { CartaoCertificado } from "@/components/admin/CartaoCertificado";
import { BOOK } from "@/content/imersao";
import { TOTAL_AULAS_CURSO } from "@/lib/certificado";

type Props = {
  aberto: boolean;
  aoFechar: () => void;
  nomeAluno?: string;
};

export function ModalModeloCertificado({ aberto, aoFechar, nomeAluno }: Props) {
  useEffect(() => {
    if (!aberto) return;
    function aoTeclar(e: KeyboardEvent) {
      if (e.key === "Escape") aoFechar();
    }
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto, aoFechar]);

  if (!aberto) return null;

  const nomeExibicao = nomeAluno?.trim() ? nomeAluno.trim() : "Seu Nome Completo";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-modelo-certificado"
      className="fixed inset-0 z-50 flex items-center justify-center bg-tinta/70 p-3 backdrop-blur-sm md:p-6"
      onClick={aoFechar}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-linha bg-areia sombra-forte animate-entra"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do modal */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-linha bg-branco px-5 py-4 md:px-7">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cobre-suave text-cobre-texto">
              <Award className="size-5" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 id="titulo-modelo-certificado" className="text-lg font-bold text-tinta md:text-xl">
                  Modelo do Certificado de Conclusão
                </h2>
                <span className="inline-flex items-center gap-1 rounded-full border border-cobre-borda bg-cobre-suave px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-cobre-texto">
                  <Sparkles className="size-3" /> Pré-visualização
                </span>
              </div>
              <p className="text-xs text-apagado md:text-sm">
                Emitido automaticamente ao concluir as {TOTAL_AULAS_CURSO} aulas ({BOOK.cargaHoraria}), com frente, verso curricular e QR Code de validação.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={aoFechar}
            aria-label="Fechar pré-visualização do certificado"
            className="btn-claro flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-tinta hover:bg-areia-2"
          >
            <X className="size-4" /> Fechar
          </button>
        </div>

        {/* Corpo com o certificado frente e verso */}
        <div className="flex-1 overflow-y-auto barra-clara p-4 md:p-8">
          <CartaoCertificado
            userId="modelo-demonstracao"
            nome={nomeExibicao}
            codigo="MODELO-VALIDACAO-QR"
            emitidoEm={new Date().toISOString()}
          />
        </div>
      </div>
    </div>
  );
}

