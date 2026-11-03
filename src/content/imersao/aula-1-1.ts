import type { Aula } from "./tipos";

/** Aula de referência: serve de modelo de tom, tamanho e estrutura para as demais. */
export const aula11: Aula = {
  n: "1.1",
  titulo: "Interface do Gemini",
  curto: "Interface",
  ferramenta: "Gemini · Chat",
  objetivo: "Reconhecer as partes da tela do Gemini e saber por onde começar a cuidar das tarefas do seu negócio.",
  voceSaiCom:
    "Um mapa da tela para pedir ajuda com vendas, divulgação, atendimento e outras tarefas do seu negócio.",
  saibaMais:
    "O modelo muda a forma de raciocinar: Flash responde rápido, Pro pensa mais antes de responder. As ferramentas mudam o tipo de trabalho, como pesquisar a fundo ou criar uma imagem. Em todos os casos, você continua responsável por conferir o que recebeu.",
  fontes: [
    { nome: "Central de Ajuda do Gemini", url: "https://support.google.com/gemini" },
    { nome: "Notas de versão do Gemini", url: "https://gemini.google/release-notes/" },
  ],
  materiais: [
    {
      nome: "Cotação comparativa de fornecedores",
      url: "/materiais/cotacao-fornecedores-exemplo.csv",
      formato: "Planilha CSV",
      descricao: "Planilha com 2 fornecedores (frete, ST e descontos) + espaço limpo para digitar a sua cotação e anexar no botão +.",
    },
  ],
  passos: [
    {
      tipo: "tela",
      tela: "inicio",
      rotulo: "Tela inicial",
      titulo: "Conheça a tela inicial",
      tituloEnfase: "a tela inicial",
      texto: "Clique nos números para ver o que é cada parte. Você vai usar estas quatro partes para pedir ajuda com tarefas do seu negócio, como divulgar produtos ou organizar o estoque.",
    },
    {
      tipo: "tela",
      tela: "modelos",
      rotulo: "Modelo",
      titulo: "Escolha como o Gemini pensa",
      tituloEnfase: "como o Gemini pensa",
      texto: "Clique no seletor de modelo, no alto da tela. Para começar, deixe o Flash. Os nomes podem mudar conforme o plano.",
    },
    {
      tipo: "tela",
      tela: "ferramentas",
      rotulo: "Ferramentas",
      titulo: "Veja o que mais ele faz",
      tituloEnfase: "o que mais ele faz",
      texto: "Clique em Ferramentas, na caixa de mensagem. Cada opção muda o tipo de trabalho que o Gemini faz.",
    },
    {
      tipo: "tela",
      tela: "mais",
      rotulo: "Botão +",
      titulo: "Veja como anexar arquivos",
      tituloEnfase: "anexar arquivos",
      texto: "Clique no + à esquerda do campo de mensagem. Veja as opções que aparecem para enviar fotos, PDFs ou documentos do Drive.",
    },
    {
      tipo: "catalogo",
      rotulo: "Multimodal",
      titulo: "Use foto, PDF e voz no balcão",
      tituloEnfase: "e voz no balcão",
      texto: "Nem tudo no pequeno negócio está digitado em planilha. Clique em cada entrada para ver como transformar papel, foto e fala em controle prático.",
      itens: [
        {
          sigla: "NF",
          nome: "Foto ou PDF de nota e orçamento",
          sub: "Extrair itens, impostos, frete e custo unitário real.",
          rotulo: "Visão · Compras",
          pergunta: "Recebeu cotação em PDF ou foto de nota fiscal?",
          cuidado: "Cubra dados pessoais ou bancários sensíveis e confira a soma final na nota original.",
          itens: [
            "Comparar até 3 orçamentos de fornecedores em segundos",
            "Ratear frete e impostos para achar o custo unitário real",
            "Destacar itens que subiram acima da reposição anterior",
          ],
        },
        {
          sigla: "VOZ",
          nome: "Áudio e ditado no fim do turno",
          sub: "Registrar sobras, faltas e ocorrências sem parar para digitar.",
          rotulo: "Áudio · Operação",
          pergunta: "Está no balcão ou na oficina sem tempo para abrir planilha?",
          cuidado: "Revise os números transcritos antes de atualizar o estoque ou o caixa.",
          itens: [
            "Falar por 1 minuto o que faltou ou sobrou no expediente",
            "Transformar relato falado em lista de compras priorizada",
            "Registrar pendências de manutenção e abertura do dia seguinte",
          ],
        },
        {
          sigla: "VIT",
          nome: "Foto de vitrine, gôndola ou cardápio",
          sub: "Avaliar clareza de preços e destaque dos itens de maior margem.",
          rotulo: "Visão · Vendas",
          pergunta: "O cliente bate o olho e entende o que comprar?",
          cuidado: "Use fotos sem clientes identificáveis para respeitar a LGPD.",
          itens: [
            "Identificar poluição visual ou preços difíceis de ler",
            "Posicionar produtos de maior margem nas áreas nobres",
            "Melhorar descrições de combos e serviços no cardápio",
          ],
        },
      ],
    },
    {
      tipo: "prompt",
      rotulo: "Auditar cotação",
      titulo: "Extraia o custo real de notas ou cotações",
      tituloEnfase: "de notas ou cotações",
      texto: "Anexe a foto/PDF de um orçamento no botão + ou baixe a planilha de exemplo abaixo para testar. O protocolo anti-alucinação exige memória de cálculo linha a linha.",
      arquivos: [
        {
          nome: "Cotação comparativa de fornecedores",
          url: "/materiais/cotacao-fornecedores-exemplo.csv",
          formato: "Planilha CSV",
          descricao: "Baixe e anexe no botão + do Gemini para testar o rateio proporcional de frete e impostos.",
        },
      ],
      nomePrompt: "Auditoria de orçamento de fornecedor",
      prompt: `# Perfil
Atue como analista de compras e custos para uma micro ou pequena empresa do ramo de [[seu ramo de atuação]].

# Contexto
Anexei a imagem/PDF ou listei abaixo os dados da cotação de reposição do meu negócio (sem dados pessoais ou bancários sigilosos):
[[Se não anexou foto/PDF, cole aqui os itens, quantidades, preços unitários, valor de frete, impostos/ST ou descontos informados pelo fornecedor]]

# Objetivo
Extraia todos os itens e calcule o Custo Unitário Efetivo (incluindo rateio proporcional de frete, impostos ou taxas da nota). Aplique o protocolo anti-alucinação financeira: mostre a memória de cálculo linha a linha e sinalize qualquer número ilegível ou ausente como [A CONFIRMAR].

# Modelo de Entrega
1. Tabela: Item | Quantidade | Preço na Nota (R$) | Frete/Impostos Rateados (R$) | Custo Unitário Real (R$) | Total da Linha (R$)
2. Soma conferida dos itens vs. valor total cobrado pelo fornecedor
3. Três perguntas de negociação (desconto à vista, prazo ou bonificação) para eu enviar ao vendedor`,
      observe: [
        "Mostra a memória de cálculo do rateio de frete/imposto?",
        "Compara a soma das linhas com o total da nota sem inventar valores?",
        "Marca dados ilegíveis ou ausentes como [A CONFIRMAR]?",
      ],
      dica: "Para cálculos com múltiplas restrições (frete + imposto + desconto), selecione o modelo Pro/Raciocínio antes de enviar.",
    },
    {
      tipo: "resultado",
      rotulo: "Faça na sua conta",
      titulo: "Agora faça na sua conta",
      tituloEnfase: "na sua conta",
      texto: "Repita na sua tela o que você acabou de ver. Depois, pense em uma tarefa simples do seu negócio para pedir ajuda ao Gemini, sem incluir dados pessoais de clientes.",
      exercicio: {
        situacao: "Abra o Gemini e deixe a tela pronta para trabalhar: o chat de um lado e a sua lista real de tarefas da semana do outro.",
        tarefa: [
          "Escreva três tarefas reais da sua semana, uma de cada área: caixa ou financeiro, vendas ou divulgação e atendimento.",
          "Na caixa de mensagem, peça ajuda com a primeira: [[descreva a tarefa com o seu produto, prazo ou problema]].",
          "Leia a resposta e marque o que serve, o que falta confirmar e o que você ainda precisa decidir sozinho.",
        ],
        entrega: "A primeira tarefa da semana encaminhada com ajuda do Gemini.",
      },
      esperado: ["Você sabe onde ficam a caixa de mensagem, o seletor de modelo, as Ferramentas e o botão +"],
      confira: [
        "Abri o Gemini e encontrei o seletor de modelo",
        "Vi quais modelos aparecem na minha conta e deixei o Flash selecionado",
        "Abri Ferramentas e o botão + e vi as opções",
      ],
      visual: { tipo: "tela", tela: "inicio", legenda: "Seu mapa da tela" },
    },
  ],
};
