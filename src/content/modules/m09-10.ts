import type { Module } from "../types";

export const m09: Module = {
  n: 9,
  title: "Ética e segurança",
  kicker: "Módulo 9",
  summary: "Alucinações, vieses, proteção de dados, LGPD e um checklist para usar a IA com responsabilidade.",
  sections: [
    {
      id: "9.1",
      title: "Limites da IA",
      pages: [
        {
          title: "Alucinações e vieses",
          blocks: [
            {
              type: "lead",
              text: "Alucinação é quando a IA inventa algo com total segurança: um número, uma lei, uma citação, um link. Não é má-fé — é como o modelo funciona. Por isso, verificar é parte do trabalho.",
            },
            {
              type: "steps",
              items: [
                { title: "Peça as fontes", text: "“Cite as fontes de cada dado.” Abra os links e confira." },
                { title: "Use o botão de verificação", text: "No app, a opção de checar a resposta com a Busca destaca trechos confirmados ou divergentes." },
                { title: "Desconfie do preciso demais", text: "Números exatos, nomes e datas são onde mais aparecem erros." },
                { title: "Cruze informações", text: "Para decisões importantes, compare com uma fonte oficial." },
              ],
            },
            {
              type: "callout",
              tone: "insight",
              text: "Vieses: a IA aprende com textos humanos e pode repetir estereótipos. Fique atento em temas sensíveis como gênero, raça, idade e região.",
            },
          ],
        },
      ],
    },
    {
      id: "9.2",
      title: "Dados e LGPD",
      pages: [
        {
          title: "Proteja você e seus clientes",
          blocks: [
            {
              type: "p",
              text: "A Lei Geral de Proteção de Dados (LGPD) vale também quando você usa IA. Dados pessoais de clientes e funcionários precisam de finalidade clara e cuidado.",
            },
            {
              type: "table",
              head: ["Pode colar", "Com cuidado", "Não cole"],
              rows: [
                ["Textos de marketing", "Planilhas sem nomes (anonimizadas)", "Senhas e chaves de acesso"],
                ["Rascunhos internos", "Contratos sem dados pessoais", "CPF, dados bancários, saúde"],
                ["Informações públicas", "Dados da empresa em conta de trabalho", "Segredos comerciais em conta pessoal"],
              ],
            },
            {
              type: "prompt",
              title: "Anonimize antes",
              text: "Substitua no texto abaixo todos os nomes de pessoas, CPFs, telefones, e-mails e endereços por marcadores como [CLIENTE 1], [TELEFONE] etc., mantendo o restante igual.",
              note: "Faça isso num chat temporário e só depois use o texto anonimizado.",
            },
          ],
        },
        {
          title: "Checklist de uso responsável",
          blocks: [
            {
              type: "checklist",
              id: "etica",
              title: "Antes de publicar ou enviar",
              items: [
                "Revisei fatos, números e nomes",
                "Conferi as fontes citadas",
                "Não expus dados pessoais ou confidenciais",
                "O texto soa como eu (ou minha marca)",
                "Indiquei uso de IA quando relevante (ex.: imagens realistas)",
                "Assumo a responsabilidade pelo conteúdo",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "9.3",
      title: "Revisão do módulo",
      pages: [
        {
          title: "Teste seus conhecimentos",
          blocks: [
            {
              type: "quiz",
              id: "q9",
              questions: [
                {
                  q: "O Gemini citou uma lei com número e artigo. O que fazer?",
                  options: [
                    "Usar direto, a IA não erra leis",
                    "Conferir na fonte oficial antes de usar",
                    "Pedir para ele repetir a resposta",
                    "Trocar para o modelo Flash",
                  ],
                  answer: 1,
                  explain: "Leis, números e citações são campos onde alucinações aparecem. Sempre confira na fonte oficial.",
                },
                {
                  q: "Qual destes dados você NÃO deve colar numa conta pessoal?",
                  options: ["Um post de Instagram", "Uma notícia pública", "A lista de clientes com CPF", "Um rascunho de e-mail"],
                  answer: 2,
                  explain: "Dados pessoais de clientes exigem cuidado pela LGPD. Anonimize ou use ambientes corporativos aprovados.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const m10: Module = {
  n: 10,
  title: "Plano de ação",
  kicker: "Módulo 10",
  summary: "Transforme o que aprendeu em hábito com um plano de 30 dias, um glossário e os próximos passos.",
  sections: [
    {
      id: "10.1",
      title: "Seus próximos 30 dias",
      pages: [
        {
          title: "Plano de 30 dias",
          blocks: [
            {
              type: "lead",
              text: "Conhecimento sem prática some em uma semana. Este plano leva cerca de 15 minutos por dia.",
            },
            {
              type: "table",
              head: ["Semana", "Foco", "Meta"],
              rows: [
                ["1", "Hábito", "Usar o Gemini todos os dias para 1 tarefa real (e-mail, resumo, ideia)"],
                ["2", "Prompts", "Escrever 5 prompts com os 4 ingredientes e salvar 2 como skills"],
                ["3", "Ferramentas", "Fazer 1 Deep Research, 1 protótipo no Canvas e 1 peça visual"],
                ["4", "Automação", "Programar 1 ação recorrente e medir quanto tempo economizou"],
              ],
            },
            {
              type: "checklist",
              id: "plano30",
              title: "Marque conforme avança",
              items: [
                "Semana 1: hábito diário criado",
                "Semana 2: 2 skills salvas",
                "Semana 3: Deep Research, Canvas e imagem testados",
                "Semana 4: 1 automação rodando",
                "Compartilhei um aprendizado com meu time",
              ],
            },
          ],
        },
        {
          title: "Meça o seu ganho",
          blocks: [
            {
              type: "prompt",
              title: "Diário de ganhos",
              text: "No fim de cada semana, me pergunte: quais tarefas fiz com o Gemini, quanto tempo levavam antes e quanto levam agora, e o que ainda não funcionou. Some o tempo economizado e sugira a próxima tarefa a automatizar.",
            },
            {
              type: "quote",
              text: "A IA não vai substituir você. Mas uma pessoa que sabe usar IA pode fazer muito mais do que alguém que não sabe.",
            },
          ],
        },
      ],
    },
    {
      id: "10.2",
      title: "Glossário e encerramento",
      pages: [
        {
          title: "Glossário",
          blocks: [
            {
              type: "table",
              head: ["Termo", "Significado"],
              rows: [
                ["Prompt", "O pedido ou instrução que você dá à IA."],
                ["Modelo", "O “cérebro” que gera as respostas (Flash, Pro, Argon…)."],
                ["Token", "Pedacinho de texto que o modelo processa. 1 milhão de tokens ≈ 1.500 páginas."],
                ["Janela de contexto", "Quanto conteúdo o modelo consegue considerar de uma vez."],
                ["Multimodal", "Capaz de lidar com texto, imagem, áudio, vídeo e código."],
                ["Alucinação", "Informação inventada apresentada como verdadeira."],
                ["Agente", "IA que planeja e executa tarefas de várias etapas por você."],
                ["Skill", "Conjunto de instruções reutilizáveis para uma tarefa específica."],
                ["Deep Research", "Recurso que pesquisa centenas de fontes e gera relatórios."],
                ["Canvas", "Espaço de cocriação de documentos, código e apps."],
                ["SynthID", "Marca d’água invisível em conteúdo gerado pela IA do Google."],
              ],
            },
          ],
        },
        {
          title: "Parabéns, você concluiu",
          blocks: [
            {
              type: "lead",
              text: "Você percorreu os fundamentos, aprendeu a pedir, conheceu os superpoderes do Gemini e tem um plano para os próximos 30 dias.",
            },
            {
              type: "cards",
              items: [
                { title: "Central de ajuda", text: "support.google.com/gemini — guias oficiais e novidades." },
                { title: "Notas de versão", text: "gemini.google/release-notes — o que mudou a cada mês." },
                { title: "Gemini Drops", text: "gemini.google/gemini-drops — dicas e recursos novos." },
              ],
            },
            {
              type: "callout",
              tone: "dica",
              title: "Volte sempre",
              text: "Seu progresso fica salvo neste navegador. Use o sumário para revisitar módulos e copiar prompts sempre que precisar.",
            },
          ],
        },
      ],
    },
  ],
};
