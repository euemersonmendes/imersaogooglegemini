/**
 * Modelo de dados da Imersão (mesmo formato do book de referência):
 * Módulo → Aula → Passos. Cada passo é uma tela cheia, endereçada como /aula/<n>/<passo>.
 *
 * Convenções de texto:
 * - `titulo` + `tituloEnfase`: a parte final do título que aparece em cobre, numa segunda linha.
 *   `tituloEnfase` precisa ser um trecho final exato de `titulo`.
 * - Em prompts e textos para copiar:
 *   linha "# Título" vira subtítulo do bloco; linha "- item" vira lista;
 *   linhas com " | " viram tabela (primeira linha = cabeçalho);
 *   [[trecho]] aparece destacado em cobre = "troque pelo seu caso".
 * - "**negrito**" é aceito em textos corridos.
 */

export type GlifoId = "chat" | "spark" | "chart" | "grid" | "bot";

export type TelaId =
  | "inicio"
  | "modelos"
  | "ferramentas"
  | "mais"
  | "personalizar"
  | "memorias"
  | "skills"
  | "deep-research"
  | "notebook"
  | "canvas"
  | "gmail"
  | "sheets"
  | "docs"
  | "chrome"
  | "agendadas";

export type Fonte = { nome: string; url: string };

type Base = {
  /** Rótulo curto da aba do passo (até ~22 caracteres). */
  rotulo: string;
  /** Rótulo do tipo, mostrado no sobretítulo: "02 · PROMPT". */
  rotuloTipo?: string;
  titulo: string;
  tituloEnfase?: string;
  /** Texto de apoio abaixo do título (1–2 frases). */
  texto?: string;
};

/** Mostra uma tela do Gemini com pontos clicáveis (definidos em telas.tsx). */
export type PassoTela = Base & { tipo: "tela"; tela: TelaId };

export type PassoPrompt = Base & {
  tipo: "prompt";
  /** Nome do prompt mostrado no cartão. */
  nomePrompt: string;
  prompt: string;
  /** Dica curta abaixo do cartão. */
  dica?: string;
  /** Lista "Observe na resposta". */
  observe?: string[];
  /** Coluna direita: o que você vai receber (exemplo fictício). */
  recebe?: { titulo: string; texto?: string; secoes: { rotulo: string; itens: string[] }[]; aceite?: string };
  /** Alternativa à coluna direita: uma tela com onde colar. */
  tela?: TelaId;
  marca?: string;
};

/** Opções para escolher uma e copiar (ex.: perfis de trabalho). */
export type PassoTexto = Base & {
  tipo: "texto";
  comoFazer: string[];
  rotuloSelecionado: string;
  rotuloCopiar: string;
  opcoes: { nome: string; resumo: string; texto: string }[];
};

/** Partes de um modelo/conceito; clicar em cada parte abre o detalhe. */
export type PassoCatalogo = Base & {
  tipo: "catalogo";
  itens: { sigla: string; nome: string; sub: string; rotulo: string; pergunta: string; cuidado: string; itens: string[] }[];
  /** Faixa de rodapé opcional com duas leituras. */
  ordens?: { rotulo: string; sequencia: string[]; texto: string }[];
};

/** Diagrama que se revela em quadros (botão "Revelar"). */
export type PassoMapa = Base & {
  tipo: "mapa";
  pedido?: string;
  /** Sentido das setas: "ida" (esquerda→direita) ou "volta". */
  fluxo: "ida" | "volta";
  rotuloSeta?: string;
  nos: { id: string; sigla: string; nome: string; itens: string[] }[];
  quadros: { legenda: string; abertos: string[]; foco?: string }[];
};

/** Prompt anotado em blocos, que se revelam um a um. */
export type PassoAnatomia = Base & {
  tipo: "anatomia";
  nomePrompt: string;
  intro: { titulo: string; texto: string };
  blocos: { titulo: string; pergunta: string; texto: string; nota?: string; ipo?: string }[];
  fecho: { titulo: string; texto: string };
};

/** Leitura apressada (riscada) × leitura certa, com exemplo ao lado. */
export type PassoComparacao = Base & {
  tipo: "comparacao";
  colunas: [string, string];
  linhas: [string, string][];
  frase?: string;
  exemplo?: { titulo: string; paragrafos: string[] };
};

/** Autoavaliação de 1 a 5; a menor nota aparece em destaque. */
export type PassoAvaliacao = Base & {
  tipo: "avaliacao";
  min: string;
  max: string;
  itens: { nome: string; sub: string; sugestao: string }[];
};

/** Fecho da aula: faça na sua conta + checklist + concluir. */
export type PassoResultado = Base & {
  tipo: "resultado";
  esperado: string[];
  confira: string[];
  visual?: { tipo: "tela"; tela: TelaId; legenda: string } | { tipo: "lista"; legenda: string; itens: string[] };
};

export type Passo =
  | PassoTela
  | PassoPrompt
  | PassoTexto
  | PassoCatalogo
  | PassoMapa
  | PassoAnatomia
  | PassoComparacao
  | PassoAvaliacao
  | PassoResultado;

export type Aula = {
  /** "1.1" */
  n: string;
  titulo: string;
  /** Nome curto (botão "continuar", abas). */
  curto: string;
  /** Ferramenta usada: "Gemini · Chat". */
  ferramenta: string;
  /** Uma frase: o que a pessoa vai conseguir fazer. */
  objetivo: string;
  /** Uma frase: o que ela leva ao final. */
  voceSaiCom: string;
  /** Parágrafo "Se quiser entender um pouco mais". */
  saibaMais?: string;
  fontes: Fonte[];
  /** Passos SEM o "Objetivo" (ele é gerado automaticamente como passo 1). */
  passos: Passo[];
};

export type Modulo = {
  id: string;
  glifo: GlifoId;
  /** Nome curto: "Conhecer". */
  nome: string;
  /** Nome completo: "Conhecer e personalizar o Gemini". */
  nomeCompleto: string;
  aulas: Aula[];
};
