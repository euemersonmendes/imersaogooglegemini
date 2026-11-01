import type { Module } from "../types";

export const m00: Module = {
  n: 0,
  title: "Boas-vindas",
  kicker: "Antes de começar",
  summary: "Como este book funciona, o que você vai aprender e como tirar o máximo da imersão.",
  sections: [
    {
      id: "0.1",
      title: "Como usar este book",
      pages: [
        {
          title: "Bem-vindo à Imersão Google Gemini",
          blocks: [
            {
              type: "lead",
              text: "Este não é um livro para ler de uma vez. É um caderno de trabalho: cada página tem uma ideia, um exemplo e, quase sempre, algo para você testar no Gemini na mesma hora.",
            },
            {
              type: "p",
              text: "A inteligência artificial deixou de ser assunto de especialista. Em 2026, o app Gemini passou de 900 milhões de pessoas usando por mês. A diferença entre quem só “brinca” com a ferramenta e quem ganha horas por semana está em três coisas: saber o que ela faz, saber pedir e criar o hábito.",
            },
            {
              type: "cards",
              items: [
                { tag: "Entender", title: "O que é e o que faz", text: "Modelos, planos, recursos e onde o Gemini aparece no seu dia." },
                { tag: "Pedir", title: "Prompts que funcionam", text: "Uma estrutura simples para sair do genérico e chegar ao útil." },
                { tag: "Aplicar", title: "Casos reais", text: "Gmail, Docs, Planilhas, marketing, vendas, finanças e mais." },
              ],
            },
            {
              type: "callout",
              tone: "dica",
              title: "Deixe o Gemini aberto ao lado",
              text: "Abra gemini.google.com em outra aba (ou o app no celular). Sempre que aparecer um bloco de prompt, clique em “Copiar” e cole lá.",
            },
          ],
        },
        {
          title: "Mapa da imersão",
          blocks: [
            {
              type: "p",
              text: "A imersão tem 11 módulos. Você pode seguir em ordem ou pular para o que precisa agora — o seu progresso fica salvo neste navegador.",
            },
            {
              type: "table",
              head: ["Módulo", "Tema", "Você sai sabendo"],
              rows: [
                ["1", "Fundamentos", "O que é o Gemini, modelos e planos"],
                ["2", "Primeiros passos", "Usar o app, anexos, memórias e privacidade"],
                ["3", "Prompts", "Escrever pedidos claros e reaproveitáveis"],
                ["4", "Superpoderes", "Deep Research, Canvas, Live, imagens, vídeos e skills"],
                ["5", "Gemini no trabalho", "Gmail, Docs, Planilhas, Meet, Drive e Chrome"],
                ["6", "Agentes", "Delegar tarefas inteiras com segurança"],
                ["7", "Criadores e devs", "AI Studio, API, Antigravity e Flow"],
                ["8", "Casos por área", "Roteiros prontos para cada setor do negócio"],
                ["9", "Ética e segurança", "Verificar, proteger dados e usar com responsabilidade"],
                ["10", "Plano de ação", "Seu plano de 30 dias e glossário"],
              ],
            },
            {
              type: "callout",
              tone: "atencao",
              title: "Sobre atualizações",
              text: "O Gemini muda todo mês. Este conteúdo foi revisado em novembro de 2026. Nomes de recursos, limites e disponibilidade por país podem mudar — e alguns recursos chegam primeiro em inglês ou nos EUA.",
            },
          ],
        },
      ],
    },
  ],
};

export const m01: Module = {
  n: 1,
  title: "Fundamentos do Gemini",
  kicker: "Módulo 1",
  summary: "O que é IA generativa, o que é o Gemini, a família de modelos e qual plano faz sentido para você.",
  sections: [
    {
      id: "1.1",
      title: "O que é o Gemini",
      pages: [
        {
          title: "IA generativa em um minuto",
          blocks: [
            {
              type: "lead",
              text: "Uma IA generativa é um sistema treinado com enormes quantidades de texto, imagens, áudio e código que aprendeu padrões a ponto de criar conteúdo novo a partir de um pedido.",
            },
            {
              type: "p",
              text: "Você escreve (ou fala, ou mostra uma foto) e ela responde: um texto, uma tabela, um resumo, uma imagem, um vídeo, um trecho de código. O pedido se chama prompt. A qualidade da resposta depende muito da qualidade do pedido — é por isso que o Módulo 3 inteiro é sobre isso.",
            },
            {
              type: "cards",
              items: [
                { title: "Multimodal", text: "Entende e gera texto, imagem, áudio, vídeo e código na mesma conversa." },
                { title: "Contexto longo", text: "Lê documentos enormes de uma vez — até 1.500 páginas nos planos pagos." },
                { title: "Conectado", text: "Busca na web e, se você permitir, consulta Gmail, Drive, Agenda e outros apps." },
              ],
            },
            {
              type: "callout",
              tone: "insight",
              text: "Pense no Gemini como um estagiário brilhante, rápido e incansável — que às vezes inventa coisas com muita confiança. Você continua sendo o responsável pela entrega.",
            },
          ],
        },
        {
          title: "Assistente, modelo e ecossistema",
          blocks: [
            {
              type: "p",
              text: "A palavra “Gemini” é usada para três coisas diferentes. Saber a diferença evita muita confusão:",
            },
            {
              type: "steps",
              items: [
                { title: "O app Gemini", text: "O assistente que você usa em gemini.google.com, no celular (Android e iOS) e nos apps para Mac e Windows." },
                { title: "Os modelos Gemini", text: "O “cérebro” por trás: Flash-Lite, Flash, Pro, Argon e o modo Deep Think. Cada um equilibra velocidade e profundidade." },
                { title: "O Gemini dentro do Google", text: "A mesma IA embutida no Gmail, Documentos, Planilhas, Meet, Chrome, Android, Maps, YouTube e na Busca (Modo IA)." },
              ],
            },
            {
              type: "p",
              text: "Ou seja: quando você pede para o Gmail resumir uma conversa, quando o Chrome compara produtos em várias abas e quando você conversa por voz no carro, é o mesmo Gemini trabalhando em lugares diferentes.",
            },
          ],
        },
      ],
    },
    {
      id: "1.2",
      title: "A família de modelos",
      pages: [
        {
          title: "Qual modelo usar?",
          blocks: [
            {
              type: "lead",
              text: "No app, você escolhe o modelo no menu ao lado da caixa de texto. A regra prática: rápido para o dia a dia, Pro para o que exige raciocínio.",
            },
            {
              type: "table",
              head: ["Modelo", "Perfil", "Use para"],
              rows: [
                ["Flash-Lite", "O mais leve, disponível no plano gratuito", "Perguntas rápidas, reescrever textos curtos"],
                ["Flash (3.5 / 3.6)", "Rápido com inteligência de ponta", "A maioria das tarefas: e-mails, resumos, análises, protótipos no Canvas"],
                ["Pro (3.1 Pro)", "Raciocínio avançado", "Problemas complexos, estratégia, documentos longos, dados"],
                ["4 Argon", "Modelo de fronteira (Pro e Ultra)", "Projetos de ponta a ponta: relatórios, apresentações, modelos 3D interativos"],
                ["Deep Think", "Modo de raciocínio profundo (Ultra)", "Ciência, engenharia, matemática — a resposta leva alguns minutos"],
              ],
            },
            {
              type: "callout",
              tone: "dica",
              title: "Comece pelo Flash",
              text: "Se a resposta vier rasa ou com erro de lógica, repita o mesmo pedido no Pro. Você vai aprender rapidamente quando vale a pena subir de modelo.",
            },
          ],
        },
      ],
    },
    {
      id: "1.3",
      title: "Planos e onde usar",
      pages: [
        {
          title: "Planos Google AI",
          blocks: [
            {
              type: "p",
              text: "Dá para fazer muita coisa de graça. Os planos pagos aumentam os limites de uso, liberam modelos mais fortes e trazem armazenamento e benefícios no Google. Valores de referência no Brasil em novembro de 2026:",
            },
            {
              type: "table",
              head: ["Plano", "Preço/mês", "Destaques"],
              rows: [
                ["Gratuito", "R$ 0", "Flash-Lite, imagens, Deep Research, Live, Canvas, 15 GB"],
                ["AI Plus", "R$ 24,99", "Modelo Flash, 2x os limites do gratuito, geração de vídeo, 200 créditos no Flow"],
                ["AI Pro", "R$ 96,99", "Modelo Pro e 4 Argon, 1 milhão de tokens de contexto, Gemini no Gmail e Docs, 5 TB"],
                ["AI Ultra", "a partir de R$ 779,90", "Limites até 20x maiores, Deep Think, Gemini Spark, Veo 3.1, 20 TB, YouTube Premium"],
              ],
            },
            {
              type: "callout",
              tone: "novidade",
              title: "Estudante?",
              text: "Universitários elegíveis podem ganhar um ano de plano sem custo (oferta válida até 31/12/2026). Confira em gemini.google/students.",
            },
            {
              type: "callout",
              tone: "atencao",
              text: "Empresas usam o Gemini pelo Google Workspace ou pelo Gemini Enterprise, com regras próprias de privacidade e administração. Confirme com o responsável de TI antes de colocar dados da empresa em uma conta pessoal.",
            },
          ],
        },
        {
          title: "Onde o Gemini está",
          blocks: [
            {
              type: "cards",
              items: [
                { tag: "Web", title: "gemini.google.com", text: "A experiência completa, com Canvas, Deep Research e apps conectados." },
                { tag: "Celular", title: "Android e iOS", text: "Gemini Live por voz e câmera, além do botão do assistente no Android." },
                { tag: "Mac", title: "Option + Espaço", text: "App nativo que lê sua tela, dita texto (tecla Fn) e traz o Antigravity." },
                { tag: "Windows", title: "Alt + Espaço", text: "App para Windows 10 ou superior, chamado de qualquer janela." },
                { tag: "Chrome", title: "Painel lateral", text: "Resume páginas, compara abas e navega por você (auto browse)." },
                { tag: "Workspace", title: "Gmail, Docs, Sheets…", text: "Ajuda para escrever, organizar e analisar dentro dos apps." },
              ],
            },
            {
              type: "exercise",
              title: "Prática rápida",
              text: "Escolha onde você vai usar o Gemini nesta imersão.",
              tasks: [
                "Acesse gemini.google.com com sua Conta do Google.",
                "Instale o app no celular e faça login com a mesma conta.",
                "Abra o menu de modelos e veja quais estão disponíveis no seu plano.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "1.4",
      title: "Revisão do módulo",
      pages: [
        {
          title: "Teste seus conhecimentos",
          blocks: [
            {
              type: "quiz",
              id: "q1",
              questions: [
                {
                  q: "Você precisa resumir rapidamente cinco e-mails. Qual modelo é a melhor primeira escolha?",
                  options: ["Deep Think", "Flash", "4 Argon", "Nenhum, o Gemini não lê e-mails"],
                  answer: 1,
                  explain: "O Flash é rápido e muito capaz para tarefas do dia a dia. Os modelos mais pesados ficam para problemas complexos.",
                },
                {
                  q: "O que significa dizer que o Gemini é multimodal?",
                  options: [
                    "Que funciona em vários idiomas",
                    "Que tem vários planos de assinatura",
                    "Que entende e gera texto, imagem, áudio, vídeo e código",
                    "Que roda em vários aparelhos",
                  ],
                  answer: 2,
                  explain: "Multimodal é a capacidade de trabalhar com diferentes tipos de mídia na mesma conversa.",
                },
                {
                  q: "Qual destas afirmações é verdadeira?",
                  options: [
                    "O Gemini nunca erra quando busca na web",
                    "Você continua responsável por revisar o que o Gemini entrega",
                    "Só é possível usar o Gemini pagando",
                    "O Gemini só existe no celular",
                  ],
                  answer: 1,
                  explain: "IAs podem errar com confiança (as chamadas alucinações). Revisar é sempre parte do trabalho.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const m02: Module = {
  n: 2,
  title: "Primeiros passos",
  kicker: "Módulo 2",
  summary: "Sua primeira conversa, anexos, voz, personalização, memórias e como cuidar da sua privacidade.",
  sections: [
    {
      id: "2.1",
      title: "Sua primeira conversa",
      pages: [
        {
          title: "Conhecendo a tela",
          blocks: [
            {
              type: "steps",
              items: [
                { title: "Caixa de pedido", text: "Onde você escreve. O botão “+” anexa arquivos, fotos, pastas do Drive e código." },
                { title: "Ferramentas", text: "Atalhos para Deep Research, Canvas, criar imagem, criar vídeo e outras funções." },
                { title: "Seletor de modelo", text: "Escolha entre Flash, Pro, Argon e Deep Think, conforme seu plano." },
                { title: "Menu lateral", text: "Histórico de conversas, notebooks, skills e o painel “Personalizar”." },
                { title: "Microfone e Live", text: "Fale em vez de digitar ou abra uma conversa por voz em tempo real." },
              ],
            },
            {
              type: "prompt",
              title: "Seu primeiro pedido",
              text: "Sou [sua profissão] e quero usar IA para ganhar tempo no trabalho. Faça 5 perguntas sobre a minha rotina e, com base nas respostas, sugira as 3 tarefas que eu deveria começar a fazer com o Gemini nesta semana.",
              note: "Repare: em vez de pedir uma lista genérica, você pede que o Gemini entreviste você primeiro.",
            },
          ],
        },
        {
          title: "Anexos, fotos e voz",
          blocks: [
            {
              type: "p",
              text: "O Gemini fica muito mais útil quando trabalha em cima do seu material. Você pode anexar PDFs, planilhas, apresentações, imagens, áudios, vídeos e até repositórios de código.",
            },
            {
              type: "cards",
              items: [
                { title: "PDF de 80 páginas", text: "“Liste as obrigações do contratante e os prazos, em tabela.”" },
                { title: "Foto de um quadro", text: "“Transcreva este quadro branco e organize em tópicos de ação.”" },
                { title: "Planilha de vendas", text: "“Quais produtos caíram mais no último trimestre? Mostre um gráfico.”" },
                { title: "Áudio de reunião", text: "“Resuma as decisões e liste quem ficou responsável pelo quê.”" },
              ],
            },
            {
              type: "callout",
              tone: "dica",
              title: "Chat temporário",
              text: "Para assuntos pontuais que você não quer no histórico nem usados para personalizar respostas, abra um chat temporário. Ele não aparece nas suas conversas recentes.",
            },
          ],
        },
      ],
    },
    {
      id: "2.2",
      title: "Personalizar e proteger",
      pages: [
        {
          title: "Personalizar e memórias",
          blocks: [
            {
              type: "p",
              text: "No menu lateral, em “Personalizar”, você ajusta como o Gemini responde e quais apps ele pode usar — tudo num lugar só.",
            },
            {
              type: "list",
              items: [
                "Instruções: conte quem você é, seu tom preferido e regras de formatação. Ex.: “Responda em português do Brasil, direto ao ponto, com tópicos curtos.”",
                "Memórias: o Gemini pode lembrar de conversas passadas para dar continuidade. Você vê, edita e apaga o que ele guardou.",
                "Apps conectados: Gmail, Drive, Agenda, Fotos, YouTube e mais de 40 serviços. Você decide quais ligar.",
                "Skills: instruções reutilizáveis para tarefas repetidas (veja o Módulo 4).",
              ],
            },
            {
              type: "callout",
              tone: "novidade",
              title: "Vindo de outra IA?",
              text: "Em Configurações há uma opção de importação: você leva suas preferências e até o histórico de conversas (em arquivo ZIP) de outros assistentes para o Gemini.",
            },
            {
              type: "prompt",
              title: "Gere suas instruções personalizadas",
              text: "Me ajude a escrever instruções personalizadas para o Gemini. Faça perguntas, uma por vez, sobre: minha profissão, meu público, o tom que prefiro, formatos que uso muito e coisas que eu NÃO quero nas respostas. No final, entregue um texto de até 1.000 caracteres pronto para colar.",
            },
          ],
        },
        {
          title: "Privacidade na prática",
          blocks: [
            {
              type: "p",
              text: "Seus dados, suas regras. Antes de usar o Gemini com informações sensíveis, passe dois minutos nestas configurações:",
            },
            {
              type: "steps",
              items: [
                { title: "Atividade nos apps Gemini", text: "Defina se as conversas ficam salvas e por quanto tempo (exclusão automática em 3, 18 ou 36 meses)." },
                { title: "Apps conectados", text: "A conexão com Gmail, Fotos e outros vem desligada. Ligue só o que fizer sentido e desligue quando quiser." },
                { title: "Conta de trabalho", text: "Em contas do Workspace empresarial, as conversas seguem as políticas da empresa e não são usadas para treinar modelos." },
              ],
            },
            {
              type: "callout",
              tone: "atencao",
              text: "Regra de ouro: não cole no Gemini aquilo que você não colaria num e-mail para alguém de fora da empresa — senhas, dados de clientes, informações de saúde ou documentos confidenciais. O Módulo 9 aprofunda o tema e a LGPD.",
            },
          ],
        },
      ],
    },
    {
      id: "2.3",
      title: "Mãos à obra",
      pages: [
        {
          title: "Checklist de configuração",
          blocks: [
            {
              type: "checklist",
              id: "setup",
              title: "Deixe seu Gemini pronto",
              items: [
                "Fiz login com a conta que vou usar no dia a dia",
                "Escrevi minhas instruções personalizadas",
                "Revisei a atividade e a exclusão automática",
                "Decidi quais apps conectar",
                "Testei um anexo (PDF, foto ou planilha)",
                "Fiz um pedido por voz",
              ],
            },
          ],
        },
      ],
    },
  ],
};
