import type { Aula } from "./tipos";

/** Aula de referência: serve de modelo de tom, tamanho e estrutura para as demais. */
export const aula11: Aula = {
  n: "1.1",
  titulo: "Interface do Gemini",
  curto: "Interface",
  ferramenta: "Gemini · Chat",
  objetivo: "Reconhecer as partes da tela do Gemini e saber por onde começar.",
  voceSaiCom:
    "Um mapa da tela: onde conversar, como escolher o modelo, onde ficam as ferramentas e como anexar arquivos.",
  saibaMais:
    "O modelo muda a forma de raciocinar: Flash responde rápido, Pro pensa mais antes de responder. As ferramentas mudam o tipo de trabalho, como pesquisar a fundo ou criar uma imagem. Em todos os casos, você continua responsável por conferir o que recebeu.",
  fontes: [
    { nome: "Central de Ajuda do Gemini", url: "https://support.google.com/gemini" },
    { nome: "Notas de versão do Gemini", url: "https://gemini.google/release-notes/" },
  ],
  passos: [
    {
      tipo: "tela",
      tela: "inicio",
      rotulo: "Tela inicial",
      titulo: "Conheça a tela inicial",
      tituloEnfase: "a tela inicial",
      texto: "Clique nos números para ver o que é cada parte. Você vai usar estas quatro partes em todas as aulas.",
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
      texto: "Clique no + à esquerda do campo de mensagem. Veja as opções que aparecem.",
    },
    {
      tipo: "resultado",
      rotulo: "Faça na sua conta",
      titulo: "Agora faça na sua conta",
      tituloEnfase: "na sua conta",
      texto: "Repita na sua tela o que você acabou de ver.",
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
