import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Loader, Star } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { TOTAL_AULAS_CURSO } from "@/lib/certificado";
import { useProgresso } from "@/lib/progresso";
import { useSessao } from "@/lib/sessao";

export const Route = createFileRoute("/pesquisa")({
  head: () => ({
    meta: [
      { title: "Pesquisa de satisfação — Imersão Google Gemini" },
      { name: "description", content: "Conte como foi a Imersão Google Gemini: nota de recomendação, conteúdo, instrutor e aplicação no seu negócio." },
      { property: "og:title", content: "Pesquisa de satisfação — Imersão Google Gemini" },
      { property: "og:description", content: "Pesquisa NPS de fim da Imersão Google Gemini." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Pesquisa,
});

const CRITERIOS = [
  ["conteudo", "Conteúdo das aulas"],
  ["instrutor", "Instrutor (Emerson Mendes)"],
  ["plataforma", "Facilidade de usar o book digital"],
  ["aplicacao", "Aplicação no meu negócio"],
] as const;
type Crit = (typeof CRITERIOS)[number][0];

function Pesquisa() {
  const sessao = useSessao();
  const prog = useProgresso();
  const feitas = prog.concluidas.length;
  const [nota, setNota] = useState<number | null>(null);
  const [crit, setCrit] = useState<Record<Crit, number>>({ conteudo: 0, instrutor: 0, plataforma: 0, aplicacao: 0 });
  const [motivo, setMotivo] = useState("");
  const [melhorar, setMelhorar] = useState("");
  const [depoimento, setDepoimento] = useState("");
  const [autoriza, setAutoriza] = useState(false);
  const [estado, setEstado] = useState<"carregando" | "aberta" | "enviando" | "enviada">("carregando");

  useEffect(() => {
    const id = sessao.user?.id;
    if (!id) return;
    supabase.from("nps_respostas").select("user_id").eq("user_id", id).maybeSingle().then(({ data }) => setEstado(data ? "enviada" : "aberta"));
  }, [sessao.user?.id]);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (nota === null || !sessao.user) return;
    setEstado("enviando");
    const { error } = await supabase.from("nps_respostas").upsert({
      user_id: sessao.user.id, nota,
      conteudo: crit.conteudo || null, instrutor: crit.instrutor || null, plataforma: crit.plataforma || null, aplicacao: crit.aplicacao || null,
      motivo: motivo.trim() || null, melhorar: melhorar.trim() || null, depoimento: depoimento.trim() || null, autoriza_depoimento: autoriza && !!depoimento.trim(),
    }, { onConflict: "user_id" });
    if (error) { toast.error("Não foi possível enviar. Tente de novo."); setEstado("aberta"); return; }
    setEstado("enviada");
  }

  return (
    <div className="min-h-screen palco-fundo text-tinta">
      <div className="mx-auto max-w-3xl px-5 py-8 md:px-10">
        <Link to="/book" className="selo flex items-center gap-2 text-apagado hover:text-cobre-texto"><ArrowLeft className="size-3.5" /> Voltar à capa</Link>
        <p className="sobretitulo mt-6">Fim da imersão</p>
        <h1 className="mt-1 text-4xl font-bold tracking-tight">Pesquisa de <span className="acento">satisfação</span></h1>

        {feitas < TOTAL_AULAS_CURSO ? (
          <Caixa>A pesquisa abre quando você concluir as {TOTAL_AULAS_CURSO} aulas. Você já concluiu {feitas}.</Caixa>
        ) : estado === "carregando" ? (
          <p className="mt-8 flex items-center gap-2 text-apagado"><Loader className="size-4 animate-spin" /> Carregando…</p>
        ) : estado === "enviada" ? (
          <Caixa>
            <CheckCircle2 className="size-8 text-verde" />
            <p className="mt-3 text-xl font-bold">Obrigado pela sua resposta!</p>
            <p className="mt-1 text-apagado">Sua opinião ajuda a melhorar as próximas turmas.</p>
            <Link to="/certificado" className="btn-tinta mt-5 inline-block rounded-xl px-5 py-2.5 text-sm font-semibold">Ver meu certificado</Link>
          </Caixa>
        ) : (
          <form onSubmit={enviar} className="mt-8 space-y-6">
            <Bloco titulo="1. De 0 a 10, quanto você recomendaria a Imersão Google Gemini a outro empresário?" obrigatorio>
              <div className="grid grid-cols-11 gap-1.5">
                {Array.from({ length: 11 }, (_, n) => (
                  <button key={n} type="button" onClick={() => setNota(n)} aria-pressed={nota === n}
                    className={`rounded-lg border py-2.5 text-sm font-bold transition ${nota === n ? "btn-tinta border-transparent" : n <= 6 ? "border-linha-2 bg-branco hover:border-g-vermelho" : n <= 8 ? "border-linha-2 bg-branco hover:border-g-amarelo" : "border-linha-2 bg-branco hover:border-g-verde"}`}>
                    {n}
                  </button>
                ))}
              </div>
              <div className="mt-1.5 flex justify-between text-xs text-apagado"><span>Nada provável</span><span>Muito provável</span></div>
            </Bloco>

            <Bloco titulo="2. Por que você deu essa nota?">
              <textarea value={motivo} onChange={(e) => setMotivo(e.target.value)} maxLength={2000} rows={3} className="w-full rounded-xl border border-linha-2 bg-branco p-3 text-sm" />
            </Bloco>

            <Bloco titulo="3. Avalie de 1 a 5 estrelas">
              <div className="space-y-3">
                {CRITERIOS.map(([k, r]) => (
                  <div key={k} className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm">{r}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button key={s} type="button" aria-label={`${r}: ${s} estrelas`} onClick={() => setCrit({ ...crit, [k]: s })}>
                          <Star className={`size-6 ${crit[k] >= s ? "fill-g-amarelo text-g-amarelo" : "text-linha-2"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Bloco>

            <Bloco titulo="4. O que podemos melhorar?">
              <textarea value={melhorar} onChange={(e) => setMelhorar(e.target.value)} maxLength={2000} rows={3} className="w-full rounded-xl border border-linha-2 bg-branco p-3 text-sm" />
            </Bloco>

            <Bloco titulo="5. Deixe um depoimento sobre a imersão (opcional)">
              <textarea value={depoimento} onChange={(e) => setDepoimento(e.target.value)} maxLength={2000} rows={3} className="w-full rounded-xl border border-linha-2 bg-branco p-3 text-sm" />
              <label className="mt-2 flex items-center gap-2 text-sm text-apagado">
                <input type="checkbox" checked={autoriza} onChange={(e) => setAutoriza(e.target.checked)} /> Autorizo usar meu depoimento com meu nome na divulgação da imersão.
              </label>
            </Bloco>

            <button type="submit" disabled={nota === null || estado === "enviando"} className="btn-tinta flex items-center gap-2 rounded-xl px-6 py-3 font-semibold disabled:opacity-50">
              {estado === "enviando" && <Loader className="size-4 animate-spin" />} Enviar resposta
            </button>
            {nota === null && <p className="text-xs text-apagado">Escolha uma nota de 0 a 10 para enviar.</p>}
          </form>
        )}
      </div>
    </div>
  );
}

function Caixa({ children }: { children: React.ReactNode }) {
  return <div className="mt-8 rounded-3xl border border-linha bg-branco p-8 sombra">{children}</div>;
}
function Bloco({ titulo, obrigatorio, children }: { titulo: string; obrigatorio?: boolean; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-linha bg-branco p-6 sombra">
      <h2 className="mb-3 font-semibold">{titulo}{obrigatorio && <span className="text-g-vermelho"> *</span>}</h2>
      {children}
    </section>
  );
}
