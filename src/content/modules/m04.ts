import type { Module } from "../types";

export const m04: Module = {
  n: 4,
  title: "Superpoderes do app",
  kicker: "Módulo 4",
  summary: "Deep Research, Canvas, Gemini Live, imagens com Nano Banana, vídeos com Omni e Veo, skills e apps conectados.",
  sections: [
    {
      id: "4.1",
      title: "Deep Research",
      pages: [
        {
          title: "Um analista de pesquisa em minutos",
          blocks: [
            {
              type: "lead",
              text: "O Deep Research monta um plano de pesquisa, lê centenas de fontes na web (e nos seus arquivos, se você quiser) e entrega um relatório completo com as fontes citadas.",
            },
            {
              type: "steps",
              items: [
                { title: "Ative", text: "Na caixa de pedido, abra Ferramentas e escolha Deep Research." },
                { title: "Descreva o objetivo", text: "Seja específico sobre a pergunta, o recorte (região, período) e para que vai usar." },
                { title: "Revise o plano", text: "O Gemini mostra o plano antes de começar. Edite o que quiser." },
                { title: "Aproveite o relatório", text: "Exporte para o Docs, transforme em página web, quiz ou resumo em áudio." },
              ],
            },
            {
              type: "prompt",
              title: "Pesquisa de mercado",
              text: "Pesquise o mercado de cafeterias especiais em capitais do Nordeste brasileiro. Quero: tamanho e crescimento estimado, perfil do consumidor, faixa de preço praticada, principais redes e independentes de destaque, tendências para 2027 e riscos. Priorize fontes brasileiras dos últimos 2 anos e destaque onde os dados são estimativas.",
            },
          ],
        },
      ],
    },
    {
      id: "4.2",
      title: "Canvas",
      pages: [
        {
          title: "Um espaço para criar junto",
          blocks: [
            {
              type: "p",
              text: "O Canvas abre um painel ao lado da conversa onde você e o Gemini editam juntos um documento, um código ou um aplicativo simples. Você seleciona um trecho e pede ajustes só naquela parte.",
            },
            {
              type: "cards",
              items: [
                { title: "Documentos", text: "Propostas, roteiros e artigos. Ajuste tom e tamanho com um clique e exporte para o Docs." },
                { title: "Apps e páginas", text: "Descreva uma calculadora, quiz ou landing page e veja funcionando na hora." },
                { title: "Infográficos e quizzes", text: "Transforme um relatório do Deep Research em material visual ou de estudo." },
              ],
            },
            {
              type: "prompt",
              title: "Protótipo em minutos",
              text: "No Canvas, crie uma calculadora de preço de venda para confeitaria: o usuário informa custo dos ingredientes, embalagem, horas de trabalho, valor da hora e margem desejada, e vê o preço sugerido por unidade. Visual limpo, em português, funcionando no celular.",
            },
          ],
        },
      ],
    },
    {
      id: "4.3",
      title: "Gemini Live",
      pages: [
        {
          title: "Converse, mostre e resolva",
          blocks: [
            {
              type: "p",
              text: "O Gemini Live é a conversa por voz em tempo real — e agora integrada ao chat, para alternar entre falar e digitar. Você pode interromper, mudar de assunto e compartilhar a câmera ou a tela.",
            },
            {
              type: "list",
              items: [
                "Ensaiar uma apresentação ou entrevista e receber feedback.",
                "Apontar a câmera para uma peça, planta ou etiqueta e perguntar o que é.",
                "Pensar em voz alta durante uma caminhada e pedir um resumo no final.",
                "Praticar inglês ou espanhol com correções gentis.",
              ],
            },
            {
              type: "callout",
              tone: "dica",
              title: "Teste agora",
              text: "Abra o app no celular, toque no ícone do Live e diga: “Vou te explicar meu negócio em dois minutos. Depois me faça três perguntas difíceis que um cliente faria.”",
            },
          ],
        },
      ],
    },
    {
      id: "4.4",
      title: "Imagens com Nano Banana",
      pages: [
        {
          title: "Criar e editar imagens conversando",
          blocks: [
            {
              type: "lead",
              text: "Nano Banana é o apelido dos modelos de imagem do Gemini. Mais de 50 bilhões de imagens já foram geradas com eles. A versão Pro é especialmente boa com textos dentro da imagem e infográficos.",
            },
            {
              type: "cards",
              items: [
                { title: "Gerar do zero", text: "Descreva cena, estilo, luz, enquadramento e proporção." },
                { title: "Editar uma foto", text: "“Troque o fundo por uma cozinha clara”, “remova a pessoa ao fundo”." },
                { title: "Manter consistência", text: "O mesmo personagem ou produto em várias cenas diferentes." },
                { title: "Infográficos", text: "Diagramas, cardápios e cartazes com texto legível." },
              ],
            },
            {
              type: "prompt",
              title: "Foto de produto",
              text: "Crie uma foto de produto de um pote de geleia artesanal de cajá com rótulo de papel kraft escrito “Sabor do Maranhão”, sobre uma mesa de madeira clara, luz natural de manhã entrando pela janela, folhas verdes desfocadas ao fundo, estilo editorial, formato quadrado 1:1.",
            },
            {
              type: "callout",
              tone: "atencao",
              text: "Imagens geradas pelo Google recebem marca d’água invisível (SynthID). Não use a IA para criar imagens enganosas de pessoas reais e respeite direitos de marca e de imagem.",
            },
          ],
        },
      ],
    },
    {
      id: "4.5",
      title: "Vídeos com Omni e Veo",
      pages: [
        {
          title: "Do texto ao vídeo com som",
          blocks: [
            {
              type: "p",
              text: "O Gemini Omni é o parceiro criativo para vídeo: você mistura texto, fotos e vídeos e ajusta tudo conversando — “é como o Nano Banana, só que para vídeo”. Dá até para criar um avatar com a sua aparência e voz. O Veo 3.1 gera clipes cinematográficos com áudio.",
            },
            {
              type: "steps",
              items: [
                { title: "Defina a cena", text: "Quem, onde, o que acontece, em quantos segundos." },
                { title: "Dirija a câmera", text: "“Câmera lenta se aproximando”, “plano aberto”, “vista de drone”." },
                { title: "Descreva o som", text: "Trilha, ruídos ambientes e falas entre aspas." },
                { title: "Refine", text: "Peça mudanças pontuais: luz, ritmo, legenda, duração." },
              ],
            },
            {
              type: "prompt",
              title: "Vídeo curto para redes",
              text: "Vídeo vertical de 8 segundos: mãos de uma artesã finalizando um cesto de palha de buriti numa varanda ensolarada. Câmera se aproxima devagar até o detalhe da trama. Som de passarinhos e um violão suave. No final, texto na tela: “Feito à mão, feito aqui.”",
            },
            {
              type: "callout",
              tone: "atencao",
              text: "A geração de vídeo está disponível nos planos pagos e para maiores de 18 anos, com limites diários. Disponibilidade pode variar por região.",
            },
          ],
        },
      ],
    },
    {
      id: "4.6",
      title: "Skills",
      pages: [
        {
          title: "Seus atalhos de prompt",
          blocks: [
            {
              type: "lead",
              text: "Skills são conjuntos de instruções reutilizáveis que ensinam o Gemini a fazer uma tarefa do seu jeito. Ele roda a skill automaticamente quando o seu pedido combina com ela.",
            },
            {
              type: "list",
              items: [
                "Crie uma skill a partir de uma conversa que deu certo: o Gemini monta as instruções para você.",
                "Empilhe skills: “meu estilo de escrita” + “manual da marca” = conteúdo pronto na sua voz.",
                "As skills estão substituindo os Gems. Quando os Gems forem desativados, eles serão migrados automaticamente para skills.",
              ],
            },
            {
              type: "prompt",
              title: "Crie sua primeira skill",
              text: "Quero criar uma skill chamada “Resposta a orçamento”. Sempre que eu colar um pedido de orçamento de cliente, ela deve: agradecer, confirmar o que foi pedido em tópicos, listar as dúvidas que preciso esclarecer, propor dois prazos de entrega e assinar como [seu nome], da [sua empresa]. Tom cordial e objetivo. Escreva as instruções da skill.",
            },
          ],
        },
      ],
    },
    {
      id: "4.7",
      title: "Apps conectados",
      pages: [
        {
          title: "Personal Intelligence e Daily Brief",
          blocks: [
            {
              type: "p",
              text: "Ao conectar Gmail, Agenda, Drive, Fotos, YouTube e outros serviços, o Gemini passa a responder sobre a sua vida e o seu trabalho — não sobre o mundo em geral. O Google chama isso de Personal Intelligence.",
            },
            {
              type: "cards",
              items: [
                { tag: "Google", title: "Gmail, Agenda, Drive", text: "“Quais reuniões tenho amanhã e o que preciso preparar para cada uma?”" },
                { tag: "Parceiros", title: "Canva, Adobe e mais", text: "Mais de 40 apps: criar um flyer, editar uma foto, reservar uma mesa." },
                { tag: "Rotina", title: "Daily Brief", text: "Um resumo diário com prioridades e próximos passos a partir dos seus apps." },
              ],
            },
            {
              type: "callout",
              tone: "atencao",
              text: "Recursos como Daily Brief e vários apps parceiros chegaram primeiro em inglês e nos EUA. A conexão é sempre opcional e pode ser desligada a qualquer momento.",
            },
          ],
        },
      ],
    },
    {
      id: "4.8",
      title: "Revisão do módulo",
      pages: [
        {
          title: "Teste seus conhecimentos",
          blocks: [
            {
              type: "quiz",
              id: "q4",
              questions: [
                {
                  q: "Você precisa de um relatório com fontes sobre um mercado novo. Qual recurso usar?",
                  options: ["Canvas", "Deep Research", "Gemini Live", "Nano Banana"],
                  answer: 1,
                  explain: "O Deep Research planeja, pesquisa centenas de fontes e entrega um relatório com citações.",
                },
                {
                  q: "Qual recurso permite editar um documento ou criar um app simples junto com o Gemini?",
                  options: ["Canvas", "Daily Brief", "Deep Think", "Chat temporário"],
                  answer: 0,
                  explain: "O Canvas é o espaço de cocriação para documentos, código e protótipos.",
                },
                {
                  q: "O que vai acontecer com os seus Gems?",
                  options: [
                    "Serão apagados sem aviso",
                    "Continuarão para sempre como estão",
                    "Serão migrados automaticamente para skills",
                    "Viram vídeos",
                  ],
                  answer: 2,
                  explain: "O Google anunciou que as skills substituirão os Gems, com migração automática.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
