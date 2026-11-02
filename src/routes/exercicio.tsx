import { supabase } from "@/integrations/supabase/client";
import { useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Copy, Loader } from "lucide-react";

import { Rico } from "@/components/imersao/Rico";

const TEMAS = [
  "Conhecer e personalizar o Gemini",
  "Engenharia de prompts com Gemini",
  "Ferramentas do Gemini aplicadas ao negócio",
  "O Gemini no dia a dia da empresa (Gmail, Docs, Meet)",
  "Agentes e automação com Gemini",
];

export const Route = createFileRoute("/exercicio")({
  head: () => ({
    meta: [
      { title: "Exercício personalizado · Imersão Gemini" },
      { name: "description", content: "Gere com IA um exercício prático do Gemini sob medida para o seu negócio." },
      { property: "og:title", content: "Exercício personalizado · Imersão Gemini" },
      { property: "og:description", content: "Escolha um tema, conte sobre seu negócio e receba um exercício prático." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Exercicio,
});

function Exercicio() {
  const [tema, setTema] = useState(TEMAS[0]!);
  const [objetivo, setObjetivo] = useState("");
  const [texto, setTexto] = useState("");
  const [erro, setErro] = useState("");
  const [gerando, setGerando] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const abort = useRef<AbortController | null>(null);

  async function gerar() {
    if (!objetivo.trim()) return setErro("Conte qual é o seu negócio e o que quer melhorar.");
    setErro("");
    setTexto("");
    setGerando(true);
    abort.current = new AbortController();
    try {
      const { data: sess } = await supabase.auth.getSession();
      const res = await fetch("/api/exercicio", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${sess.session?.access_token ?? ""}` },
        body: JSON.stringify({ tema, objetivo }),
        signal: abort.current.signal,
      });
      if (!res.ok || !res.body) {
        setErro((await res.text()) || "Não foi possível gerar agora.");
        return;
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        setTexto((t) => t + dec.decode(value, { stream: true }));
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") setErro("A conexão caiu. Tente de novo.");
    } finally {
      setGerando(false);
    }
  }

  const limpo = texto.replace(/```[a-z]*\n?/g, "").replace(/^#{2,3} /gm, "# ").replace(/^# (.+)$/m, "# $1");

  return (
    <div className="min-h-screen bg-areia px-5 py-10 text-tinta md:px-10">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="selo text-apagado hover:text-cobre-texto">
          ← Imersão Gemini
        </Link>
        <p className="sobretitulo mt-8">Exercício personalizado</p>
        <h1 className="mt-2 text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
          Pratique no <span className="text-cobre-texto">seu contexto</span>
        </h1>
        <p className="mt-3 text-lg text-apagado">Escolha o tema do módulo, conte sobre o seu negócio e a IA monta um exercício para você aplicar na sua empresa.</p>

        <div className="mt-8 flex flex-col gap-5 rounded-3xl border border-linha bg-branco p-6 sombra">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Tema do módulo</span>
            <select value={tema} onChange={(e) => setTema(e.target.value)} className="rounded-xl border border-linha-2 bg-areia px-4 py-3 outline-none focus:border-cobre">
              {TEMAS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Seu negócio e seu objetivo</span>
            <textarea
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
              maxLength={600}
              rows={3}
              placeholder="Ex.: tenho uma padaria no bairro e quero vender mais encomendas de bolo pelo WhatsApp"
              className="rounded-xl border border-linha-2 bg-areia px-4 py-3 outline-none focus:border-cobre"
            />
          </label>
          {erro && <p className="rounded-xl bg-cobre-suave px-4 py-3 text-sm text-cobre-texto">{erro}</p>}
          <div className="flex gap-3">
            <button onClick={gerar} disabled={gerando} className="btn-tinta flex items-center gap-2 rounded-xl px-5 py-3 font-semibold disabled:opacity-60">
              {gerando && <Loader className="size-4 animate-spin" />}
              {gerando ? "Gerando…" : texto ? "Gerar outro" : "Gerar exercício"}
            </button>
            {gerando && (
              <button onClick={() => abort.current?.abort()} className="btn-claro rounded-xl px-4 py-3 font-semibold">
                Parar
              </button>
            )}
          </div>
        </div>

        {(texto || gerando) && (
          <div className="mt-6 rounded-3xl border border-linha bg-branco p-6 sombra">
            <div className="mb-4 flex items-center justify-between">
              <p className="sobretitulo">Seu exercício</p>
              {texto && !gerando && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(texto);
                    setCopiado(true);
                    setTimeout(() => setCopiado(false), 1500);
                  }}
                  className="btn-claro flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold"
                >
                  {copiado ? <Check className="size-4 text-verde" /> : <Copy className="size-4" />} {copiado ? "Copiado" : "Copiar"}
                </button>
              )}
            </div>
            {texto ? <Rico texto={limpo} /> : <p className="text-apagado">Preparando seu exercício…</p>}
          </div>
        )}
      </div>
    </div>
  );
}
