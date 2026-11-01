import type { ReactNode } from "react";
import {
  AudioLines,
  BookOpen,
  Brain,
  Check,
  ChevronDown,
  Code,
  FileText,
  FolderOpen,
  GraduationCap,
  Image,
  Menu,
  MessageSquareDashed,
  Mic,
  Network,
  Paperclip,
  Pencil,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
  Telescope,
  Trash2,
  Video,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

import type { TelaId } from "@/content/imersao/tipos";
import { cn } from "@/lib/utils";

export type Ponto = { x: number; y: number; rotulo: string; texto: string };
export type Tela = { proporcao: number; pontos: Ponto[]; Desenho: () => ReactNode };

/* ---------- kit de desenho (coordenadas em % da moldura 16:10) ---------- */

function P({ x, y, w, h, className, children }: { x: number; y: number; w?: number; h?: number; className?: string; children?: ReactNode }) {
  return (
    <div
      className={cn("absolute", className)}
      style={{ left: `${x}%`, top: `${y}%`, width: w != null ? `${w}%` : undefined, height: h != null ? `${h}%` : undefined }}
    >
      {children}
    </div>
  );
}

function Linha({ x, y, w, h = 1.3, forte }: { x: number; y: number; w: number; h?: number; forte?: boolean }) {
  return <P x={x} y={y} w={w} h={h} className={cn("rounded-full", forte ? "bg-mock-suave/40" : "bg-mock-linha")} />;
}

function Ic({ i: I, className }: { i: LucideIcon; className?: string }) {
  return <I className={cn("size-[1.35cqw] shrink-0", className)} strokeWidth={2} />;
}

function Estrela({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-[1.5cqw] shrink-0 fill-mock-azul", className)} aria-hidden>
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}

function Item({ x, y, w, icone, texto, ativo, className }: { x: number; y: number; w: number; icone?: LucideIcon; texto: string; ativo?: boolean; className?: string }) {
  return (
    <P x={x} y={y} w={w} h={5.2} className={cn("flex items-center gap-[0.8cqw] rounded-[0.8cqw] px-[0.8cqw]", ativo && "bg-mock-azul-suave font-semibold", className)}>
      {icone && <Ic i={icone} />}
      <span className="truncate">{texto}</span>
    </P>
  );
}

function Botao({ x, y, w, texto, cheio, icone }: { x: number; y: number; w: number; texto: string; cheio?: boolean; icone?: LucideIcon }) {
  return (
    <P
      x={x}
      y={y}
      w={w}
      h={5.4}
      className={cn(
        "flex items-center justify-center gap-[0.5cqw] rounded-full border font-semibold",
        cheio ? "border-mock-azul bg-mock-azul text-mock-bg" : "border-mock-linha bg-mock-bg",
      )}
    >
      {icone && <Ic i={icone} className="size-[1.1cqw]" />}
      <span className="truncate">{texto}</span>
    </P>
  );
}

function Moldura({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mock relative h-full w-full overflow-hidden bg-mock-bg text-[1.12cqw] leading-tight text-mock-texto", className)}>{children}</div>;
}

/** Tela base do app Gemini: menu lateral, topo com modelo e (opcional) a home. */
function AppGemini({ menu, home = true, children }: { menu?: "skills" | "personalizar"; home?: boolean; children?: ReactNode }) {
  return (
    <Moldura>
      {/* menu lateral */}
      <P x={0} y={0} w={19} h={100} className="bg-mock-painel" />
      <P x={2.4} y={3.6}>
        <Ic i={Menu} className="size-[1.6cqw]" />
      </P>
      <Item x={1.5} y={11.5} w={16} icone={Pencil} texto="Novo chat" />
      <Item x={1.5} y={18.5} w={16} icone={Zap} texto="Skills" ativo={menu === "skills"} />
      <Item x={1.5} y={25.5} w={16} icone={BookOpen} texto="Notebooks" />
      <P x={2.5} y={36} className="text-[0.95cqw] font-semibold text-mock-suave">
        Recentes
      </P>
      {[42, 47.5, 53, 58.5, 64, 69.5].map((y, i) => (
        <Linha key={y} x={2.5} y={y} w={[13, 11, 14, 10, 12.5, 9][i] ?? 10} />
      ))}
      <Item x={1.5} y={82} w={16} icone={SlidersHorizontal} texto="Personalizar" ativo={menu === "personalizar"} />
      <Item x={1.5} y={89} w={16} icone={Settings} texto="Configurações" />

      {/* topo */}
      <P x={21.5} y={2.6} className="text-[1.7cqw] font-medium">
        Gemini
      </P>
      <P x={29.3} y={2.6} w={9.8} h={5.4} className="flex items-center justify-center gap-[0.4cqw] rounded-full bg-mock-painel font-medium">
        3.6 Flash <Ic i={ChevronDown} className="size-[1cqw]" />
      </P>
      <P x={89.8} y={3.4}>
        <Ic i={MessageSquareDashed} className="size-[1.6cqw]" />
      </P>
      <P x={94.2} y={2.6} w={3.4} h={5.4} className="rounded-full bg-mock-azul" />

      {home && (
        <>
          <P x={30} y={31} w={58} className="text-center text-[2.5cqw] font-medium">
            <span className="text-mock-azul">Olá!</span> Por onde começamos?
          </P>
          <P x={30} y={45} w={58} h={18} className="rounded-[1.8cqw] border border-mock-linha bg-mock-bg shadow-sm" />
          <P x={32.6} y={48.6} className="text-mock-suave">
            Peça ao Gemini
          </P>
          <P x={31.4} y={56.6} w={2.8} h={4.6} className="flex items-center justify-center rounded-full">
            <Ic i={Plus} className="size-[1.5cqw]" />
          </P>
          <P x={35} y={56.4} w={9.6} h={5} className="flex items-center justify-center gap-[0.4cqw] rounded-full font-medium">
            <Ic i={SlidersHorizontal} className="size-[1.1cqw]" /> Ferramentas
          </P>
          <P x={80.6} y={56.8}>
            <Ic i={Mic} />
          </P>
          <P x={84.2} y={56.2} w={2.8} h={4.6} className="flex items-center justify-center rounded-full bg-mock-painel">
            <Ic i={AudioLines} className="size-[1.1cqw]" />
          </P>
          {[33, 46, 59, 72].map((x, i) => (
            <P key={x} x={x} y={69} w={12} h={4.8} className="flex items-center justify-center rounded-full border border-mock-linha text-[0.95cqw]">
              {["Criar imagem", "Ajuda para escrever", "Aprender", "Planejar"][i]}
            </P>
          ))}
        </>
      )}
      {children}
    </Moldura>
  );
}

function Pop({ x, y, w, h, children }: { x: number; y: number; w: number; h: number; children: ReactNode }) {
  return (
    <P x={x} y={y} w={w} h={h} className="rounded-[1.2cqw] border border-mock-linha bg-mock-bg shadow-lg">
      {children}
    </P>
  );
}

function Modal({ titulo, aba, children }: { titulo: string; aba: number; children: ReactNode }) {
  const abas = ["Instruções", "Memórias", "Apps conectados", "Skills"];
  return (
    <>
      <P x={0} y={0} w={100} h={100} className="bg-mock-texto/25" />
      <P x={24} y={8} w={70} h={86} className="rounded-[1.4cqw] bg-mock-bg shadow-xl" />
      <P x={26.5} y={11.2} className="text-[1.6cqw] font-semibold">
        {titulo}
      </P>
      <P x={91} y={11.6}>
        <Ic i={X} />
      </P>
      {abas.map((a, i) => (
        <Item key={a} x={25.5} y={19 + i * 6.6} w={17} texto={a} ativo={i === aba} />
      ))}
      {children}
    </>
  );
}

/* ---------- as telas ---------- */

export const telas: Record<TelaId, Tela> = {
  inicio: {
    proporcao: 1.6,
    Desenho: () => <AppGemini />,
    pontos: [
      {
        x: 10,
        y: 21,
        rotulo: "Menu lateral",
        texto:
          "Novo chat: começa uma conversa do zero.\nSkills e Notebooks: seus atalhos de prompt e suas bases de consulta.\nRecentes: as conversas anteriores, para retomar de onde parou.",
      },
      {
        x: 39,
        y: 5.3,
        rotulo: "Seletor de modelo",
        texto: "Indica qual modelo vai responder.\nPara começar: deixe o Flash. Use o Pro quando a tarefa exigir mais raciocínio.",
      },
      {
        x: 59,
        y: 45,
        rotulo: "Caixa de mensagem",
        texto: "É onde você escreve, cola um prompt ou fala pelo microfone.\nEnter envia. Shift + Enter quebra a linha.",
      },
      { x: 32.8, y: 58.9, rotulo: "Botão +", texto: "Adiciona arquivos, fotos, itens do Drive ou um notebook à conversa." },
    ],
  },

  modelos: {
    proporcao: 1.6,
    Desenho: () => (
      <AppGemini>
        <Pop x={29.3} y={9.5} w={27} h={44}>
          <span />
        </Pop>
        <P x={31} y={11.6} className="text-[0.95cqw] font-semibold text-mock-suave">
          Escolha seu modelo
        </P>
        {[
          ["Flash", "Rápido para o dia a dia"],
          ["Pro", "Raciocínio avançado"],
          ["4 Argon", "Projetos complexos"],
          ["Deep Think", "Raciocínio profundo"],
        ].map(([n, d], i) => (
          <P key={n} x={30.2} y={17 + i * 8.6} w={25.2} h={7.6} className={cn("flex items-center justify-between rounded-[0.8cqw] px-[1cqw]", i === 0 && "bg-mock-azul-suave")}>
            <span>
              <b className="block font-semibold">{n}</b>
              <span className="text-[0.95cqw] text-mock-suave">{d}</span>
            </span>
            {i === 0 && <Ic i={Check} className="text-mock-azul" />}
          </P>
        ))}
      </AppGemini>
    ),
    pontos: [
      { x: 56, y: 20.8, rotulo: "Flash", texto: "Rápido e muito capaz para a maioria das tarefas: e-mails, resumos, análises curtas.\nPara começar: deixe este selecionado." },
      { x: 56, y: 29.4, rotulo: "Pro", texto: "Pensa mais antes de responder. Use em problemas complexos, documentos longos e dados.\nPlanos: limites maiores no Pro e no Ultra." },
      { x: 56, y: 38, rotulo: "4 Argon", texto: "Modelo de fronteira para projetos de ponta a ponta, como relatórios e apresentações a partir de várias fontes.\nPlanos: Pro e Ultra." },
      { x: 56, y: 46.6, rotulo: "Deep Think", texto: "Modo de raciocínio profundo para ciência e engenharia. A resposta leva alguns minutos.\nPlano: Ultra." },
    ],
  },

  ferramentas: {
    proporcao: 1.6,
    Desenho: () => (
      <AppGemini>
        <P x={35} y={56.4} w={9.6} h={5} className="rounded-full bg-mock-azul-suave" />
        <P x={35} y={56.4} w={9.6} h={5} className="flex items-center justify-center gap-[0.4cqw] rounded-full font-semibold text-mock-azul">
          <Ic i={SlidersHorizontal} className="size-[1.1cqw]" /> Ferramentas
        </P>
        <Pop x={35} y={8} w={24} h={36}>
          <span />
        </Pop>
        {(
          [
            [Telescope, "Deep Research"],
            [FileText, "Canvas"],
            [Image, "Criar imagem"],
            [Video, "Criar vídeo"],
            [GraduationCap, "Aprendizado guiado"],
          ] as const
        ).map(([I, t], i) => (
          <Item key={t} x={36} y={10 + i * 6.6} w={22} icone={I} texto={t} />
        ))}
      </AppGemini>
    ),
    pontos: [
      { x: 39.8, y: 63, rotulo: "Botão Ferramentas", texto: "Abre a lista de ferramentas. A escolhida aparece como etiqueta na caixa de mensagem." },
      { x: 58.5, y: 12.6, rotulo: "Deep Research", texto: "Pesquisa a fundo: monta um plano, lê centenas de fontes e entrega um relatório com as fontes citadas." },
      { x: 58.5, y: 19.2, rotulo: "Canvas", texto: "Abre um espaço ao lado da conversa para criar e editar documentos, código e apps simples." },
      { x: 58.5, y: 29, rotulo: "Imagem e vídeo", texto: "Criar imagem: gera e edita imagens com o Nano Banana.\nCriar vídeo: gera vídeos curtos com som (planos pagos, 18+)." },
      { x: 58.5, y: 39, rotulo: "Aprendizado guiado", texto: "Explica passo a passo, faz perguntas e verifica se você entendeu, em vez de entregar a resposta pronta." },
    ],
  },

  mais: {
    proporcao: 1.6,
    Desenho: () => (
      <AppGemini>
        <P x={31.4} y={56.6} w={2.8} h={4.6} className="rounded-full bg-mock-azul-suave" />
        <P x={31.4} y={56.6} w={2.8} h={4.6} className="flex items-center justify-center text-mock-azul">
          <Ic i={Plus} className="size-[1.5cqw]" />
        </P>
        <Pop x={31} y={12} w={22} h={34}>
          <span />
        </Pop>
        {(
          [
            [Paperclip, "Enviar arquivos"],
            [FolderOpen, "Adicionar do Drive"],
            [Image, "Fotos"],
            [Code, "Importar código"],
            [BookOpen, "Notebook"],
          ] as const
        ).map(([I, t], i) => (
          <Item key={t} x={32} y={14 + i * 6.2} w={20} icone={I} texto={t} />
        ))}
      </AppGemini>
    ),
    pontos: [
      { x: 52.5, y: 16.6, rotulo: "Enviar arquivos", texto: "Anexa PDFs, planilhas, apresentações, imagens, áudios e vídeos do seu computador.\nPlanos pagos: até 1.500 páginas por vez." },
      { x: 52.5, y: 22.8, rotulo: "Adicionar do Drive", texto: "Escolhe arquivos que já estão no seu Google Drive, sem baixar nada." },
      { x: 52.5, y: 41.4, rotulo: "Notebook", texto: "Liga a conversa a um notebook: o Gemini responde com base nas fontes que você reuniu nele." },
    ],
  },

  personalizar: {
    proporcao: 1.6,
    Desenho: () => (
      <AppGemini menu="personalizar" home={false}>
        <Modal titulo="Personalizar" aba={0}>
          <P x={46} y={19.6} className="font-semibold">
            Instruções para o Gemini
          </P>
          <P x={46} y={25} w={45} h={47} className="rounded-[1cqw] border border-mock-linha" />
          {[29, 33.5, 38, 42.5, 50, 54.5, 59].map((y, i) => (
            <Linha key={y} x={48} y={y} w={[38, 34, 39, 22, 36, 30, 25][i] ?? 30} forte={i === 0 || i === 4} />
          ))}
          <Botao x={74} y={78} w={8} texto="Cancelar" />
          <Botao x={83.5} y={78} w={8} texto="Salvar" cheio />
        </Modal>
      </AppGemini>
    ),
    pontos: [
      { x: 10, y: 84.6, rotulo: "Personalizar", texto: "Fica no menu lateral. Abre o painel onde você ajusta como o Gemini responde e o que ele pode usar." },
      { x: 42.5, y: 21.6, rotulo: "Instruções", texto: "Conte quem você é, que trabalho faz e como prefere as respostas. Vale para todas as conversas." },
      { x: 68, y: 25, rotulo: "Campo de instruções", texto: "Cole aqui o perfil do seu trabalho. Texto curto e específico funciona melhor que uma lista longa de regras." },
      { x: 42.5, y: 34.8, rotulo: "Apps conectados", texto: "Escolha quais serviços o Gemini pode consultar, como Gmail, Drive e Agenda. Tudo é opcional." },
      { x: 87.5, y: 80.7, rotulo: "Salvar", texto: "Sem salvar, nada muda. Depois, teste com uma pergunta para ver a diferença." },
    ],
  },

  memorias: {
    proporcao: 1.6,
    Desenho: () => (
      <AppGemini menu="personalizar" home={false}>
        <Modal titulo="Personalizar" aba={1}>
          <P x={46} y={19.4} className="font-semibold">
            Usar chats anteriores
          </P>
          <P x={86} y={19} w={4} h={4.4} className="rounded-full bg-mock-azul" />
          <P x={88.2} y={19.6} w={1.5} h={3.2} className="rounded-full bg-mock-bg" />
          <P x={46} y={28} className="text-[0.95cqw] font-semibold text-mock-suave">
            Memórias salvas
          </P>
          {["Prefere respostas em tópicos curtos", "Atende pequenos negócios em Imperatriz", "Faz o relatório mensal da unidade", "Não usar emojis nas respostas"].map((t, i) => (
            <P key={t} x={46} y={32 + i * 8.4} w={45} h={7} className="flex items-center justify-between rounded-[0.8cqw] border border-mock-linha px-[1cqw]">
              <span className="truncate">{t}</span>
              <span className="flex gap-[0.8cqw] text-mock-suave">
                <Ic i={Pencil} className="size-[1.1cqw]" />
                <Ic i={Trash2} className="size-[1.1cqw]" />
              </span>
            </P>
          ))}
          <P x={46} y={70.5} className="font-semibold text-mock-azul">
            Importar memórias de outra IA
          </P>
        </Modal>
      </AppGemini>
    ),
    pontos: [
      { x: 88, y: 21.2, rotulo: "Usar chats anteriores", texto: "Ligado: o Gemini pode usar conversas passadas para dar continuidade.\nDesligado: cada conversa começa do zero." },
      { x: 89, y: 35.5, rotulo: "Memória salva", texto: "Cada linha é algo que o Gemini lembra sobre você. Use o lápis para corrigir e a lixeira para apagar." },
      { x: 58, y: 72, rotulo: "Importar", texto: "Traz preferências e histórico de outros assistentes de IA para o Gemini." },
      { x: 90.7, y: 5.4, rotulo: "Chat temporário", texto: "Abre uma conversa que não fica no histórico nem é usada para personalizar respostas. Bom para assuntos pontuais." },
    ],
  },

  skills: {
    proporcao: 1.6,
    Desenho: () => (
      <AppGemini menu="skills" home={false}>
        <P x={22} y={11} className="text-[2cqw] font-semibold">
          Skills
        </P>
        <P x={22} y={16.5} className="text-mock-suave">
          Instruções salvas que o Gemini usa quando o pedido combina.
        </P>
        <Botao x={83} y={10.6} w={11} texto="Criar skill" cheio icone={Plus} />
        {[
          ["Resposta a pedido de consultoria", true],
          ["Meu estilo de escrita", true],
          ["Relatório mensal da unidade", false],
          ["Manual da marca", false],
        ].map(([t, on], i) => (
          <P key={String(t)} x={22 + (i % 2) * 37} y={25 + Math.floor(i / 2) * 18} w={35} h={15} className="rounded-[1cqw] border border-mock-linha p-[1.2cqw]">
            <span className="flex items-center gap-[0.6cqw] font-semibold">
              <Ic i={Zap} className="text-mock-azul" /> {t}
            </span>
            <span className="mt-[0.8cqw] block h-[0.6cqw] w-4/5 rounded-full bg-mock-linha" />
            <span className="mt-[0.6cqw] block h-[0.6cqw] w-3/5 rounded-full bg-mock-linha" />
            <span className={cn("absolute right-[1.2cqw] top-[1.2cqw] h-[1.8cqw] w-[3.2cqw] rounded-full", on ? "bg-mock-azul" : "bg-mock-linha")} />
          </P>
        ))}
        <P x={30} y={70} w={58} h={16} className="rounded-[1.6cqw] border border-mock-linha bg-mock-bg shadow-sm" />
        <P x={32.5} y={73.4} className="text-mock-suave">
          Escreva o convite para a oficina de quinta…
        </P>
        <P x={32.5} y={79.2} w={17} h={4.6} className="flex items-center gap-[0.4cqw] rounded-full bg-mock-azul-suave px-[0.8cqw] font-semibold text-mock-azul">
          <Ic i={Zap} className="size-[1cqw]" /> Meu estilo de escrita
        </P>
      </AppGemini>
    ),
    pontos: [
      { x: 10, y: 21, rotulo: "Skills no menu", texto: "Abre a lista das suas skills. Elas estão substituindo os Gems, que serão migrados automaticamente." },
      { x: 88.5, y: 13.3, rotulo: "Criar skill", texto: "Cria uma skill do zero. Você também pode pedir no chat: “transforme esta conversa em uma skill”." },
      { x: 55, y: 28.4, rotulo: "Skill ligada", texto: "Ligada: o Gemini usa a skill quando o pedido combina com ela.\nDesligada: fica guardada, sem ser usada." },
      { x: 41, y: 81.5, rotulo: "Skill em uso", texto: "A etiqueta mostra qual skill entrou na resposta. Dá para combinar mais de uma, como estilo + manual da marca." },
    ],
  },

  "deep-research": {
    proporcao: 1.6,
    Desenho: () => (
      <AppGemini home={false}>
        <P x={52} y={11} w={36} h={8} className="flex items-center rounded-[1.4cqw] bg-mock-painel px-[1.2cqw]">
          Pesquise o turismo gastronômico em Barreirinhas…
        </P>
        <P x={30} y={23} w={58} h={48} className="rounded-[1.4cqw] border border-mock-linha bg-mock-bg shadow-sm" />
        <P x={32.5} y={26} className="flex items-center gap-[0.6cqw] text-[0.95cqw] font-semibold text-mock-suave">
          <Ic i={Telescope} className="text-mock-azul" /> PLANO DE PESQUISA
        </P>
        <P x={32.5} y={30.6} className="text-[1.4cqw] font-semibold">
          Turismo gastronômico em Barreirinhas
        </P>
        {["Mapear fluxo de visitantes e sazonalidade", "Levantar oferta de restaurantes e roteiros", "Identificar perfil e gasto médio do turista", "Buscar tendências e casos semelhantes", "Apontar lacunas e oportunidades"].map((t, i) => (
          <P key={t} x={33} y={37 + i * 4.8} className="flex items-center gap-[0.8cqw]">
            <span className="size-[0.7cqw] rounded-full bg-mock-azul" /> {t}
          </P>
        ))}
        <Botao x={62} y={62.5} w={11.5} texto="Editar plano" />
        <Botao x={74.5} y={62.5} w={12} texto="Iniciar pesquisa" cheio />
        <P x={30} y={78} w={58} h={13} className="rounded-[1.6cqw] border border-mock-linha bg-mock-bg" />
        <P x={32.5} y={82.6} w={13} h={4.6} className="flex items-center gap-[0.4cqw] rounded-full bg-mock-azul-suave px-[0.8cqw] font-semibold text-mock-azul">
          <Ic i={Telescope} className="size-[1cqw]" /> Deep Research
        </P>
      </AppGemini>
    ),
    pontos: [
      { x: 31.5, y: 38, rotulo: "Plano de pesquisa", texto: "Antes de começar, o Gemini mostra o que pretende investigar. Leia com atenção: é aqui que você corrige o rumo." },
      { x: 67.7, y: 62.5, rotulo: "Editar plano", texto: "Inclua, retire ou especifique etapas: região, período, tipo de fonte, o que deixar de fora." },
      { x: 80.5, y: 62.5, rotulo: "Iniciar pesquisa", texto: "Começa a pesquisa. Leva alguns minutos; você pode sair e voltar depois." },
      { x: 39, y: 82.6, rotulo: "Ferramenta ativa", texto: "A etiqueta indica que a próxima mensagem usa o Deep Research. Clique no X para voltar ao chat normal." },
    ],
  },

  notebook: {
    proporcao: 1.6,
    Desenho: () => (
      <Moldura>
        <P x={0} y={0} w={100} h={9} className="flex items-center gap-[0.8cqw] border-b border-mock-linha px-[2cqw] font-semibold">
          <Ic i={BookOpen} className="text-mock-azul" /> Plano de ação · Unidade Caxias
        </P>
        <P x={0} y={9} w={24} h={91} className="border-r border-mock-linha bg-mock-painel" />
        <P x={2} y={12} className="font-semibold">
          Fontes
        </P>
        <Botao x={11} y={11.4} w={11.5} texto="Adicionar" icone={Plus} />
        {["Plano de ação 2026.pdf", "Resultados 1º sem.xlsx", "Ata reunião de metas", "Pesquisa de satisfação"].map((t, i) => (
          <P key={t} x={1.5} y={20 + i * 6.4} w={21} h={5.4} className="flex items-center gap-[0.6cqw] rounded-[0.6cqw] bg-mock-bg px-[0.6cqw]">
            <span className="flex size-[1.2cqw] items-center justify-center rounded-[0.3cqw] bg-mock-azul text-mock-bg">
              <Ic i={Check} className="size-[0.9cqw]" />
            </span>
            <span className="truncate text-[0.95cqw]">{t}</span>
          </P>
        ))}
        <P x={46} y={14} w={27} h={7} className="flex items-center rounded-[1.2cqw] bg-mock-painel px-[1cqw] text-[0.95cqw]">
          Quais metas estão atrasadas e por quê?
        </P>
        {[25, 29.5, 34, 38.5, 45, 49.5, 54].map((y, i) => (
          <Linha key={y} x={27} y={y} w={[40, 44, 38, 30, 42, 36, 28][i] ?? 30} />
        ))}
        {[
          [68, 24.6, "1"],
          [72.5, 33.6, "2"],
          [58, 44.6, "3"],
        ].map(([x, y, n]) => (
          <P key={String(n)} x={Number(x)} y={Number(y)} w={1.8} h={2.6} className="flex items-center justify-center rounded-[0.3cqw] bg-mock-azul-suave text-[0.8cqw] font-bold text-mock-azul">
            {n}
          </P>
        ))}
        <P x={27} y={86} w={46} h={9} className="rounded-full border border-mock-linha" />
        <P x={76} y={9} w={24} h={91} className="border-l border-mock-linha" />
        {(
          [
            [AudioLines, "Resumo em áudio"],
            [Network, "Mapa mental"],
            [GraduationCap, "Guia de estudo"],
          ] as const
        ).map(([I, t], i) => (
          <P key={t} x={78} y={13 + i * 12} w={20} h={10} className="flex flex-col justify-center gap-[0.4cqw] rounded-[1cqw] border border-mock-linha px-[1cqw]">
            <Ic i={I} className="text-mock-azul" />
            <span className="font-semibold">{t}</span>
          </P>
        ))}
      </Moldura>
    ),
    pontos: [
      { x: 2.5, y: 22.6, rotulo: "Fontes", texto: "Os documentos que você reuniu. O Gemini responde só com base nas fontes marcadas." },
      { x: 22.5, y: 14, rotulo: "Adicionar fontes", texto: "Inclua PDFs, planilhas, documentos do Drive, links e textos colados." },
      { x: 70, y: 22, rotulo: "Citações", texto: "Cada número leva ao trecho da fonte. Clique para conferir se a resposta diz o que o documento diz." },
      { x: 97, y: 18, rotulo: "Resumo em áudio", texto: "Gera uma conversa em áudio sobre as fontes, no formato de podcast. Também cria mapa mental e guia de estudo." },
    ],
  },

  canvas: {
    proporcao: 1.6,
    Desenho: () => (
      <Moldura>
        <P x={0} y={0} w={33} h={100} className="border-r border-mock-linha bg-mock-painel" />
        <P x={9} y={8} w={22} h={10} className="rounded-[1.2cqw] bg-mock-bg p-[0.8cqw] text-[0.95cqw]">
          Crie um guia de uma página para a oficina de precificação.
        </P>
        <P x={2} y={23} className="flex items-center gap-[0.6cqw]">
          <Estrela /> <span className="font-semibold">Pronto! Criei o guia no Canvas.</span>
        </P>
        {[29, 33.5, 38].map((y, i) => (
          <Linha key={y} x={2} y={y} w={[27, 24, 18][i] ?? 20} />
        ))}
        <P x={2} y={86} w={29} h={9} className="rounded-full border border-mock-linha bg-mock-bg" />
        <P x={33} y={0} w={67} h={10} className="border-b border-mock-linha" />
        <P x={35.5} y={3.4} className="font-semibold">
          Guia rápido · Oficina de precificação
        </P>
        <Botao x={73} y={2.4} w={10} texto="Compartilhar" />
        <Botao x={84.5} y={2.4} w={13.5} texto="Exportar para Docs" cheio />
        <P x={40} y={15} className="text-[2cqw] font-semibold">
          Como calcular seu preço
        </P>
        {[22.5, 27].map((y, i) => (
          <Linha key={y} x={40} y={y} w={[48, 42][i] ?? 40} />
        ))}
        <P x={39} y={32} w={44} h={10} className="rounded-[0.6cqw] bg-mock-azul-suave" />
        {[34, 38.5].map((y, i) => (
          <Linha key={y} x={40} y={y} w={[41, 33][i] ?? 30} forte />
        ))}
        <P x={52} y={24.5} w={15} h={5.4} className="flex items-center justify-center gap-[0.4cqw] rounded-full bg-mock-texto font-semibold text-mock-bg shadow-md">
          <Estrela className="size-[1cqw] fill-mock-bg" /> Pedir ao Gemini
        </P>
        {[47, 51.5, 56, 63, 67.5, 72, 76.5].map((y, i) => (
          <Linha key={y} x={40} y={y} w={[46, 50, 38, 44, 49, 40, 30][i] ?? 40} />
        ))}
      </Moldura>
    ),
    pontos: [
      { x: 16.5, y: 32, rotulo: "Conversa", texto: "Você continua conversando aqui. Cada pedido altera o documento ao lado." },
      { x: 62, y: 15, rotulo: "Documento", texto: "O material fica editável: você pode escrever direto nele, como num editor de texto." },
      { x: 67, y: 27, rotulo: "Trecho selecionado", texto: "Selecione um trecho e clique em Pedir ao Gemini para ajustar só aquela parte: “mais curto”, “inclua um exemplo”." },
      { x: 91.2, y: 2.4, rotulo: "Exportar para Docs", texto: "Leva o material para o Google Docs, onde você revisa, formata e compartilha." },
    ],
  },

  gmail: {
    proporcao: 1.6,
    Desenho: () => (
      <Moldura>
        <P x={0} y={0} w={15} h={100} className="bg-mock-painel" />
        <P x={1.5} y={9} w={11} h={7} className="flex items-center justify-center gap-[0.5cqw] rounded-[1.2cqw] bg-mock-azul-suave font-semibold">
          <Ic i={Pencil} /> Escrever
        </P>
        {["Entrada", "Com estrela", "Enviados", "Rascunhos"].map((t, i) => (
          <Item key={t} x={1} y={20 + i * 6} w={13} texto={t} ativo={i === 0} />
        ))}
        <P x={17} y={2.4} w={42} h={6} className="flex items-center gap-[0.6cqw] rounded-full bg-mock-painel px-[1cqw] text-mock-suave">
          <Ic i={Search} /> Pesquisar e-mail
        </P>
        <P x={66} y={2.4} w={4} h={6} className="flex items-center justify-center rounded-full bg-mock-azul-suave">
          <Estrela />
        </P>
        <P x={17} y={13} className="text-[1.5cqw] font-semibold">
          Inscrição na oficina de Caxias
        </P>
        <P x={17} y={19.5} className="flex items-center gap-[0.6cqw]">
          <span className="size-[2cqw] rounded-full bg-mock-linha" /> <b>Empresa (fictícia)</b> <span className="text-mock-suave">· 12 mensagens</span>
        </P>
        {[27, 31.5, 36, 40.5, 47, 51.5].map((y, i) => (
          <Linha key={y} x={17} y={y} w={[48, 44, 50, 30, 46, 38][i] ?? 40} />
        ))}
        <P x={17} y={64} w={52} h={30} className="rounded-[1cqw] border border-mock-linha" />
        <P x={18.5} y={67} w={15} h={5} className="flex items-center justify-center gap-[0.4cqw] rounded-full bg-mock-azul-suave font-semibold text-mock-azul">
          <Pencil className="size-[1cqw]" /> Escrever com ajuda
        </P>
        <P x={71} y={0} w={29} h={100} className="border-l border-mock-linha bg-mock-painel" />
        <P x={73} y={3.4} className="flex items-center gap-[0.6cqw] font-semibold">
          <Estrela /> Gemini
        </P>
        <P x={72.5} y={11} w={26} h={27} className="rounded-[1cqw] bg-mock-bg p-[1cqw]">
          <b className="font-semibold">Resumo desta conversa</b>
        </P>
        {[17, 21.5, 26, 30.5].map((y, i) => (
          <Linha key={y} x={74} y={y} w={[22, 20, 23, 15][i] ?? 20} />
        ))}
        {["Liste as pendências", "Sugira uma resposta", "Quem precisa responder?"].map((t, i) => (
          <P key={t} x={72.5} y={44 + i * 6.5} w={22} h={5} className="flex items-center rounded-full border border-mock-linha bg-mock-bg px-[1cqw] text-[0.95cqw]">
            {t}
          </P>
        ))}
        <P x={72.5} y={87} w={26} h={8} className="rounded-full border border-mock-linha bg-mock-bg" />
      </Moldura>
    ),
    pontos: [
      { x: 68, y: 2.4, rotulo: "Botão do Gemini", texto: "Abre o painel lateral do Gemini. Ele entende o e-mail ou a conversa aberta." },
      { x: 98, y: 13, rotulo: "Resumo", texto: "Resume a conversa toda em poucas linhas. Confira sempre nas mensagens originais antes de decidir." },
      { x: 94.5, y: 46.5, rotulo: "Sugestões", texto: "Pedidos prontos para começar. Você também pode escrever o seu, com mais contexto." },
      { x: 33.5, y: 69.5, rotulo: "Escrever com ajuda", texto: "Gera um rascunho de resposta a partir de tópicos ou de um pedido. Você revisa antes de inserir e enviar." },
    ],
  },

  sheets: {
    proporcao: 1.6,
    Desenho: () => (
      <Moldura>
        <P x={0} y={0} w={70} h={9} className="flex items-center gap-[0.8cqw] border-b border-mock-linha px-[1.5cqw] font-semibold">
          <span className="size-[1.6cqw] rounded-[0.3cqw] bg-verde" /> Atendimentos 2026 (fictício)
        </P>
        <P x={66} y={2} w={3.6} h={5.6} className="flex items-center justify-center rounded-full bg-mock-azul-suave">
          <Estrela />
        </P>
        {Array.from({ length: 10 }).map((_, r) => (
          <P key={r} x={0} y={11 + r * 6} w={70} h={6} className={cn("grid grid-cols-5 border-b border-mock-linha text-[0.9cqw]", r === 0 && "bg-mock-painel font-semibold")}>
            {(r === 0 ? ["Cidade", "Atend.", "Espera (d)", "Retorno", "Nota"] : ["", "", "", "", ""]).map((c, k) => (
              <span key={k} className="flex items-center border-r border-mock-linha px-[0.6cqw]">
                {c || <span className="h-[0.6cqw] w-3/5 rounded-full bg-mock-linha" />}
              </span>
            ))}
          </P>
        ))}
        <P x={70} y={0} w={30} h={100} className="border-l border-mock-linha bg-mock-painel" />
        <P x={72} y={3.4} className="flex items-center gap-[0.6cqw] font-semibold">
          <Estrela /> Gemini
        </P>
        <P x={77} y={10.5} w={21.5} h={9} className="rounded-[1.2cqw] bg-mock-bg p-[0.8cqw] text-[0.95cqw]">
          Compare espera e nota por cidade em um gráfico.
        </P>
        {[24, 28.5].map((y, i) => (
          <Linha key={y} x={72} y={y} w={[24, 19][i] ?? 20} />
        ))}
        <P x={72} y={34} w={26.5} h={32} className="rounded-[1cqw] bg-mock-bg p-[1cqw]" />
        {[46, 38, 52, 30, 44].map((h, i) => (
          <P key={i} x={74.5 + i * 4.6} y={62 - h * 0.45} w={3} h={h * 0.45} className="rounded-t-[0.3cqw] bg-mock-azul" />
        ))}
        <Botao x={72} y={70} w={11} texto="Inserir" cheio />
        <P x={72} y={87} w={26.5} h={8} className="rounded-full border border-mock-linha bg-mock-bg" />
      </Moldura>
    ),
    pontos: [
      { x: 67.8, y: 2, rotulo: "Botão do Gemini", texto: "Abre o painel do Gemini com a planilha aberta como contexto." },
      { x: 98.5, y: 12, rotulo: "Pedido", texto: "Peça análises, fórmulas, tabelas ou gráficos em português. Diga quais colunas usar e o que quer decidir." },
      { x: 97, y: 36, rotulo: "Gráfico e leitura", texto: "O Gemini mostra o resultado antes de inserir. Confira se os números batem com a planilha." },
      { x: 83, y: 70, rotulo: "Inserir", texto: "Coloca o gráfico, a tabela ou a fórmula na planilha. Nada muda antes desse clique." },
    ],
  },

  docs: {
    proporcao: 1.6,
    Desenho: () => (
      <Moldura className="bg-mock-painel">
        <P x={0} y={0} w={64} h={8} className="flex items-center gap-[0.8cqw] border-b border-mock-linha bg-mock-bg px-[1.5cqw] font-semibold">
          <span className="size-[1.6cqw] rounded-[0.3cqw] bg-mock-azul" /> Relatório da oficina (rascunho)
        </P>
        <P x={10} y={12} w={46} h={88} className="bg-mock-bg shadow-sm" />
        <P x={13} y={16} w={19} h={5.4} className="flex items-center justify-center gap-[0.4cqw] rounded-full bg-mock-azul-suave font-semibold text-mock-azul">
          <Estrela className="size-[1.1cqw]" /> Me ajude a escrever
        </P>
        {[27, 31.5, 36, 40.5, 47, 51.5, 56, 60.5, 67, 71.5].map((y, i) => (
          <Linha key={y} x={13} y={y} w={[38, 40, 35, 25, 39, 37, 40, 22, 36, 30][i] ?? 30} />
        ))}
        <P x={64} y={0} w={36} h={100} className="border-l border-mock-linha bg-mock-bg" />
        <P x={66} y={3} className="flex items-center gap-[0.6cqw] font-semibold">
          <Estrela /> Gemini
        </P>
        {[13, 17.5, 22, 26.5, 33, 37.5, 42].map((y, i) => (
          <Linha key={y} x={66} y={y} w={[30, 28, 31, 18, 29, 26, 20][i] ?? 20} />
        ))}
        <Botao x={66} y={50} w={9} texto="Inserir" cheio />
        <P x={66} y={78} w={32} h={16} className="rounded-[1.4cqw] border border-mock-linha" />
        <P x={67.5} y={81} w={19} h={4.6} className="flex items-center gap-[0.4cqw] rounded-full bg-mock-painel px-[0.8cqw] text-[0.95cqw] font-semibold">
          <FileText className="size-[1cqw]" /> @Plano da oficina
        </P>
      </Moldura>
    ),
    pontos: [
      { x: 31.5, y: 16, rotulo: "Me ajude a escrever", texto: "Cria ou reescreve texto direto no documento: um rascunho, um resumo, outro tom." },
      { x: 98, y: 5, rotulo: "Painel do Gemini", texto: "Converse sobre o documento aberto e sobre outros arquivos do Drive." },
      { x: 86, y: 81, rotulo: "@arquivo", texto: "Digite @ e escolha um arquivo do Drive para o Gemini usar como fonte. Só digitar o nome não basta." },
      { x: 75, y: 50, rotulo: "Inserir", texto: "Leva a resposta para o documento. Revise antes: o texto passa a ser seu." },
    ],
  },

  chrome: {
    proporcao: 1.6,
    Desenho: () => (
      <Moldura>
        <P x={0} y={0} w={100} h={6.5} className="bg-mock-painel" />
        {["Linha de crédito A", "Edital B", "Programa C"].map((t, i) => (
          <P key={t} x={1 + i * 16} y={1} w={15} h={5.5} className={cn("flex items-center rounded-t-[0.8cqw] px-[0.8cqw] text-[0.95cqw]", i === 0 && "bg-mock-bg font-semibold")}>
            {t}
          </P>
        ))}
        <P x={0} y={6.5} w={100} h={7} className="border-b border-mock-linha" />
        <P x={6} y={7.6} w={58} h={5} className="flex items-center rounded-full bg-mock-painel px-[1cqw] text-mock-suave">
          exemplo.gov.br/linha-de-credito
        </P>
        <P x={93.5} y={7.4} w={3.6} h={5.4} className="flex items-center justify-center rounded-full bg-mock-azul-suave">
          <Estrela />
        </P>
        <P x={5} y={20} className="text-[2cqw] font-semibold">
          Linha de crédito para pequenos negócios
        </P>
        {[28, 32.5, 37, 41.5, 48, 52.5, 57, 61.5, 68, 72.5].map((y, i) => (
          <Linha key={y} x={5} y={y} w={[56, 52, 58, 34, 55, 50, 57, 40, 53, 30][i] ?? 40} />
        ))}
        <P x={68} y={13.5} w={32} h={86.5} className="border-l border-mock-linha bg-mock-painel" />
        <P x={70} y={16} className="flex items-center gap-[0.6cqw] font-semibold">
          <Estrela /> Gemini
        </P>
        <P x={70} y={21.5} w={14} h={4.6} className="flex items-center gap-[0.4cqw] rounded-full bg-mock-azul-suave px-[0.8cqw] text-[0.95cqw] font-semibold text-mock-azul">
          3 abas compartilhadas
        </P>
        <P x={70} y={30} w={28} h={28} className="grid grid-cols-3 overflow-hidden rounded-[0.8cqw] border border-mock-linha bg-mock-bg text-[0.85cqw]">
          {["Item", "Prazo", "Público", "", "", "", "", "", "", "", "", ""].map((c, k) => (
            <span key={k} className={cn("flex items-center border-b border-r border-mock-linha px-[0.5cqw]", k < 3 && "bg-mock-painel font-semibold")}>
              {c || <span className="h-[0.5cqw] w-3/5 rounded-full bg-mock-linha" />}
            </span>
          ))}
        </P>
        <Botao x={70} y={63} w={18} texto="Auto browse (prévia)" />
        <P x={70} y={88} w={28} h={8} className="rounded-full border border-mock-linha bg-mock-bg" />
      </Moldura>
    ),
    pontos: [
      { x: 95.3, y: 7.4, rotulo: "Gemini no Chrome", texto: "Abre o painel lateral. O Gemini entende a página aberta sem você copiar nada." },
      { x: 84, y: 21.5, rotulo: "Abas compartilhadas", texto: "Inclua várias abas na mesma pergunta para comparar páginas lado a lado." },
      { x: 98, y: 30, rotulo: "Resposta em tabela", texto: "Peça a comparação em tabela, com o link de cada informação. Confira na página original antes de usar." },
      { x: 88, y: 63, rotulo: "Auto browse", texto: "Em prévia: o Gemini navega e preenche etapas por você. Sempre confirme antes de envios, cadastros ou compras." },
    ],
  },

  agendadas: {
    proporcao: 1.6,
    Desenho: () => (
      <AppGemini home={false}>
        <P x={22} y={11} className="text-[2cqw] font-semibold">
          Ações programadas
        </P>
        {[
          ["Resumo semanal da unidade", "Toda segunda, 08:00", "Próxima: seg., 08:00", true],
          ["Lembrete de metas do mês", "Todo dia 25, 09:00", "Próxima: 25/11, 09:00", true],
          ["Notícias do setor de turismo", "Toda sexta, 17:00", "Pausada", false],
        ].map(([t, r, p, on], i) => (
          <P key={String(t)} x={22} y={20 + i * 13} w={72} h={11} className="flex items-center justify-between rounded-[1cqw] border border-mock-linha px-[1.4cqw]">
            <span>
              <b className="block font-semibold">{t}</b>
              <span className="text-[0.95cqw] text-mock-suave">
                {r} · {p}
              </span>
            </span>
            <span className={cn("h-[1.8cqw] w-[3.2cqw] rounded-full", on ? "bg-mock-azul" : "bg-mock-linha")} />
          </P>
        ))}
        <P x={22} y={64} w={72} h={12} className="flex items-center gap-[0.8cqw] rounded-[1cqw] bg-mock-azul-suave px-[1.4cqw]">
          <Estrela /> Para criar, peça no chat: “Toda segunda às 8h, me envie…”
        </P>
      </AppGemini>
    ),
    pontos: [
      { x: 23.5, y: 22, rotulo: "Ação programada", texto: "Cada linha é uma tarefa que o Gemini executa sozinho, no horário marcado, e avisa quando termina." },
      { x: 42, y: 27.6, rotulo: "Recorrência", texto: "Mostra quando a ação roda e a próxima execução. Para mudar, edite ou peça no chat." },
      { x: 92.5, y: 24.5, rotulo: "Ligar e pausar", texto: "Pause uma ação sem apagar. Revise de tempos em tempos o que ainda faz sentido." },
      { x: 23.5, y: 66, rotulo: "Como criar", texto: "Escreva no chat o que quer, quando e com que frequência. O Gemini confirma antes de programar." },
    ],
  },
};

/** Moldura pronta: desenho + pontos numerados. */
export function TelaIlustrada({
  id,
  ativo,
  aoEscolher,
  mostrarPontos = true,
  className,
  marca,
}: {
  id: TelaId;
  ativo?: number;
  aoEscolher?: (i: number) => void;
  mostrarPontos?: boolean;
  className?: string;
  /** Marca "a" num ponto (usada em prompts: "cole aqui"). */
  marca?: { x: number; y: number };
}) {
  const tela = telas[id];
  const { Desenho } = tela;
  return (
    <div className={cn("relative w-full overflow-hidden rounded-[14px] border border-linha-2 sombra", className)} style={{ aspectRatio: tela.proporcao }}>
      <Desenho />
      {mostrarPontos &&
        tela.pontos.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => aoEscolher?.(i)}
            aria-label={`${i + 1}. ${p.rotulo}`}
            className={cn(
              "absolute flex size-[30px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[2.5px] border-branco text-[13px] font-bold shadow-md transition-transform hover:scale-110",
              ativo === i ? "bg-tinta text-branco" : "bg-cobre text-tinta",
              !aoEscolher && "pointer-events-none size-[22px] text-[11px]",
            )}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            {i + 1}
          </button>
        ))}
      {marca && (
        <span
          className="pointer-events-none absolute flex size-[28px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[2.5px] border-branco bg-tinta text-[13px] font-bold text-branco shadow-md"
          style={{ left: `${marca.x}%`, top: `${marca.y}%` }}
        >
          a
        </span>
      )}
    </div>
  );
}
