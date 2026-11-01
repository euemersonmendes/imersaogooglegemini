import type { Module } from "../types";

export const m05: Module = {
  n: 5,
  title: "Gemini no trabalho",
  kicker: "Módulo 5",
  summary: "A IA dentro do Gmail, Documentos, Planilhas, Apresentações, Meet, Drive, notebooks e Chrome.",
  sections: [
    {
      id: "5.1",
      title: "Gmail",
      pages: [
        {
          title: "Caixa de entrada sob controle",
          blocks: [
            {
              type: "lead",
              text: "No Gmail, o Gemini aparece no painel lateral e no botão “Escrever com ajuda”. É onde muita gente ganha a primeira hora da semana.",
            },
            {
              type: "cards",
              items: [
                { title: "Resumir conversas", text: "Uma thread de 30 mensagens vira 5 linhas com decisões e pendências." },
                { title: "Escrever e reescrever", text: "Rascunhos a partir de tópicos, ajuste de tom e tamanho." },
                { title: "Buscar com linguagem natural", text: "“Qual foi o último orçamento que o fornecedor X mandou?”" },
                { title: "Respostas sugeridas", text: "Respostas no seu estilo, com contexto da conversa." },
              ],
            },
            {
              type: "prompt",
              title: "No painel do Gmail",
              text: "Liste os e-mails desta semana que pedem uma resposta minha e ainda não foram respondidos. Para cada um: remetente, assunto, o que a pessoa precisa e um prazo sugerido. Ordene por urgência.",
            },
          ],
        },
      ],
    },
    {
      id: "5.2",
      title: "Documentos e Apresentações",
      pages: [
        {
          title: "Do rascunho ao slide",
          blocks: [
            {
              type: "p",
              text: "No Documentos, o Gemini escreve, resume, reorganiza e ajusta o tom. Com o Docs Live, você fala tudo o que tem em mente e ele monta o documento. No Apresentações, cria slides e imagens a partir de um documento ou de um pedido.",
            },
            {
              type: "steps",
              items: [
                { title: "Comece pelo conteúdo", text: "No Docs: “Crie uma proposta comercial para [cliente] com base em @Briefing.docx.”" },
                { title: "Refine por partes", text: "Selecione um parágrafo e peça “mais objetivo” ou “inclua um exemplo”." },
                { title: "Leve para slides", text: "No Apresentações: “Crie 8 slides a partir de @Proposta, um tópico por slide.”" },
                { title: "Ajuste visual", text: "Peça imagens, ícones e um layout coerente com sua marca." },
              ],
            },
            {
              type: "callout",
              tone: "dica",
              text: "Use @ para citar arquivos do Drive dentro do pedido. O Gemini lê o arquivo e usa como base.",
            },
          ],
        },
      ],
    },
    {
      id: "5.3",
      title: "Planilhas",
      pages: [
        {
          title: "Analisar dados sem fórmulas decoradas",
          blocks: [
            {
              type: "p",
              text: "No Planilhas, o Gemini cria tabelas, escreve fórmulas, explica o que uma fórmula faz, gera gráficos e encontra padrões — tudo pedindo em português.",
            },
            {
              type: "prompt",
              title: "Análise de vendas",
              text: "Analise esta planilha de vendas. Quero: faturamento por mês, ticket médio, os 5 produtos que mais cresceram e os 5 que mais caíram, e um gráfico de linha do faturamento. Explique em 3 frases o que mais chamou atenção.",
            },
            {
              type: "prompt",
              title: "Fórmula explicada",
              text: "Crie uma fórmula para a coluna F que mostre “Atrasado” quando a data da coluna D for anterior a hoje e a coluna E estiver vazia; caso contrário, “Em dia”. Explique a fórmula como se eu fosse iniciante.",
            },
          ],
        },
      ],
    },
    {
      id: "5.4",
      title: "Meet, Drive e notebooks",
      pages: [
        {
          title: "Reuniões e arquivos",
          blocks: [
            {
              type: "cards",
              items: [
                { tag: "Meet", title: "Anotações automáticas", text: "“Faça anotações para mim”: resumo, decisões e próximos passos enviados após a reunião." },
                { tag: "Meet", title: "Chegou atrasado?", text: "Pergunte o que foi discutido até agora sem interromper ninguém." },
                { tag: "Drive", title: "Resumo de pastas", text: "“O que mudou nos contratos desta pasta no último mês?”" },
                { tag: "Notebooks", title: "Base de conhecimento", text: "Reúna fontes e conversas num notebook e retome o projeto quando quiser." },
              ],
            },
            {
              type: "p",
              text: "Os notebooks — que herdam a experiência do NotebookLM — respondem só com base nas fontes que você colocou e mostram de onde veio cada informação. Também criam resumos em áudio no formato de podcast, mapas mentais e materiais de estudo.",
            },
            {
              type: "callout",
              tone: "insight",
              text: "Ideia prática: crie um notebook com o manual da empresa, a tabela de preços e as perguntas frequentes. Ele vira um assistente de treinamento para quem entra no time.",
            },
          ],
        },
      ],
    },
    {
      id: "5.5",
      title: "Gemini no Chrome",
      pages: [
        {
          title: "Seu assistente de navegação",
          blocks: [
            {
              type: "p",
              text: "No Chrome, o Gemini abre num painel lateral e entende a página que você está vendo — e até várias abas ao mesmo tempo.",
            },
            {
              type: "list",
              items: [
                "Resumir um artigo longo ou um vídeo do YouTube.",
                "Comparar produtos abertos em abas diferentes, em tabela.",
                "Editar uma imagem da página com o Nano Banana.",
                "Auto browse (prévia): pedir que ele preencha formulários ou faça uma sequência de cliques por você, sob sua supervisão.",
              ],
            },
            {
              type: "callout",
              tone: "atencao",
              text: "O auto browse começou como prévia para assinantes Pro e Ultra nos EUA. Sempre confira antes de confirmar compras ou envios.",
            },
          ],
        },
      ],
    },
  ],
};

export const m06: Module = {
  n: 6,
  title: "Agentes e automação",
  kicker: "Módulo 6",
  summary: "Do assistente que responde ao agente que executa: Gemini Spark, ações programadas e como delegar com segurança.",
  sections: [
    {
      id: "6.1",
      title: "O que é um agente",
      pages: [
        {
          title: "Do responder ao fazer",
          blocks: [
            {
              type: "lead",
              text: "Um assistente responde perguntas. Um agente recebe um objetivo, planeja as etapas, usa ferramentas e entrega o resultado — pedindo sua aprovação nos momentos importantes.",
            },
            {
              type: "compare",
              bad: { label: "Assistente", text: "“Quais são bons restaurantes italianos perto do escritório?” → você recebe uma lista e faz o resto." },
              good: {
                label: "Agente",
                text: "“Reserve uma mesa para 6 pessoas na sexta às 20h num italiano bem avaliado perto do escritório e mande o convite na agenda do time.” → ele pesquisa, propõe, você aprova, ele executa.",
              },
            },
            {
              type: "callout",
              tone: "insight",
              text: "O Google chamou 2026 de “a era de agentes do Gemini”. A habilidade mais valiosa passa a ser descrever bem o objetivo e os limites da tarefa.",
            },
          ],
        },
      ],
    },
    {
      id: "6.2",
      title: "Gemini Spark",
      pages: [
        {
          title: "Seu agente pessoal 24/7",
          blocks: [
            {
              type: "p",
              text: "O Gemini Spark trabalha de forma autônoma, sob sua direção: organiza pastas, monta documentos a partir de arquivos locais e executa fluxos de várias etapas no Google Workspace. No Mac, pode trabalhar com seus arquivos diretamente.",
            },
            {
              type: "steps",
              items: [
                { title: "Objetivo", text: "O que precisa estar pronto no final." },
                { title: "Insumos", text: "Quais pastas, e-mails ou sites ele pode usar." },
                { title: "Limites", text: "O que ele NÃO pode fazer sem perguntar (enviar, pagar, apagar)." },
                { title: "Entrega", text: "Formato e onde salvar o resultado." },
              ],
            },
            {
              type: "prompt",
              title: "Briefing para um agente",
              text: "Objetivo: preparar o relatório mensal de atendimento de outubro. Use os e-mails com o marcador “Suporte” e a planilha “Chamados 2026”. Calcule volume, tempo médio de resposta e os 5 motivos mais comuns. Crie um documento no Drive na pasta “Relatórios”. Não envie nada a ninguém; me avise quando o rascunho estiver pronto.",
            },
            {
              type: "callout",
              tone: "atencao",
              text: "Em novembro de 2026, o Spark está disponível para assinantes Ultra maiores de 18 anos, em inglês e em países selecionados.",
            },
          ],
        },
      ],
    },
    {
      id: "6.3",
      title: "Automatize a rotina",
      pages: [
        {
          title: "Ações programadas",
          blocks: [
            {
              type: "p",
              text: "Você pode pedir que o Gemini faça algo em horário marcado ou de forma recorrente — sem precisar lembrar de abrir o app.",
            },
            {
              type: "prompt",
              title: "Toda segunda às 8h",
              text: "Toda segunda-feira às 8h, me envie um resumo com: reuniões da semana, e-mails importantes não respondidos e 3 notícias relevantes sobre [seu setor] no Brasil.",
            },
            {
              type: "prompt",
              title: "Lembrete inteligente",
              text: "Todo dia 25, revise a planilha “Contas a pagar” e me avise quais vencimentos caem nos próximos 10 dias, com valor total.",
            },
            {
              type: "exercise",
              title: "Desenhe sua primeira automação",
              text: "Pense numa tarefa que você repete toda semana.",
              tasks: [
                "Escreva em uma frase o resultado que você quer receber.",
                "Liste de onde vêm as informações (e-mail, planilha, web).",
                "Defina dia e horário.",
                "Peça ao Gemini para programar e teste na próxima semana.",
              ],
            },
          ],
        },
      ],
    },
  ],
};
