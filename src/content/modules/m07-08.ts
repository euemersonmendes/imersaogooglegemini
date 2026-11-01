import type { Module } from "../types";

export const m07: Module = {
  n: 7,
  title: "Criadores e desenvolvedores",
  kicker: "Módulo 7",
  summary: "Google AI Studio, API Gemini, Antigravity para criar apps conversando e Flow para produções audiovisuais.",
  sections: [
    {
      id: "7.1",
      title: "Google AI Studio e API",
      pages: [
        {
          title: "O laboratório do Gemini",
          blocks: [
            {
              type: "p",
              text: "O Google AI Studio (aistudio.google.com) é onde você testa os modelos com mais controle: ajusta parâmetros, compara respostas, gera uma chave de API e transforma ideias em apps. Mais de 8,5 milhões de desenvolvedores criam com os modelos Gemini todo mês.",
            },
            {
              type: "cards",
              items: [
                { title: "Testar prompts", text: "Instruções de sistema, temperatura e saída estruturada (JSON)." },
                { title: "Criar apps", text: "Descreva um app e o AI Studio gera o código, pronto para publicar." },
                { title: "API Gemini", text: "Integre a IA ao seu sistema, site ou WhatsApp com poucas linhas." },
              ],
            },
            {
              type: "callout",
              tone: "dica",
              title: "Não programa?",
              text: "Você ainda pode usar o AI Studio para testar prompts com mais precisão antes de transformá-los em skills no app.",
            },
          ],
        },
      ],
    },
    {
      id: "7.2",
      title: "Antigravity e vibe coding",
      pages: [
        {
          title: "Programar conversando",
          blocks: [
            {
              type: "p",
              text: "Vibe coding é criar software descrevendo o que você quer em linguagem natural. O Google Antigravity é a plataforma de desenvolvimento com agentes: você aprova o plano, o agente escreve e testa o código e avisa quando estiver pronto. Agora ele também está dentro do app Gemini para Mac.",
            },
            {
              type: "steps",
              items: [
                { title: "Descreva o problema", text: "Para quem é, o que precisa fazer, como deve parecer." },
                { title: "Aprove o plano", text: "Leia o que o agente pretende fazer antes de liberar." },
                { title: "Teste de verdade", text: "Use o protótipo como um usuário e anote o que não funciona." },
                { title: "Itere em pequenos passos", text: "Um ajuste por vez é mais fácil de revisar." },
              ],
            },
            {
              type: "prompt",
              title: "Ideia de app",
              text: "Crie um app web de agendamento para um salão de beleza com 3 profissionais: o cliente escolhe serviço, profissional, dia e horário livre; o salão vê a agenda do dia. Comece só com a tela do cliente e dados de exemplo.",
            },
          ],
        },
      ],
    },
    {
      id: "7.3",
      title: "Flow",
      pages: [
        {
          title: "Um estúdio de cinema com IA",
          blocks: [
            {
              type: "p",
              text: "O Google Flow é o estúdio criativo para montar histórias e cenas cinematográficas: você cria personagens, cenários e planos, mantém a consistência entre cenas e monta a sequência. Os planos Google AI incluem créditos mensais do Flow (200 no Plus, 1.000 no Pro).",
            },
            {
              type: "list",
              items: [
                "Vídeos institucionais curtos e vinhetas.",
                "Storyboards animados para aprovar uma ideia com o cliente.",
                "Séries de conteúdo com o mesmo personagem.",
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const m08: Module = {
  n: 8,
  title: "Casos práticos por área",
  kicker: "Módulo 8",
  summary: "Roteiros prontos para marketing, vendas, atendimento, finanças, pessoas e educação.",
  sections: [
    {
      id: "8.1",
      title: "Marketing e conteúdo",
      pages: [
        {
          title: "Um mês de conteúdo em uma tarde",
          blocks: [
            {
              type: "steps",
              items: [
                { title: "Persona", text: "Peça ao Gemini para montar 2 personas a partir de avaliações reais dos seus clientes." },
                { title: "Calendário", text: "Gere um calendário de 30 dias com temas, formatos e datas comemorativas locais." },
                { title: "Textos", text: "Crie legendas com uma skill do tom da sua marca." },
                { title: "Imagens e vídeos", text: "Use Nano Banana e Omni para as peças visuais." },
              ],
            },
            {
              type: "prompt",
              title: "Calendário editorial",
              text: "Sou dona de uma loja de moda praia em São Luís. Crie um calendário de conteúdo para Instagram para dezembro com 12 posts: data, formato (carrossel, reels ou foto), tema, gancho dos 3 primeiros segundos e chamada para ação. Considere o verão, as festas de fim de ano e o turismo na cidade.",
            },
          ],
        },
      ],
    },
    {
      id: "8.2",
      title: "Vendas e atendimento",
      pages: [
        {
          title: "Vender mais e atender melhor",
          blocks: [
            {
              type: "prompt",
              title: "Roteiro de objeções",
              text: "Vendo [produto/serviço] por [preço] para [público]. Liste as 8 objeções mais comuns e, para cada uma, uma resposta curta, honesta e sem pressão, no tom de conversa de WhatsApp.",
            },
            {
              type: "prompt",
              title: "FAQ a partir de conversas",
              text: "Abaixo estão 30 perguntas que recebi de clientes no último mês. Agrupe por tema, escreva uma resposta padrão para cada grupo e aponte quais dúvidas indicam um problema no meu processo que vale corrigir.\n\n[cole as perguntas]",
            },
            {
              type: "callout",
              tone: "insight",
              text: "Junte as respostas num notebook com seus preços e políticas: ele vira a base de consulta de todo o time de atendimento.",
            },
          ],
        },
      ],
    },
    {
      id: "8.3",
      title: "Finanças e gestão",
      pages: [
        {
          title: "Números com clareza",
          blocks: [
            {
              type: "prompt",
              title: "Precificação",
              text: "Me ajude a precificar [produto]. Custos: [liste]. Despesas fixas mensais: R$ [valor]. Vendo em média [quantidade] por mês. Calcule o custo unitário, o ponto de equilíbrio e três preços possíveis (margem de 30%, 45% e 60%), explicando os riscos de cada um.",
            },
            {
              type: "prompt",
              title: "Fluxo de caixa explicado",
              text: "Analise esta planilha de fluxo de caixa dos últimos 6 meses. Explique em linguagem simples para onde o dinheiro está indo, quais meses foram críticos e sugira 3 ações para melhorar o caixa no próximo trimestre.",
            },
            {
              type: "callout",
              tone: "atencao",
              text: "Use o Gemini para entender e organizar números, não para substituir seu contador. Decisões fiscais e tributárias precisam de um profissional.",
            },
          ],
        },
      ],
    },
    {
      id: "8.4",
      title: "Pessoas e RH",
      pages: [
        {
          title: "Contratar, integrar e desenvolver",
          blocks: [
            {
              type: "cards",
              items: [
                { title: "Descrição de vaga", text: "Clara, inclusiva e com o que a pessoa vai fazer de verdade." },
                { title: "Roteiro de entrevista", text: "Perguntas comportamentais ligadas às competências da vaga." },
                { title: "Onboarding", text: "Plano dos primeiros 30 dias e um notebook com tudo que o novato precisa saber." },
                { title: "Feedback", text: "Preparar uma conversa difícil com foco em fatos e próximos passos." },
              ],
            },
            {
              type: "callout",
              tone: "atencao",
              text: "Nunca use a IA para tomar sozinha decisões sobre pessoas (contratar, demitir, promover). Ela pode reproduzir vieses. Use como apoio e mantenha a decisão humana.",
            },
          ],
        },
      ],
    },
    {
      id: "8.5",
      title: "Educação e estudos",
      pages: [
        {
          title: "Aprender mais rápido",
          blocks: [
            {
              type: "p",
              text: "O Gemini tem um modo de aprendizado guiado que explica passo a passo em vez de dar a resposta pronta, além de criar quizzes, flashcards e notebooks de estudo a partir do seu material.",
            },
            {
              type: "prompt",
              title: "Tutor particular",
              text: "Quero aprender [assunto] em 2 semanas, estudando 30 minutos por dia. Monte um plano diário. Em cada sessão, explique o conceito, me dê um exercício e só mostre a resposta depois que eu tentar.",
            },
            {
              type: "prompt",
              title: "Revisão para prova",
              text: "A partir deste PDF da apostila, crie 15 questões de múltipla escolha com nível crescente de dificuldade. Depois que eu responder, corrija e explique cada erro.",
            },
          ],
        },
      ],
    },
  ],
};
