import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Printer } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { BOOK, modulos } from "@/content/imersao";
import { LogoGemini } from "@/components/imersao/LogoGemini";
import { TOTAL_AULAS_CURSO, certificadoLiberado } from "@/lib/certificado";
import { useProgresso } from "@/lib/progresso";
import { useSessao } from "@/lib/sessao";

export const Route = createFileRoute("/certificado")({
  head: () => ({
    meta: [
      { title: "Certificado — Imersão Gemini" },
      { name: "description", content: "Certificado de conclusão da Imersão Google Gemini para micro e pequenos empresários." },
      { property: "og:title", content: "Certificado — Imersão Gemini" },
      { property: "og:description", content: "Certificado de conclusão da Imersão Google Gemini." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Certificado,
});

type Cert = { codigo: string; emitido_em: string; revogado: boolean } | null;

function Certificado() {
  const sessao = useSessao();
  const prog = useProgresso();
  const [cert, setCert] = useState<Cert | undefined>(undefined);
  const feitas = prog.concluidas.length;

  useEffect(() => {
    const id = sessao.user?.id;
    if (!id) return;
    let vivo = true;
    (async () => {
      const { data } = await supabase.from("certificados").select("codigo, emitido_em, revogado").eq("user_id", id).maybeSingle();
      if (!data && feitas >= TOTAL_AULAS_CURSO) {
        // garante que o progresso está salvo antes de emitir
        await supabase.from("progresso").upsert({ user_id: id, dados: prog as never, concluidas: feitas, atualizado_em: new Date().toISOString() }, { onConflict: "user_id" });
        const novo = await supabase.from("certificados").insert({ user_id: id }).select("codigo, emitido_em, revogado").maybeSingle();
        if (vivo) setCert(novo.data ?? null);
        return;
      }
      if (vivo) setCert(data ?? null);
    })();
    return () => { vivo = false; };
  }, [sessao.user?.id, feitas]); // eslint-disable-line react-hooks/exhaustive-deps

  const liberado = cert ? !cert.revogado : certificadoLiberado(feitas, false);

  return (
    <div className="min-h-screen bg-areia text-tinta">
      <div className="mx-auto max-w-5xl px-5 py-8 md:px-10 print:p-0">
        <div className="flex flex-wrap items-center gap-3 print:hidden">
          <Link to="/" className="selo flex items-center gap-2 text-apagado hover:text-cobre-texto"><ArrowLeft className="size-3.5" /> Voltar à capa</Link>
          {cert && liberado && (
            <button type="button" onClick={() => window.print()} className="btn-tinta ml-auto flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold">
              <Printer className="size-4" /> Imprimir ou salvar em PDF
            </button>
          )}
        </div>

        {cert === undefined && sessao.user ? (
          <p className="mt-10 text-apagado">Carregando…</p>
        ) : cert?.revogado ? (
          <Aviso titulo="Certificado indisponível" texto={`Seu certificado foi suspenso pelo instrutor. Fale com ${BOOK.instrutor}.`} />
        ) : !cert ? (
          <Aviso titulo="Conclua todas as aulas" texto={`Você concluiu ${feitas} de ${TOTAL_AULAS_CURSO} aulas. O certificado é liberado automaticamente quando todas estiverem concluídas.`} />
        ) : (
          <div className="fonte-certificado mt-8 rounded-3xl border-4 border-double border-cobre bg-branco p-8 text-center sombra md:p-14 print:mt-0 print:shadow-none">
            <div className="flex flex-col items-center gap-2">
              <LogoGemini className="size-20 md:size-24" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-apagado">Google Gemini</span>
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-cobre-texto">Certificado de conclusão</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Imersão <span className="text-cobre-texto">Google Gemini</span>
            </h1>
            <p className="mt-8 text-apagado">Certificamos que</p>
            <p className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">{sessao.nome}</p>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-apagado">
              concluiu a Imersão Google Gemini para micro e pequenos empresários, com carga horária de {BOOK.cargaHoraria}, abrangendo {modulos.length} módulos e {TOTAL_AULAS_CURSO} aulas sobre o uso da inteligência artificial no financeiro, fluxo de caixa, marketing, vendas, compras, gestão de pessoas e atendimento.
            </p>
            <div className="mx-auto mt-12 grid max-w-2xl gap-8 text-sm sm:grid-cols-2">
              <div>
                <div className="mx-auto w-48 border-t border-tinta pt-2 font-semibold">{BOOK.instrutor}</div>
                <p className="text-apagado">Instrutor e responsável</p>
              </div>
              <div>
                <div className="mx-auto w-48 border-t border-tinta pt-2 font-semibold">{new Date(cert.emitido_em).toLocaleDateString("pt-BR")}</div>
                <p className="text-apagado">Data de emissão</p>
              </div>
            </div>
            <p className="mt-10 font-mono text-xs text-apagado">Código de verificação: {cert.codigo}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Aviso({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <div className="mt-10 rounded-3xl border border-linha bg-branco p-8 sombra">
      <h1 className="text-3xl font-bold">{titulo}</h1>
      <p className="mt-2 text-apagado">{texto}</p>
    </div>
  );
}
