import type { Modulo } from "./tipos";

export const modulo3: Modulo = {
  "id": "modulo-3",
  "glifo": "chart",
  "nome": "Ferramentas",
  "nomeCompleto": "Ferramentas do Gemini aplicadas ao trabalho",
  "aulas": [
    {
      "n": "3.1",
      "titulo": "Deep Research: enxergar oportunidades de mercado",
      "curto": "Deep Research",
      "ferramenta": "Gemini · Deep Research",
      "objetivo": "Investigar oportunidades com fontes, contrapontos e testes locais.",
      "voceSaiCom": "Uma matriz de oportunidades com evidências e lacunas para validar.",
      "fontes": [
        {
          "nome": "Central de Ajuda do Gemini",
          "url": "https://support.google.com/gemini"
        },
        {
          "nome": "Notas de versão do Gemini",
          "url": "https://gemini.google/release-notes/"
        }
      ],
      "passos": [
        {
          "tipo": "catalogo",
          "rotulo": "Monte o pedido",
          "titulo": "Escolha ângulos de investigação",
          "tituloEnfase": "ângulos de investigação",
          "texto": "Clique em cada parte. Use as perguntas para orientar o pedido e os cuidados para conferir a resposta.",
          "itens": [
            {
              "sigla": "1",
              "nome": "Referências",
              "sub": "Aprender com outros lugares",
              "rotulo": "Referências",
              "pergunta": "O que outro destino ensina?",
              "cuidado": "Semelhança não garante viabilidade local.",
              "itens": [
                "Compare públicos, acesso e custos.",
                "Diga o que precisa mudar em Barreirinhas."
              ]
            },
            {
              "sigla": "2",
              "nome": "Objeções",
              "sub": "Procurar o que pode falhar",
              "rotulo": "Objeções",
              "pergunta": "Que evidência enfraquece a ideia?",
              "cuidado": "Não peça apenas argumentos favoráveis.",
              "itens": [
                "Investigue sazonalidade e operação.",
                "Separe restrição comprovada de hipótese."
              ]
            },
            {
              "sigla": "3",
              "nome": "Aplicação",
              "sub": "Traduzir achados em testes",
              "rotulo": "Aplicação",
              "pergunta": "Que pequena ação permite aprender?",
              "cuidado": "Uma tendência não é uma venda garantida.",
              "itens": [
                "Proponha oferta, canal ou parceria.",
                "Defina um teste antes de investir."
              ]
            },
            {
              "sigla": "4",
              "nome": "Sinais",
              "sub": "Distinguir indício de tendência",
              "rotulo": "Sinais",
              "pergunta": "O fenômeno já tem evidência?",
              "cuidado": "Não projete demanda com base em uma postagem.",
              "itens": [
                "Compare datas e recorrência.",
                "Marque sinais ainda frágeis."
              ]
            },
            {
              "sigla": "5",
              "nome": "Confronto",
              "sub": "Cruzar fontes independentes",
              "rotulo": "Confronto",
              "pergunta": "As fontes medem a mesma coisa?",
              "cuidado": "Notícias que repetem um estudo não são novas evidências.",
              "itens": [
                "Compare recorte geográfico e período.",
                "Registre divergências e dados ausentes."
              ]
            }
          ]
        },
        {
          "tipo": "tela",
          "tela": "deep-research",
          "rotulo": "Na ferramenta",
          "titulo": "Revise o plano de pesquisa",
          "tituloEnfase": "o plano de pesquisa",
          "texto": "Abra Deep Research em Ferramentas e envie o pedido do próximo passo. Clique em Editar plano, confira o recorte e só então em Iniciar pesquisa."
        },
        {
          "tipo": "prompt",
          "rotulo": "Pesquisar",
          "titulo": "Investigue antes de recomendar",
          "tituloEnfase": "antes de recomendar",
          "nomePrompt": "Turismo gastronômico em Barreirinhas",
          "prompt": "# Perfil\nAtue como analista de mercado que apoia consultores de pequenos negócios.\n# Contexto\nEste é um exercício didático fictício para investigar turismo gastronômico em [[Barreirinhas]], no Maranhão. Não há diagnóstico local previamente validado. Use somente fontes públicas, sem dados pessoais.\n# Objetivo\nInvestigue até três oportunidades para pequenos negócios. Compare experiências de outros destinos, procure obstáculos operacionais, traduza estudos em ações e separe tendências de sinais iniciais. Cruze fontes independentes e destaque divergências de período, método e território. Não confunda dados estaduais com demanda municipal.\n# Modelo de Entrega\nProponha primeiro um plano de pesquisa. No relatório, entregue resumo e matriz com oportunidade, público, evidência, objeção, condição de viabilidade e teste de baixo custo. Inclua links, datas e abrangência junto das afirmações principais. Não invente estatísticas, entrevistas ou empresas. Marque lacunas como “não localizado” e inferências como hipóteses. Indique quais afirmações eu devo conferir na fonte original antes de recomendar investimento.",
          "observe": [
            "O plano contempla objeções, não só oportunidades?",
            "Os números têm fonte, data e recorte territorial?",
            "Cada oportunidade tem um teste que pode contrariá-la?"
          ],
          "dica": "Aguarde o relatório completo. Abra os links das afirmações decisivas antes de exportar para Docs."
        },
        {
          "tipo": "comparacao",
          "rotulo": "Confira a leitura",
          "titulo": "Leia além do resumo",
          "tituloEnfase": "além do resumo",
          "colunas": [
            "Leitura apressada",
            "Leitura conferida"
          ],
          "linhas": [
            [
              "O turismo cresceu no estado; o restaurante vai vender mais.",
              "Confira se há evidência municipal e do público-alvo; crescimento estadual não prova venda local."
            ],
            [
              "Três sites repetem o número; está confirmado.",
              "Abra o estudo original: os sites podem estar citando a mesma fonte."
            ],
            [
              "O relatório recomenda; vamos investir.",
              "Confronte custos, sazonalidade e regras. Faça primeiro um teste com critério de avanço."
            ]
          ]
        },
        {
          "tipo": "resultado",
          "rotulo": "Faça na sua conta",
          "titulo": "Agora faça na sua conta",
          "tituloEnfase": "na sua conta",
          "texto": "Repita o exercício. Confira a entrega antes de usar no atendimento.",
          "esperado": [
            "Um relatório conferido, com uma oportunidade tratada como hipótese."
          ],
          "confira": [
            "Revisei o plano antes de iniciar a pesquisa",
            "Abri duas fontes centrais e conferi data e território",
            "Escolhi um teste e registrei uma lacuna a investigar"
          ]
        }
      ]
    },
    {
      "n": "3.2",
      "titulo": "Notebooks: consultar documentos com fontes",
      "curto": "Notebooks",
      "ferramenta": "Gemini · Notebooks",
      "objetivo": "Confrontar um plano com resultados e conferir cada conclusão nas fontes.",
      "voceSaiCom": "Uma leitura do plano que separa execução, resultado e informação ausente.",
      "fontes": [
        {
          "nome": "Central de Ajuda do Gemini",
          "url": "https://support.google.com/gemini"
        },
        {
          "nome": "Notas de versão do Gemini",
          "url": "https://gemini.google/release-notes/"
        }
      ],
      "passos": [
        {
          "tipo": "tela",
          "tela": "notebook",
          "rotulo": "Na ferramenta",
          "titulo": "Reúna plano e resultados",
          "tituloEnfase": "plano e resultados",
          "texto": "Abra Notebooks e adicione as duas fontes fictícias do próximo passo em documentos separados. Confira a lista de fontes; não envie dados pessoais ou arquivos sem autorização."
        },
        {
          "tipo": "prompt",
          "rotulo": "Consultar fontes",
          "titulo": "Confronte plano e execução",
          "tituloEnfase": "plano e execução",
          "nomePrompt": "Plano e resultados fictícios",
          "prompt": "# Perfil\nAtue como apoio à revisão de um plano de ação.\n# Contexto\nEstes são dados didáticos fictícios. Crie duas fontes separadas com os blocos abaixo e consulte apenas essas fontes no notebook, sem informações pessoais.\nFonte 1 — Plano de junho, Caxias: realizar 4 oficinas de precificação; alcançar 40 participações; obter avaliação média de pelo menos 4 em escala de 1 a 5; verificar adoção da ficha de custos após 30 dias.\nFonte 2 — Resultados de junho: 4 oficinas; 48 participações; 12 avaliações respondidas, média 4,5; acompanhamento de adoção ainda não realizado.\n# Objetivo\nCompare metas e resultados. Não trate participações como pessoas únicas nem satisfação como adoção. Não invente dados ausentes.\n# Modelo de Entrega\nEntregue tabela com meta, resultado, situação e citação da fonte correspondente. Separe fato, interpretação e lacuna. Sugira uma verificação para a próxima reunião. Se a fonte não permitir responder, declare isso. Vou abrir cada citação para conferir os trechos.",
          "recebe": {
            "titulo": "Exemplo de leitura fictícia",
            "texto": "A numeração das citações depende das fontes do seu notebook.",
            "secoes": [
              {
                "rotulo": "Execução",
                "itens": [
                  "4 oficinas: meta cumprida; confira plano e resultados nas citações.",
                  "48 participações: acima da meta, sem comprovar 48 pessoas únicas."
                ]
              },
              {
                "rotulo": "Lacunas",
                "itens": [
                  "Média 4,5 com 12 respostas; não representa necessariamente todo o público.",
                  "Sem acompanhamento, a adoção da ficha continua desconhecida."
                ]
              }
            ],
            "aceite": "Aceite apenas se as citações abrirem trechos que sustentem as afirmações."
          },
          "dica": "Primeiro prepare as duas fontes com os blocos do contexto. Depois envie a pergunta ao notebook."
        },
        {
          "tipo": "comparacao",
          "rotulo": "Confira a leitura",
          "titulo": "Exija evidência na resposta",
          "tituloEnfase": "evidência na resposta",
          "colunas": [
            "Resposta com fonte",
            "Resposta sem fonte"
          ],
          "linhas": [
            [
              "“4 oficinas realizadas”, com citação do documento Resultados: abra e confira.",
              "“O plano foi um sucesso”: sem evidência e sem critério explícito."
            ],
            [
              "“Adoção ainda não medida”, com trecho do acompanhamento pendente.",
              "“A maioria já usa a ficha”: dado inexistente nas fontes."
            ],
            [
              "“48 participações”, preservando a unidade do documento.",
              "“48 empresários diferentes”: deduplicação que os documentos não permitem."
            ]
          ]
        },
        {
          "tipo": "resultado",
          "rotulo": "Faça na sua conta",
          "titulo": "Agora faça na sua conta",
          "tituloEnfase": "na sua conta",
          "texto": "Repita o exercício. Confira a entrega antes de usar no atendimento.",
          "esperado": [
            "Uma comparação rastreável entre o plano e os resultados."
          ],
          "confira": [
            "Adicionei as duas fontes fictícias e fiz a pergunta",
            "Abri as citações e comparei com os trechos originais",
            "Registrei a adoção como lacuna, sem inventar resultado"
          ]
        }
      ]
    },
    {
      "n": "3.3",
      "titulo": "Canvas: do relatório ao material",
      "curto": "Canvas",
      "ferramenta": "Gemini · Canvas",
      "objetivo": "Transformar um diagnóstico em material curto e revisar um trecho sem perder evidências.",
      "voceSaiCom": "Uma página para empresários, revisada e pronta para validação humana.",
      "fontes": [
        {
          "nome": "Central de Ajuda do Gemini",
          "url": "https://support.google.com/gemini"
        },
        {
          "nome": "Notas de versão do Gemini",
          "url": "https://gemini.google/release-notes/"
        }
      ],
      "passos": [
        {
          "tipo": "tela",
          "tela": "canvas",
          "rotulo": "Na ferramenta",
          "titulo": "Abra espaço para editar",
          "tituloEnfase": "espaço para editar",
          "texto": "Abra Canvas em Ferramentas. Cole o pedido seguinte e acompanhe o documento à direita; selecione um trecho para solicitar ajustes pontuais."
        },
        {
          "tipo": "prompt",
          "rotulo": "Criar material",
          "titulo": "Transforme achados em material",
          "tituloEnfase": "achados em material",
          "nomePrompt": "Uma página para o evento",
          "prompt": "# Perfil\nAtue como redator instrucional para pequenos negócios.\n# Contexto\nEstes são dados didáticos fictícios de um evento de alimentação em [[São Luís]]: 20 participações em oficina; 8 fichas de custos preenchidas; nenhuma medição posterior de margem. Não há comprovação de aumento de lucro. O material será entregue a empresários e não deve conter dados pessoais.\n# Objetivo\nCrie no Canvas uma página que ajude o participante a iniciar sua ficha de custos. Use somente os dados acima. Não invente depoimentos, percentuais de sucesso ou promessas de retorno.\n# Modelo de Entrega\nOrganize título, diagnóstico em duas frases, três ações práticas e checklist para a próxima semana. Inclua campos para preencher custos e preço, sem assumir valores. Destaque “exemplo didático fictício” e a lacuna sobre margem. Use linguagem simples e até 350 palavras. Termine com uma pergunta para o empresário conferir seus registros antes de decidir. Mantenha o material editável para revisão antes de exportar.",
          "observe": [
            "O texto diferencia participação de ficha preenchida?",
            "A página evita prometer lucro?",
            "As lacunas continuam visíveis?"
          ]
        },
        {
          "tipo": "prompt",
          "rotulo": "Ajustar trecho",
          "titulo": "Revise só o trecho selecionado",
          "tituloEnfase": "só o trecho selecionado",
          "nomePrompt": "Ajuste local com evidência",
          "prompt": "# Perfil\nAtue como editor de linguagem simples.\n# Contexto\nNo Canvas, selecionei [[o parágrafo do diagnóstico]]. O documento usa dados didáticos fictícios de uma oficina: 20 participações, 8 fichas preenchidas e nenhum acompanhamento de margem.\n# Objetivo\nReescreva apenas a seleção para um empresário com pouco tempo. Preserve números, unidades e a ressalva sobre ausência de medição. Não altere o restante do documento nem inclua dados novos ou pessoais.\n# Modelo de Entrega\nSubstitua o trecho por até três frases curtas, sem jargão. Não troque “participações” por “pessoas únicas” e não prometa ganho de lucro. Se houver ambiguidade, sinalize-a em vez de completar com suposição. Explique na conversa o que mudou e o que foi preservado para que eu compare com a versão anterior.",
          "dica": "Selecione o trecho antes de enviar. Compare o documento inteiro após a edição; não presuma que só a seleção mudou."
        },
        {
          "tipo": "resultado",
          "rotulo": "Faça na sua conta",
          "titulo": "Agora faça na sua conta",
          "tituloEnfase": "na sua conta",
          "texto": "Repita o exercício. Confira a entrega antes de usar no atendimento.",
          "esperado": [
            "Uma página editável com diagnóstico, ações e ressalvas preservadas."
          ],
          "confira": [
            "Criei o material e conferi os números com o contexto",
            "Selecionei um trecho e revisei o resultado do ajuste",
            "Revisei a página inteira antes de exportar para Docs"
          ]
        }
      ]
    },
    {
      "n": "3.4",
      "titulo": "Gemini nas Planilhas: encontrar padrões",
      "curto": "Planilhas",
      "ferramenta": "Google Planilhas · Gemini",
      "objetivo": "Comparar volume, espera, retorno e avaliação sem transformar correlação em causa.",
      "voceSaiCom": "Uma análise exploratória e um gráfico com unidades e lacunas explícitas.",
      "fontes": [
        {
          "nome": "Central de Ajuda do Gemini",
          "url": "https://support.google.com/gemini"
        },
        {
          "nome": "Notas de versão do Gemini",
          "url": "https://gemini.google/release-notes/"
        }
      ],
      "passos": [
        {
          "tipo": "tela",
          "tela": "sheets",
          "rotulo": "Na ferramenta",
          "titulo": "Prepare a base de análise",
          "tituloEnfase": "a base de análise",
          "texto": "Abra uma planilha e o painel do Gemini. Cole a tabela fictícia do próximo passo em colunas separadas; confirme tipos numéricos e deixe a avaliação ausente em branco."
        },
        {
          "tipo": "prompt",
          "rotulo": "Analisar base",
          "titulo": "Compare carga e experiência",
          "tituloEnfase": "carga e experiência",
          "nomePrompt": "Base fictícia de atendimentos",
          "prompt": "# Perfil\nAtue como analista de atendimento.\n# Contexto\nEstes são dados didáticos fictícios, agregados por unidade em um mesmo mês. Não há dados pessoais. Copie a tabela para A1:F7; a avaliação de Balsas deve ficar vazia.\nUnidade | Atendimentos | Espera média (dias) | Retornos em 30 dias | Avaliação média (1 a 5) | Respostas\nSão Luís | 120 | 3 | 24 | 4,6 | 60\nImperatriz | 80 | 8 | 24 | 4,2 | 40\nCaxias | 60 | 5 | 6 | 4,8 | 15\nBacabal | 40 | 9 | 12 | 3,9 | 10\nBalsas | 30 | 2 | 3 |  | 0\nTimon | 50 | 6 | 10 | 4,4 | 25\n# Objetivo\nCompare volume, espera, proporção de retornos e cobertura da avaliação. Retorno não significa necessariamente insatisfação. Não invente motivos.\n# Modelo de Entrega\nEntregue tabela de taxas, três achados e duas hipóteses a verificar. Não transforme avaliação ausente em zero nem calcule média geral simples das médias. Separe fatos e sugestões; cite as células usadas para eu conferir.",
          "observe": [
            "São Luís lidera volume; Bacabal tem a maior espera média.",
            "Imperatriz e Bacabal têm 30% de retorno, apesar dos volumes diferentes.",
            "Balsas não tem avaliação; Caxias tem cobertura de 25%."
          ],
          "dica": "Se a tabela entrar em uma coluna, separe pelo caractere |. Confira os seis registros antes de pedir a análise."
        },
        {
          "tipo": "comparacao",
          "rotulo": "Confira a leitura",
          "titulo": "Separe medida de decisão",
          "tituloEnfase": "medida de decisão",
          "colunas": [
            "O que a planilha mostra",
            "O que a pessoa decide"
          ],
          "linhas": [
            [
              "Volume: São Luís registra 120 atendimentos.",
              "Avaliar capacidade; maior volume não prova pior atendimento."
            ],
            [
              "Espera: Bacabal tem média de 9 dias.",
              "Investigar fila e distribuição; a média não revela cada caso."
            ],
            [
              "Retorno: 12 de 40 em Bacabal, ou 30%.",
              "Verificar motivo do retorno antes de chamar isso de retrabalho."
            ],
            [
              "Avaliação: Caxias tem 4,8 com 15 respostas de 60 atendimentos.",
              "Considerar cobertura de 25% e possível viés, não declarar a melhor unidade."
            ]
          ]
        },
        {
          "tipo": "prompt",
          "rotulo": "Visualizar",
          "titulo": "Crie taxas e um gráfico",
          "tituloEnfase": "taxas e um gráfico",
          "nomePrompt": "Fórmula e gráfico conferíveis",
          "prompt": "# Perfil\nAtue como apoio no Google Planilhas.\n# Contexto\nUso a base didática fictícia desta aula em A1:F7. B contém atendimentos, C espera média em dias, D retornos em 30 dias e F respostas de avaliação. Não há dados pessoais.\n# Objetivo\nCrie em G a taxa de retorno (D dividido por B) e em H a cobertura da avaliação (F dividido por B). Use percentuais e trate denominador zero como informação ausente, não como taxa zero.\n# Modelo de Entrega\nMostre as fórmulas da linha 2 adequadas à localidade da planilha e explique como preencher até a linha 7. Crie um gráfico de barras com unidade no eixo de categorias e espera média em dias no eixo numérico. Não misture dias com percentuais no mesmo eixo. Se não puder inserir o gráfico, forneça as etapas manuais. Indique os intervalos usados e peça conferência: Imperatriz deve ter retorno de 30% e cobertura de 50%. Não invente causas para as diferenças.",
          "dica": "Confira uma divisão manualmente. Dê ao gráfico o título “Espera média por unidade — base fictícia”."
        },
        {
          "tipo": "resultado",
          "rotulo": "Faça na sua conta",
          "titulo": "Agora faça na sua conta",
          "tituloEnfase": "na sua conta",
          "texto": "Repita o exercício. Confira a entrega antes de usar no atendimento.",
          "esperado": [
            "Uma comparação exploratória sem ranking automático de qualidade."
          ],
          "confira": [
            "Conferi colunas, seis registros e a avaliação em branco",
            "Validei uma taxa de retorno e uma cobertura manualmente",
            "Conferi o gráfico e registrei uma hipótese para investigar com a equipe"
          ]
        }
      ]
    },
    {
      "n": "3.5",
      "titulo": "Imagens com Nano Banana",
      "curto": "Imagens",
      "ferramenta": "Gemini · Nano Banana",
      "objetivo": "Pedir e editar imagens de produto com critérios visuais e cuidados de uso.",
      "voceSaiCom": "Uma imagem de exercício revisada, sem promessas visuais que o produto real não cumpre.",
      "fontes": [
        {
          "nome": "Central de Ajuda do Gemini",
          "url": "https://support.google.com/gemini"
        },
        {
          "nome": "Notas de versão do Gemini",
          "url": "https://gemini.google/release-notes/"
        }
      ],
      "passos": [
        {
          "tipo": "catalogo",
          "rotulo": "Monte o pedido",
          "titulo": "Descreva a imagem por partes",
          "tituloEnfase": "a imagem por partes",
          "texto": "Clique em cada parte. Use as perguntas para orientar o pedido e os cuidados para conferir a resposta.",
          "itens": [
            {
              "sigla": "1",
              "nome": "Cena",
              "sub": "O que deve aparecer",
              "rotulo": "Cena",
              "pergunta": "Qual produto e em qual ambiente?",
              "cuidado": "Não invente ingredientes ou atributos do produto real.",
              "itens": [
                "Defina objeto principal e fundo."
              ]
            },
            {
              "sigla": "2",
              "nome": "Estilo",
              "sub": "A linguagem visual",
              "rotulo": "Estilo",
              "pergunta": "Foto de catálogo ou ilustração?",
              "cuidado": "Não apresente uma simulação como registro documental.",
              "itens": [
                "Escolha um estilo coerente com a marca."
              ]
            },
            {
              "sigla": "3",
              "nome": "Luz",
              "sub": "Como iluminar",
              "rotulo": "Luz",
              "pergunta": "Luz natural suave ou de estúdio?",
              "cuidado": "Brilho excessivo pode esconder detalhes.",
              "itens": [
                "Informe direção e intensidade."
              ]
            },
            {
              "sigla": "4",
              "nome": "Enquadramento",
              "sub": "O que ganha destaque",
              "rotulo": "Enquadramento",
              "pergunta": "Vista frontal, superior ou lateral?",
              "cuidado": "Não corte informações essenciais.",
              "itens": [
                "Defina distância e posição."
              ]
            },
            {
              "sigla": "5",
              "nome": "Texto na imagem",
              "sub": "O que precisa ser legível",
              "rotulo": "Texto na imagem",
              "pergunta": "Qual frase exata deve aparecer?",
              "cuidado": "Revise letras, acentos e promessas comerciais.",
              "itens": [
                "Prefira texto curto ou peça imagem sem texto."
              ]
            },
            {
              "sigla": "6",
              "nome": "Proporção",
              "sub": "Onde será publicada",
              "rotulo": "Proporção",
              "pergunta": "Quadrado, vertical ou horizontal?",
              "cuidado": "Confira dimensões e recorte antes de publicar.",
              "itens": [
                "Informe proporção e margem de segurança."
              ]
            }
          ]
        },
        {
          "tipo": "prompt",
          "rotulo": "Criar imagem",
          "titulo": "Fotografe um produto fictício",
          "tituloEnfase": "um produto fictício",
          "nomePrompt": "Produto maranhense em destaque",
          "prompt": "# Perfil\nAtue como fotógrafo de produtos para pequenos negócios.\n# Contexto\nEste é um exercício didático fictício para uma pequena loja de artesanato de [[São Luís]]. O produto imaginado é um cesto de fibra trançada, sem marca. Não represente uma peça como produção de artesão real nem atribua certificações ou origem comprovada.\n# Objetivo\nCrie uma imagem com aparência de fotografia de catálogo: um cesto centralizado sobre mesa clara, fundo neutro, luz natural suave pela esquerda e enquadramento a três quartos. Mostre a trama sem brilho artificial e sem objetos que confundam o que está à venda.\n# Modelo de Entrega\nUse proporção quadrada 1:1, com margem para recorte. Não inclua pessoas, logotipos, selos ou texto na imagem. Não invente assinatura de artesão. O resultado será identificado como imagem gerada por IA. Antes de publicar, vou conferir forma, alças, textura e fidelidade ao produto real; não trate esta simulação como foto documental.",
          "observe": [
            "As alças e a trama têm continuidade?",
            "O fundo não sugere acessórios incluídos na venda?",
            "O produto real corresponde ao que será anunciado?"
          ],
          "dica": "Abra Criar imagem em Ferramentas. O modelo e a disponibilidade podem variar conforme sua conta."
        },
        {
          "tipo": "prompt",
          "rotulo": "Editar foto",
          "titulo": "Ajuste sem alterar o produto",
          "tituloEnfase": "sem alterar o produto",
          "nomePrompt": "Edição de foto autorizada",
          "prompt": "# Perfil\nAtue como editor de fotografia de produto.\n# Contexto\nVou anexar [[uma foto própria e autorizada de um cesto]], sem pessoas, dados pessoais ou marcas de terceiros. Este pedido integra um exercício didático fictício. A peça real da foto é a referência; não acrescente características de outro produto.\n# Objetivo\nTroque apenas o fundo por uma superfície bege neutra e suavize sombras fortes. Preserve cor, trama, dimensões aparentes, alças e pequenas características da peça. Não esconda defeitos relevantes para a compra.\n# Modelo de Entrega\nEntregue uma versão quadrada com margem de segurança, sem texto, logotipo ou selo. Não crie acessórios nem remova partes do produto. Se não conseguir preservar um detalhe, avise em vez de reconstruí-lo silenciosamente. Vou comparar a edição com a foto original antes de usar. Mantenha a identificação de conteúdo gerado ou editado por IA e não solicite remover mecanismos de procedência.",
          "dica": "Envie apenas uma foto que você possa usar. Guarde o original para comparar contorno, cor e detalhes."
        },
        {
          "tipo": "comparacao",
          "rotulo": "Confira a leitura",
          "titulo": "Use com responsabilidade",
          "tituloEnfase": "com responsabilidade",
          "colunas": [
            "Pode",
            "Cuidado"
          ],
          "linhas": [
            [
              "Criar uma simulação de catálogo identificada como IA.",
              "SynthID é uma marca d’água digital, não um selo visível de qualidade nem prova de autorização comercial."
            ],
            [
              "Editar foto própria de produto e comparar com o original.",
              "Não alterar atributos que induzam o comprador ao erro. Não peça remoção de marcas de procedência."
            ],
            [
              "Preferir cenas sem pessoas ou usar material autorizado.",
              "Pessoas reais exigem atenção a consentimento e privacidade; evite aparência enganosa de depoimento ou endosso."
            ],
            [
              "Usar identidade visual própria com direitos de uso.",
              "Não incluir marcas de terceiros para sugerir parceria. Geração por IA não garante liberação de direitos."
            ]
          ]
        },
        {
          "tipo": "resultado",
          "rotulo": "Faça na sua conta",
          "titulo": "Agora faça na sua conta",
          "tituloEnfase": "na sua conta",
          "texto": "Repita o exercício. Confira a entrega antes de usar no atendimento.",
          "esperado": [
            "Uma imagem de exercício conferida com critérios visuais e de uso."
          ],
          "confira": [
            "Criei a imagem com cena, luz, enquadramento e proporção definidos",
            "Comparei a edição autorizada com a foto original",
            "Revisei direitos, fidelidade e identificação de IA antes de publicar"
          ]
        }
      ]
    }
  ]
};
