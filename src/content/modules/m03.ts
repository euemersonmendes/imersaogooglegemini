import type { Module } from "../types";

export const m03: Module = {
  n: 3,
  title: "Prompts que funcionam",
  kicker: "Módulo 3",
  summary: "A estrutura que transforma pedidos vagos em respostas úteis, técnicas avançadas e uma biblioteca pronta.",
  sections: [
    {
      id: "3.1",
      title: "Anatomia de um bom prompt",
      pages: [
        {
          title: "Os 4 ingredientes",
          blocks: [
            {
              type: "lead",
              text: "O próprio Google recomenda pensar em quatro ingredientes. Você não precisa de todos sempre, mas quanto mais deles, melhor a resposta.",
            },
            {
              type: "cards",
              items: [
                { tag: "P", title: "Persona", text: "Quem o Gemini deve ser. “Aja como consultor financeiro de pequenos negócios.”" },
                { tag: "T", title: "Tarefa", text: "O que fazer, com um verbo claro. “Crie”, “resuma”, “compare”, “reescreva”." },
                { tag: "C", title: "Contexto", text: "Para quem, por quê, com que dados. “Minha loja vende roupas infantis em São Luís…”" },
                { tag: "F", title: "Formato", text: "Como entregar. “Tabela com 3 colunas”, “até 120 palavras”, “tom informal”." },
              ],
            },
            {
              type: "callout",
              tone: "dica",
              text: "Escreva como se estivesse passando uma tarefa para um colega competente que acabou de chegar e não sabe nada do seu negócio.",
            },
          ],
        },
        {
          title: "Antes e depois",
          blocks: [
            {
              type: "compare",
              bad: { label: "Pedido vago", text: "Faça um post sobre minha padaria." },
              good: {
                label: "Pedido completo",
                text: "Aja como social media de negócios locais (P). Crie 3 opções de legenda para Instagram (T) divulgando o pão de queijo recheado que lançamos hoje na Padaria Sol, no bairro Renascença. Nosso público são famílias e quem trabalha por perto; o tom é acolhedor e bem-humorado (C). Cada legenda com até 60 palavras, 1 emoji e uma chamada para ação; no final, 5 hashtags locais (F).",
              },
            },
            {
              type: "p",
              text: "O segundo pedido é mais longo, mas economiza três ou quatro rodadas de “não era bem isso”. Prompts com 20 a 50 palavras costumam render bem mais do que frases curtas.",
            },
          ],
        },
      ],
    },
    {
      id: "3.2",
      title: "Técnicas avançadas",
      pages: [
        {
          title: "7 técnicas que mudam o jogo",
          blocks: [
            {
              type: "steps",
              items: [
                { title: "Converse, não ordene", text: "A primeira resposta é um rascunho. Peça ajustes: “mais curto”, “menos formal”, “troque o exemplo”." },
                { title: "Dê exemplos", text: "Cole um texto que você gosta e diga “siga este estilo”. Exemplos valem mais que adjetivos." },
                { title: "Peça que ele pergunte", text: "“Antes de responder, faça as perguntas que precisar.” Isso revela o contexto que faltava." },
                { title: "Quebre em etapas", text: "Para tarefas grandes: primeiro o roteiro, depois cada parte. Você revisa no caminho." },
                { title: "Defina limites", text: "Diga o que NÃO quer: jargões, listas longas, promessas exageradas, inventar números." },
                { title: "Peça para pensar alto", text: "“Explique seu raciocínio passo a passo” ajuda em cálculos e decisões — e deixa o erro visível." },
                { title: "Peça autocrítica", text: "“Avalie sua resposta como um cliente exigente e melhore-a.” Simples e muito eficaz." },
              ],
            },
          ],
        },
        {
          title: "Use seus arquivos como contexto",
          blocks: [
            {
              type: "p",
              text: "Com os apps conectados, você pode citar seus próprios arquivos e e-mails no prompt. Isso transforma respostas genéricas em respostas sobre a sua realidade.",
            },
            {
              type: "prompt",
              title: "Exemplo com Drive",
              text: "Usando a planilha “Vendas 2026” do meu Drive e o documento “Metas do semestre”, compare o realizado com a meta de cada mês, aponte os 3 maiores desvios e sugira uma ação para cada um. Entregue em tabela e termine com um parágrafo de resumo para eu mandar ao meu sócio.",
            },
            {
              type: "callout",
              tone: "insight",
              title: "Prompt bom é prompt salvo",
              text: "Quando um pedido funcionar muito bem, transforme-o em skill. Assim você nunca mais precisa reescrever.",
            },
          ],
        },
      ],
    },
    {
      id: "3.3",
      title: "Biblioteca de prompts",
      pages: [
        {
          title: "Prompts para o dia a dia",
          blocks: [
            {
              type: "prompt",
              title: "Responder um e-mail difícil",
              text: "Recebi o e-mail abaixo de um cliente insatisfeito. Escreva uma resposta empática, que reconheça o problema sem assumir culpa jurídica, proponha [solução] e mantenha a porta aberta. Tom profissional e caloroso, até 150 palavras.\n\n[cole o e-mail]",
            },
            {
              type: "prompt",
              title: "Transformar anotações em ata",
              text: "Transforme as anotações abaixo em uma ata de reunião com: participantes, decisões, pendências (responsável e prazo) e próximos passos. Se faltar alguma informação, marque como [A CONFIRMAR].\n\n[cole as anotações]",
            },
            {
              type: "prompt",
              title: "Explicar um assunto complexo",
              text: "Explique [assunto] para alguém que nunca ouviu falar disso, usando uma analogia do dia a dia. Depois, faça 3 perguntas para eu testar se entendi.",
            },
          ],
        },
        {
          title: "Prompts para decidir e planejar",
          blocks: [
            {
              type: "prompt",
              title: "Matriz de decisão",
              text: "Estou decidindo entre [opção A], [opção B] e [opção C]. Meus critérios são: custo, tempo de implantação, risco e impacto no cliente. Monte uma matriz de decisão com notas de 1 a 5, justifique cada nota e recomende uma opção. Aponte o que eu deveria investigar antes de decidir.",
            },
            {
              type: "prompt",
              title: "Advogado do diabo",
              text: "Minha ideia é: [descreva]. Aja como um investidor cético. Liste as 5 objeções mais fortes contra ela e, para cada uma, uma forma de testar se a objeção é verdadeira gastando pouco.",
            },
            {
              type: "prompt",
              title: "Plano de 90 dias",
              text: "Quero alcançar [objetivo] em 90 dias, com [recursos disponíveis]. Monte um plano dividido em 3 fases de 30 dias, com metas semanais, indicadores e os principais riscos. Formato: tabela por semana.",
            },
          ],
        },
      ],
    },
    {
      id: "3.4",
      title: "Revisão do módulo",
      pages: [
        {
          title: "Teste seus conhecimentos",
          blocks: [
            {
              type: "quiz",
              id: "q3",
              questions: [
                {
                  q: "Quais são os 4 ingredientes de um bom prompt?",
                  options: [
                    "Pergunta, Tema, Cor e Fonte",
                    "Persona, Tarefa, Contexto e Formato",
                    "Público, Texto, Código e Final",
                    "Plano, Tempo, Custo e Foco",
                  ],
                  answer: 1,
                  explain: "Persona, Tarefa, Contexto e Formato. Nem sempre todos são necessários, mas cada um melhora a resposta.",
                },
                {
                  q: "A primeira resposta não ficou boa. O que fazer?",
                  options: [
                    "Desistir, a IA não serve para isso",
                    "Apagar tudo e começar do zero",
                    "Pedir ajustes específicos na mesma conversa",
                    "Trocar de conta",
                  ],
                  answer: 2,
                  explain: "Iterar é parte do processo. Ajustes específicos (“mais curto”, “outro exemplo”) costumam resolver em 1 ou 2 rodadas.",
                },
                {
                  q: "Qual técnica revela o contexto que faltou no seu pedido?",
                  options: [
                    "Pedir que o Gemini faça perguntas antes de responder",
                    "Escrever tudo em maiúsculas",
                    "Usar só palavras-chave",
                    "Pedir a resposta em inglês",
                  ],
                  answer: 0,
                  explain: "Quando o Gemini pergunta, ele mostra o que precisa saber — e você descobre o que não tinha dito.",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
