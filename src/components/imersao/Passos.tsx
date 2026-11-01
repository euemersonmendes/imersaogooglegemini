import { useMemo, useState } from "react";
import { Check, Copy, ExternalLink, Eye } from "lucide-react";

import { cn } from "@/lib/utils";
import type { AulaInfo, PassoCompleto } from "@/content/imersao";
import type {
  PassoAnatomia,
  PassoAvaliacao,
  PassoCatalogo,
  PassoComparacao,
  PassoMapa,
  PassoPrompt,
  PassoResultado,
  PassoTela,
  PassoTexto,
} from "@/content/imersao/tipos";
import { alternarCheck, alternarConcluida, darNota, useProgresso } from "@/lib/progresso";
import { Faisca } from "./Glifo";
import { Inline, Rico, textoParaCopiar } from "./Rico";
import { TelaIlustrada, telas } from "./telas";

function BotaoCopiar({ texto, rotulo = "Copiar" }: { texto: string; rotulo?: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(textoParaCopiar(texto));
        setOk(true);
        setTimeout(() => setOk(false), 1500);
      }}
      className="btn-tinta flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
    >
      {ok ? <Check className="size-4" /> : <Copy className="size-4" />} {ok ? "Copiado" : rotulo}
    </button>
  );
}

function Cartao({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("rounded-2xl border border-linha bg-branco p-5 sombra md:p-6", className)}>{children}</div>;
}

function Lista({ itens, check }: { itens: string[]; check?: boolean }) {
  return (
    <ul className="flex flex-col gap-2">
      {itens.map((t, i) => (
        <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed">
          {check ? <Check className="mt-1 size-4 shrink-0 text-verde" /> : <span className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-cobre-texto" />}
          <span>
            <Inline texto={t} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function Objetivo({ info }: { info: AulaInfo }) {
  const { aula } = info;
  return (
    <div className="grid gap-5 md:grid-cols-[1.3fr_1fr]">
      <Cartao>
        <p className="sobretitulo">O que você vai fazer</p>
        <p className="mt-2 text-xl font-semibold leading-snug">{aula.objetivo}</p>
        <p className="sobretitulo mt-6">Você sai com</p>
        <p className="mt-2 text-[15.5px] leading-relaxed">{aula.voceSaiCom}</p>
        <p className="mt-6 inline-flex rounded-full bg-cobre-suave px-3 py-1 text-sm font-semibold text-cobre-texto">{aula.ferramenta}</p>
      </Cartao>
      <Cartao className="bg-areia-2">
        {aula.saibaMais && (
          <>
            <p className="sobretitulo">Se quiser entender um pouco mais</p>
            <p className="mt-2 text-[15px] leading-relaxed text-apagado">{aula.saibaMais}</p>
          </>
        )}
        {aula.fontes.length > 0 && (
          <div className="mt-5 flex flex-col gap-2">
            {aula.fontes.map((f) => (
              <a key={f.url + f.nome} href={f.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-cobre-texto hover:underline">
                <ExternalLink className="size-3.5" /> {f.nome}
              </a>
            ))}
          </div>
        )}
      </Cartao>
    </div>
  );
}

function Tela({ p }: { p: PassoTela }) {
  const [ativo, setAtivo] = useState(0);
  const pontos = telas[p.tela].pontos;
  return (
    <div className="grid gap-5 lg:grid-cols-[1.7fr_1fr]">
      <TelaIlustrada id={p.tela} ativo={ativo} aoEscolher={setAtivo} />
      <div className="flex flex-col gap-2">
        {pontos.map((pt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setAtivo(i)}
            className={cn("rounded-xl border p-3 text-left transition-colors", ativo === i ? "border-cobre bg-cobre-suave" : "border-linha bg-branco hover:border-cobre-borda")}
          >
            <p className="flex items-center gap-2 font-semibold">
              <span className={cn("flex size-6 items-center justify-center rounded-full text-xs font-bold", ativo === i ? "bg-tinta text-branco" : "bg-cobre text-tinta")}>{i + 1}</span>
              {pt.rotulo}
            </p>
            {ativo === i && <p className="mt-1.5 text-sm leading-relaxed text-apagado">{pt.texto}</p>}
          </button>
        ))}
      </div>
    </div>
  );
}

function Prompt({ p }: { p: PassoPrompt }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      <div className="flex flex-col gap-4">
        <Cartao>
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 font-semibold">
              <Faisca className="size-4 text-cobre-texto" /> {p.nomePrompt}
            </p>
            <BotaoCopiar texto={p.prompt} />
          </div>
          <Rico texto={p.prompt} />
        </Cartao>
        {p.dica && <p className="rounded-xl bg-dica px-4 py-3 text-sm leading-relaxed">{p.dica}</p>}
      </div>
      <div className="flex flex-col gap-4">
        {p.observe && (
          <Cartao className="bg-areia-2">
            <p className="sobretitulo mb-3 flex items-center gap-2">
              <Eye className="size-3.5" /> Observe na resposta
            </p>
            <Lista itens={p.observe} />
          </Cartao>
        )}
        {p.recebe && (
          <Cartao>
            <p className="sobretitulo">O que você vai receber</p>
            <p className="mt-2 font-semibold">{p.recebe.titulo}</p>
            {p.recebe.texto && <p className="mt-1 text-sm text-apagado">{p.recebe.texto}</p>}
            {p.recebe.secoes.map((s) => (
              <div key={s.rotulo} className="mt-4">
                <p className="mb-1.5 text-sm font-semibold">{s.rotulo}</p>
                <Lista itens={s.itens} />
              </div>
            ))}
            {p.recebe.aceite && <p className="mt-4 rounded-lg bg-verde-suave px-3 py-2 text-sm text-verde-texto">{p.recebe.aceite}</p>}
          </Cartao>
        )}
        {p.tela && <TelaIlustrada id={p.tela} mostrarPontos={false} />}
      </div>
    </div>
  );
}

function Texto({ p }: { p: PassoTexto }) {
  const [sel, setSel] = useState(0);
  const op = p.opcoes[sel]!;
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
      <div className="flex flex-col gap-4">
        <Cartao className="bg-areia-2">
          <p className="sobretitulo mb-3">Como fazer</p>
          <ol className="flex flex-col gap-2 text-[15px]">
            {p.comoFazer.map((c, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="font-bold text-cobre-texto">{i + 1}.</span>
                <Inline texto={c} />
              </li>
            ))}
          </ol>
        </Cartao>
        <div className="flex flex-col gap-2">
          {p.opcoes.map((o, i) => (
            <button key={o.nome} type="button" onClick={() => setSel(i)} className={cn("rounded-xl border p-3 text-left", sel === i ? "border-cobre bg-cobre-suave" : "border-linha bg-branco hover:border-cobre-borda")}>
              <p className="font-semibold">{o.nome}</p>
              <p className="text-sm text-apagado">{o.resumo}</p>
            </button>
          ))}
        </div>
      </div>
      <Cartao>
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="sobretitulo">
            {p.rotuloSelecionado}: {op.nome}
          </p>
          <BotaoCopiar texto={op.texto} rotulo={p.rotuloCopiar} />
        </div>
        <Rico texto={op.texto} />
      </Cartao>
    </div>
  );
}

function Catalogo({ p }: { p: PassoCatalogo }) {
  const [sel, setSel] = useState(0);
  const it = p.itens[sel]!;
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-[repeat(auto-fit,minmax(130px,1fr))]">
        {p.itens.map((x, i) => (
          <button key={x.sigla + i} type="button" onClick={() => setSel(i)} className={cn("rounded-2xl border p-4 text-left transition-colors", sel === i ? "border-tinta bg-tinta text-branco" : "border-linha bg-branco hover:border-cobre-borda")}>
            <p className={cn("text-3xl font-bold", sel === i ? "text-cobre" : "text-cobre-texto")}>{x.sigla}</p>
            <p className="mt-1 font-semibold">{x.nome}</p>
            <p className={cn("text-xs", sel === i ? "text-escuro-texto-2" : "text-apagado")}>{x.sub}</p>
          </button>
        ))}
      </div>
      <Cartao className="grid gap-5 md:grid-cols-2">
        <div>
          <p className="sobretitulo">{it.rotulo}</p>
          <p className="mt-2 text-lg font-semibold">{it.pergunta}</p>
          <p className="mt-4 rounded-lg bg-cobre-suave px-3 py-2 text-sm text-cobre-texto">
            <strong>Cuidado:</strong> {it.cuidado}
          </p>
        </div>
        <Lista itens={it.itens} />
      </Cartao>
      {p.ordens && (
        <div className="grid gap-3 md:grid-cols-2">
          {p.ordens.map((o) => (
            <div key={o.rotulo} className="rounded-2xl border border-linha bg-areia-2 p-4">
              <p className="sobretitulo">{o.rotulo}</p>
              <p className="mt-2 font-bold tracking-wide">{o.sequencia.join(" → ")}</p>
              <p className="mt-1 text-sm text-apagado">{o.texto}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Mapa({ p }: { p: PassoMapa }) {
  const [q, setQ] = useState(0);
  const quadro = p.quadros[q]!;
  const nos = p.fluxo === "volta" ? [...p.nos].reverse() : p.nos;
  return (
    <div className="flex flex-col gap-5">
      {p.pedido && <p className="rounded-xl border border-linha bg-branco px-4 py-3 italic">“{p.pedido}”</p>}
      <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
        {nos.map((n, i) => {
          const aberto = quadro.abertos.includes(n.id);
          return (
            <div key={n.id} className="contents">
              {i > 0 && (
                <span className="flex flex-col items-center self-center text-cobre-texto">
                  <span className="text-xl leading-none"><span className="md:hidden">↓</span><span className="hidden md:inline">→</span></span>
                  {p.rotuloSeta && <span className="text-[10px] font-bold uppercase tracking-wider">{p.rotuloSeta}</span>}
                </span>
              )}
              <div className={cn("flex-1 rounded-2xl border p-4 transition-all", quadro.foco === n.id ? "border-tinta bg-tinta text-branco" : aberto ? "border-cobre bg-branco" : "border-dashed border-linha-2 bg-areia-2 opacity-50")}>
                <p className={cn("text-2xl font-bold", quadro.foco === n.id ? "text-cobre" : "text-cobre-texto")}>{n.sigla}</p>
                <p className="font-semibold">{n.nome}</p>
                {aberto && (
                  <ul className="mt-2 flex flex-col gap-1 text-sm">
                    {n.itens.map((t) => (
                      <li key={t}>· {t}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-areia-2 p-4">
        <p className="text-[15px]">
          <Inline texto={quadro.legenda} />
        </p>
        <div className="flex gap-2">
          {q > 0 && (
            <button type="button" onClick={() => setQ(0)} className="btn-claro rounded-xl px-4 py-2 text-sm font-semibold">
              Recomeçar
            </button>
          )}
          {q < p.quadros.length - 1 && (
            <button type="button" onClick={() => setQ(q + 1)} className="btn-tinta rounded-xl px-4 py-2 text-sm font-semibold">
              Revelar ({q + 1}/{p.quadros.length - 1})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Anatomia({ p }: { p: PassoAnatomia }) {
  const [n, setN] = useState(0);
  const prompt = useMemo(() => p.blocos.map((b) => b.texto).join("\n\n"), [p.blocos]);
  return (
    <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
      <Cartao>
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 font-semibold">
            <Faisca className="size-4 text-cobre-texto" /> {p.nomePrompt}
          </p>
          <BotaoCopiar texto={prompt} />
        </div>
        <div className="flex flex-col gap-3">
          {p.blocos.map((b, i) => (
            <div key={i} className={cn("rounded-xl border-l-4 px-4 py-2 transition-opacity", i < n ? "border-cobre bg-areia-2" : "border-linha opacity-35")}>
              <Rico texto={b.texto} tamanho="sm" />
            </div>
          ))}
        </div>
      </Cartao>
      <div className="flex flex-col gap-3">
        {n === 0 ? (
          <Cartao className="bg-areia-2">
            <p className="font-semibold">{p.intro.titulo}</p>
            <p className="mt-2 text-[15px] text-apagado">{p.intro.texto}</p>
          </Cartao>
        ) : (
          (() => {
            const b = p.blocos[n - 1]!;
            return (
              <Cartao>
                <p className="sobretitulo">
                  Bloco {n} de {p.blocos.length}
                  {b.ipo && ` · ${b.ipo}`}
                </p>
                <p className="mt-2 text-lg font-semibold">{b.titulo}</p>
                <p className="mt-1 text-apagado">{b.pergunta}</p>
                {b.nota && <p className="mt-3 rounded-lg bg-dica px-3 py-2 text-sm">{b.nota}</p>}
              </Cartao>
            );
          })()
        )}
        {n === p.blocos.length && (
          <Cartao className="border-verde-borda bg-verde-suave">
            <p className="font-semibold text-verde-texto">{p.fecho.titulo}</p>
            <p className="mt-1 text-sm">{p.fecho.texto}</p>
          </Cartao>
        )}
        <div className="flex gap-2">
          {n > 0 && (
            <button type="button" onClick={() => setN(n - 1)} className="btn-claro rounded-xl px-4 py-2 text-sm font-semibold">
              Voltar
            </button>
          )}
          {n < p.blocos.length && (
            <button type="button" onClick={() => setN(n + 1)} className="btn-tinta rounded-xl px-4 py-2 text-sm font-semibold">
              Revelar bloco {n + 1}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Comparacao({ p }: { p: PassoComparacao }) {
  return (
    <div className={cn("grid gap-5", p.exemplo && "lg:grid-cols-[1.3fr_1fr]")}>
      <div className="flex flex-col gap-4">
        <div className="overflow-hidden rounded-2xl border border-linha bg-branco sombra">
          <div className="grid grid-cols-2 bg-areia-2 text-sm font-semibold">
            <p className="px-4 py-3 text-apagado">{p.colunas[0]}</p>
            <p className="px-4 py-3 text-cobre-texto">{p.colunas[1]}</p>
          </div>
          {p.linhas.map(([a, b], i) => (
            <div key={i} className="grid grid-cols-2 border-t border-linha text-[15px]">
              <p className="px-4 py-3 text-apagado line-through decoration-cobre/60">{a}</p>
              <p className="px-4 py-3 font-medium">
                <Inline texto={b} />
              </p>
            </div>
          ))}
        </div>
        {p.frase && <p className="text-xl font-semibold text-cobre-texto">{p.frase}</p>}
      </div>
      {p.exemplo && (
        <Cartao className="bg-areia-2">
          <p className="sobretitulo">{p.exemplo.titulo}</p>
          {p.exemplo.paragrafos.map((t, i) => (
            <p key={i} className="mt-3 text-[15px] leading-relaxed">
              <Inline texto={t} />
            </p>
          ))}
        </Cartao>
      )}
    </div>
  );
}

function Avaliacao({ p, chave }: { p: PassoAvaliacao; chave: string }) {
  const notas = useProgresso().notas[chave] ?? {};
  const avaliados = p.itens.map((_, i) => notas[i]).filter((n): n is number => n !== undefined);
  const menor = avaliados.length === p.itens.length ? p.itens.reduce((m, _, i) => (notas[i]! < notas[m]! ? i : m), 0) : -1;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between px-1 text-xs font-semibold uppercase tracking-wider text-apagado">
        <span>1 = {p.min}</span>
        <span>5 = {p.max}</span>
      </div>
      {p.itens.map((it, i) => (
        <div key={it.nome} className={cn("flex flex-col gap-3 rounded-2xl border bg-branco p-4 md:flex-row md:items-center md:justify-between", menor === i ? "border-cobre" : "border-linha")}>
          <div>
            <p className="font-semibold">{it.nome}</p>
            <p className="text-sm text-apagado">{it.sub}</p>
            {menor === i && <p className="mt-2 rounded-lg bg-cobre-suave px-3 py-2 text-sm text-cobre-texto">Comece por aqui: {it.sugestao}</p>}
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => darNota(chave, i, n)} className={cn("size-10 rounded-xl border font-bold", notas[i] === n ? "border-tinta bg-tinta text-branco" : "border-linha-2 bg-areia hover:border-cobre")}>
                {n}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Resultado({ p, n }: { p: PassoResultado; n: string }) {
  const prog = useProgresso();
  const marcados = prog.checks[n] ?? [];
  const feita = prog.concluidas.includes(n);
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
      <div className="flex flex-col gap-4">
        <Cartao>
          <p className="sobretitulo mb-3">Faça na sua conta</p>
          <Lista itens={p.esperado} />
        </Cartao>
        {p.visual?.tipo === "tela" && (
          <div>
            <TelaIlustrada id={p.visual.tela} mostrarPontos={false} />
            <p className="mt-2 text-sm text-apagado">{p.visual.legenda}</p>
          </div>
        )}
        {p.visual?.tipo === "lista" && (
          <Cartao className="bg-areia-2">
            <p className="sobretitulo mb-3">{p.visual.legenda}</p>
            <Lista itens={p.visual.itens} check />
          </Cartao>
        )}
      </div>
      <Cartao>
        <p className="sobretitulo mb-3">Confira antes de concluir</p>
        <div className="flex flex-col gap-2">
          {p.confira.map((c, i) => {
            const ok = marcados.includes(i);
            return (
              <button key={i} type="button" onClick={() => alternarCheck(n, i)} className={cn("flex gap-3 rounded-xl border p-3 text-left text-[15px]", ok ? "border-verde-borda bg-verde-suave" : "border-linha hover:border-cobre-borda")}>
                <span className={cn("mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border", ok ? "border-verde bg-verde text-branco" : "border-linha-2")}>{ok && <Check className="size-3.5" />}</span>
                <Inline texto={c} />
              </button>
            );
          })}
        </div>
        <button type="button" onClick={() => alternarConcluida(n)} className={cn("mt-5 w-full rounded-xl px-5 py-3 font-semibold", feita ? "btn-claro" : "btn-tinta")}>
          {feita ? "✓ Aula concluída" : "Concluir aula"}
        </button>
      </Cartao>
    </div>
  );
}

export function CorpoPasso({ info, passo, indice }: { info: AulaInfo; passo: PassoCompleto; indice: number }) {
  const n = info.aula.n;
  switch (passo.tipo) {
    case "objetivo":
      return <Objetivo info={info} />;
    case "tela":
      return <Tela p={passo} />;
    case "prompt":
      return <Prompt p={passo} />;
    case "texto":
      return <Texto p={passo} />;
    case "catalogo":
      return <Catalogo p={passo} />;
    case "mapa":
      return <Mapa p={passo} />;
    case "anatomia":
      return <Anatomia p={passo} />;
    case "comparacao":
      return <Comparacao p={passo} />;
    case "avaliacao":
      return <Avaliacao p={passo} chave={`${n}/${indice}`} />;
    case "resultado":
      return <Resultado p={passo} n={n} />;
  }
}
