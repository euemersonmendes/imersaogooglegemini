import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { calcularNps, media } from "@/lib/nps";

export function ResultadoNps() {
  const { data } = useQuery({
    queryKey: ["admin-nps"],
    refetchInterval: 60_000,
    queryFn: async () => {
      const [r, p] = await Promise.all([
        supabase.from("nps_respostas").select("*").order("criado_em", { ascending: false }),
        supabase.from("profiles").select("id, nome"),
      ]);
      const nomes = new Map((p.data ?? []).map((x) => [x.id, x.nome]));
      return (r.data ?? []).map((x) => ({ ...x, nome: nomes.get(x.user_id) ?? "Aluno removido" }));
    },
  });
  const lista = data ?? [];
  const n = calcularNps(lista.map((x) => x.nota));
  const pct = (v: number) => (n.total ? Math.round((v / n.total) * 100) : 0);
  const notas = [
    ["Conteúdo", media(lista.map((x) => x.conteudo))],
    ["Instrutor", media(lista.map((x) => x.instrutor))],
    ["Book digital", media(lista.map((x) => x.plataforma))],
    ["Aplicação no negócio", media(lista.map((x) => x.aplicacao))],
  ] as const;

  return (
    <section className="mt-8 rounded-2xl border border-linha bg-branco p-6">
      <h2 className="text-lg font-bold">Pesquisa NPS de fim da imersão</h2>
      <p className="text-sm text-apagado">{n.total} resposta(s). NPS = % promotores (9–10) − % detratores (0–6).</p>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <div className="rounded-xl bg-cobre-suave p-4"><p className="text-sm text-apagado">NPS</p><p className="text-4xl font-bold">{n.nps}</p></div>
        <div className="rounded-xl border border-linha p-4"><p className="text-sm text-g-verde">Promotores</p><p className="text-2xl font-bold">{n.promotores} · {pct(n.promotores)}%</p></div>
        <div className="rounded-xl border border-linha p-4"><p className="text-sm text-g-amarelo">Neutros</p><p className="text-2xl font-bold">{n.neutros} · {pct(n.neutros)}%</p></div>
        <div className="rounded-xl border border-linha p-4"><p className="text-sm text-g-vermelho">Detratores</p><p className="text-2xl font-bold">{n.detratores} · {pct(n.detratores)}%</p></div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {notas.map(([r, v]) => <div key={r} className="rounded-xl border border-linha p-3 text-sm">{r}<p className="text-xl font-bold">{v || "—"} <span className="text-sm font-normal text-apagado">/ 5</span></p></div>)}
      </div>
      {lista.length > 0 && (
        <div className="barra-clara mt-5 max-h-96 space-y-3 overflow-y-auto">
          {lista.map((x) => (
            <div key={x.user_id} className="rounded-xl border border-linha p-4 text-sm">
              <p className="font-semibold">{x.nome} · nota {x.nota} <span className="font-normal text-apagado">· {new Date(x.criado_em).toLocaleDateString("pt-BR")}</span></p>
              {x.motivo && <p className="mt-1"><b>Por quê:</b> {x.motivo}</p>}
              {x.melhorar && <p className="mt-1"><b>Melhorar:</b> {x.melhorar}</p>}
              {x.depoimento && <p className="mt-1"><b>Depoimento{x.autoriza_depoimento ? " (autorizado)" : " (não autorizado)"}:</b> {x.depoimento}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
