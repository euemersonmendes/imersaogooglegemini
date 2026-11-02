import type { Modulo } from "./tipos";

export const modulo3: Modulo = {
  "id": "modulo-3",
  "glifo": "chart",
  "nome": "Ferramentas",
  "nomeCompleto": "Ferramentas do Gemini aplicadas ao negócio",
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
              "pergunta": "O que outras lojas do bairro oferecem?",
              "cuidado": "Semelhança não garante viabilidade local.",
              "itens": [
                "Compare produtos, preços públicos e condições de venda.",
                "Confira o que faz sentido para seus clientes e seus custos."
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
          "titulo": "Investigue antes de investir",
          "tituloEnfase": "antes de investir",
          "nomePrompt": "Concorrentes e ideias para uma padaria",
          "prompt": "# Perfil\nAtue como apoio ao dono de uma pequena padaria na pesquisa de mercado.\n# Contexto\nEste é um exercício didático fictício para uma padaria em [[seu bairro e município]]. Quero conhecer concorrentes, preços e ideias de produtos antes de investir. Use apenas fontes públicas, sem dados pessoais de clientes ou funcionários.\n# Objetivo\nPesquise ofertas e preços públicos de padarias da região e proponha até três ideias de produto para testar. Compare tamanho, unidade, data do preço e condições de venda; não compare preço por quilo com preço por unidade. Considere custos, validade, estoque e capacidade de produção. Cruze fontes independentes. Não trate uma postagem como prova de demanda nem dados estaduais como procura no bairro.\n# Modelo de Entrega\nProponha primeiro um plano de pesquisa. No relatório, entregue resumo e matriz com ideia de produto, público, concorrente ou oferta de referência, preço e unidade, fonte e data, obstáculo e teste de baixo custo. Não invente empresas, preços, estatísticas ou entrevistas. Marque dados ausentes como “não localizado” e inferências como hipóteses. Separe os dados públicos encontrados do cenário fictício. Indique o que devo conferir diretamente antes de comprar insumos ou mudar meus preços.",
          "observe": [
            "O plano contempla objeções, não só oportunidades?",
            "Os preços têm fonte, data, unidade e condições de venda?",
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
              "Outra padaria vende esse produto; a minha também vai vender bem.",
              "Confira público, preço, custos e procura no bairro; a oferta do concorrente não prova venda na sua padaria."
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
          "texto": "Repita o exercício com os dados fictícios. Confira a entrega antes de usar no seu negócio.",
          "exercicio": {
            "situacao": "Escolha uma pergunta real de mercado: [[quem compra o seu produto na sua região, quanto cobram os concorrentes ou se há demanda]].",
            "tarefa": [
              "Monte o plano da pesquisa com a pergunta, a região e o que você já sabe dos seus clientes.",
              "Rode a pesquisa e confira duas fontes centrais, com data e território.",
              "Trate a conclusão como hipótese e escolha um teste de uma semana: [[uma oferta, um horário ou um canal]]."
            ],
            "entrega": "Uma oportunidade de mercado transformada em um teste pequeno e mensurável."
          },
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
      "objetivo": "Comparar o plano de vendas da loja com os resultados e conferir cada conclusão nas fontes.",
      "voceSaiCom": "Uma comparação entre metas, vendas e informações que ainda faltam para decidir.",
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
          "nomePrompt": "Plano e vendas fictícias de uma loja",
          "prompt": "# Perfil\nAtue como apoio ao dono de uma pequena loja na revisão das vendas.\n# Contexto\nEstes são dados didáticos fictícios. Crie duas fontes separadas com os blocos abaixo e consulte apenas essas fontes no notebook, sem dados pessoais de clientes ou funcionários.\nFonte 1 — Plano de junho da loja: vender 40 camisetas; publicar 4 posts no Instagram; obter avaliação média de pelo menos 4 em escala de 1 a 5; conferir o lucro do mês após fechar custos e despesas.\nFonte 2 — Resultados de junho: 48 camisetas vendidas; 4 posts publicados; 12 avaliações respondidas, média 4,5; custos e despesas do mês ainda não fechados.\n# Objetivo\nCompare metas e resultados. Não trate peças vendidas como clientes únicos nem satisfação como lucro. Não atribua as vendas aos posts sem evidência. Não invente dados ausentes.\n# Modelo de Entrega\nEntregue tabela com meta, resultado, situação e citação da fonte correspondente. Separe fato, interpretação e lacuna. Sugira uma verificação para o próximo fechamento do mês. Se a fonte não permitir responder, declare isso. Vou abrir cada citação para conferir os trechos.",
          "recebe": {
            "titulo": "Exemplo de leitura fictícia",
            "texto": "A numeração das citações depende das fontes do seu notebook.",
            "secoes": [
              {
                "rotulo": "Execução",
                "itens": [
                  "4 posts publicados: meta cumprida; confira plano e resultados nas citações.",
                  "48 camisetas vendidas: acima da meta de 40, sem comprovar 48 clientes únicos."
                ]
              },
              {
                "rotulo": "Lacunas",
                "itens": [
                  "Média 4,5 com 12 respostas; não representa necessariamente todos os clientes.",
                  "Sem fechar custos e despesas, o lucro do mês continua desconhecido."
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
              "“4 posts publicados”, com citação do documento Resultados: abra e confira.",
              "“O plano foi um sucesso”: sem evidência e sem critério explícito."
            ],
            [
              "“Lucro ainda não apurado”, com trecho sobre custos e despesas pendentes.",
              "“A loja já aumentou o lucro”: dado inexistente nas fontes."
            ],
            [
              "“48 camisetas vendidas”, preservando a unidade do documento.",
              "“48 clientes diferentes”: contagem que os documentos não permitem."
            ]
          ]
        },
        {
          "tipo": "resultado",
          "rotulo": "Faça na sua conta",
          "titulo": "Agora faça na sua conta",
          "tituloEnfase": "na sua conta",
          "texto": "Repita o exercício com os dados fictícios. Confira a entrega antes de usar no seu negócio.",
          "exercicio": {
            "situacao": "Coloque no notebook [[o plano ou a meta do seu negócio]] e os resultados reais: a planilha ou o registro de vendas exportado como documento.",
            "tarefa": [
              "Suba os dois documentos no notebook, sem dados pessoais de clientes.",
              "Pergunte onde o resultado ficou longe da meta e confira cada citação no documento original.",
              "Registre o que falta para decidir: [[custo, prazo ou informação ausente]]."
            ],
            "entrega": "A comparação entre a sua meta e o seu resultado, conferida na fonte."
          },
          "esperado": [
            "Uma comparação rastreável entre o plano e os resultados."
          ],
          "confira": [
            "Adicionei as duas fontes fictícias e fiz a pergunta",
            "Abri as citações e comparei com os trechos originais",
            "Registrei o lucro como lacuna, sem inventar resultado"
          ]
        }
      ]
    },
    {
      "n": "3.3",
      "titulo": "Canvas: do relatório ao material",
      "curto": "Canvas",
      "ferramenta": "Gemini · Canvas",
      "objetivo": "Transformar informações do negócio em um cardápio editável e revisar um trecho sem inventar ofertas.",
      "voceSaiCom": "Um cardápio curto com texto para Instagram, pronto para sua conferência.",
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
          "nomePrompt": "Cardápio e post de uma pequena lanchonete",
          "prompt": "# Perfil\nAtue como redator de cardápios e posts para pequenos negócios.\n# Contexto\nEstes são dados didáticos fictícios de uma pequena lanchonete em [[seu município]]: sanduíche de queijo por R$ 12; suco de laranja de 300 ml por R$ 8; combo com esses dois itens por R$ 18. A oferta vale apenas para retirada no balcão, de terça a sexta, das 14h às 18h. Não há informação confirmada sobre estoque diário, entrega ou ingredientes além dos citados. Não inclua dados pessoais.\n# Objetivo\nCrie no Canvas uma página editável com cardápio curto e um texto de post para Instagram. Use somente os dados acima. Não invente ingredientes, fotos, depoimentos, disponibilidade, benefícios de saúde ou promessas de venda.\n# Modelo de Entrega\nOrganize título, cardápio com produtos, tamanhos informados e preços, condições da oferta, legenda para Instagram e checklist de revisão. Destaque “exemplo didático fictício”. Marque as informações não confirmadas como pendentes de conferência. Use linguagem simples e até 350 palavras. Termine perguntando se preços, estoque e horário foram conferidos antes da publicação.",
          "observe": [
            "O combo mantém os dois itens e o preço de R$ 18?",
            "O texto informa retirada no balcão, dias e horário sem inventar entrega?",
            "As lacunas continuam visíveis?"
          ]
        },
        {
          "tipo": "prompt",
          "rotulo": "Ajustar trecho",
          "titulo": "Revise só o trecho selecionado",
          "tituloEnfase": "só o trecho selecionado",
          "nomePrompt": "Ajuste da legenda sem mudar a oferta",
          "prompt": "# Perfil\nAtue como editor de linguagem simples.\n# Contexto\nNo Canvas, selecionei [[o texto do post para Instagram]]. O documento usa dados didáticos fictícios de uma lanchonete: sanduíche de queijo por R$ 12; suco de laranja de 300 ml por R$ 8; combo com esses dois itens por R$ 18. A oferta vale apenas para retirada no balcão, de terça a sexta, das 14h às 18h. O estoque diário não foi confirmado.\n# Objetivo\nReescreva apenas a seleção para os clientes da lanchonete. Preserve produtos, preços, tamanho informado e condições da oferta. Não altere o restante do documento nem inclua dados novos ou pessoais.\n# Modelo de Entrega\nSubstitua o trecho por até três frases curtas, sem jargão. Não anuncie entrega, disponibilidade garantida ou ingredientes não informados. Preserve a identificação de exemplo fictício e a pendência de conferir estoque. Se houver ambiguidade, sinalize-a em vez de completar com suposição. Explique na conversa o que mudou e o que foi preservado para que eu compare com a versão anterior.",
          "dica": "Selecione o trecho antes de enviar. Compare o documento inteiro após a edição; não presuma que só a seleção mudou."
        },
        {
          "tipo": "resultado",
          "rotulo": "Faça na sua conta",
          "titulo": "Agora faça na sua conta",
          "tituloEnfase": "na sua conta",
          "texto": "Repita o exercício com os dados fictícios. Confira a entrega antes de usar no seu negócio.",
          "exercicio": {
            "situacao": "Leve ao Canvas uma oferta real, com preços e condições: [[o produto, o valor e as regras da sua promoção]].",
            "tarefa": [
              "Peça o material de divulgação com [[o produto, os preços e as condições da oferta]], sem inventar estoque ou prazos.",
              "Ajuste um trecho para o tom dos seus clientes e revise a página inteira.",
              "Exporte para o Docs e programe a publicação no canal que você usa: WhatsApp, Instagram ou balcão."
            ],
            "entrega": "Um material de divulgação pronto para publicar, com os seus números."
          },
          "esperado": [
            "Um cardápio editável com legenda para Instagram e condições da oferta preservadas."
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
      "objetivo": "Comparar vendas por produto e mês, conferir estoque e separar receita de saldo de caixa e lucro.",
      "voceSaiCom": "Uma análise de vendas e estoque com taxas conferidas e um gráfico simples.",
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
          "texto": "Abra uma planilha e o painel do Gemini. Cole a tabela fictícia do próximo passo em colunas separadas; confirme os tipos numéricos e deixe o estoque final não informado em branco."
        },
        {
          "tipo": "prompt",
          "rotulo": "Analisar base",
          "titulo": "Compare vendas e estoque",
          "tituloEnfase": "vendas e estoque",
          "nomePrompt": "Base fictícia de vendas de uma padaria",
          "prompt": "# Perfil\nAtue como apoio ao dono de uma pequena padaria no controle de vendas e estoque.\n# Contexto\nEstes são dados didáticos fictícios, agregados por produto e mês. Não há dados pessoais. Copie a tabela para A1:F7; o estoque final de Bolo em junho deve ficar vazio. Cada linha trata de unidades do mesmo produto. Não houve perdas nem devoluções neste exercício.\nProduto | Mês | Unidades disponíveis no mês | Unidades vendidas | Receita de vendas (R$) | Estoque final (unidades)\nPão de queijo | Maio | 120 | 96 | 288 | 24\nBolo | Maio | 80 | 56 | 840 | 24\nSalgado | Maio | 60 | 54 | 324 | 6\nPão de queijo | Junho | 140 | 126 | 378 | 14\nBolo | Junho | 90 | 63 | 945 | \nSalgado | Junho | 100 | 80 | 480 | 20\n# Objetivo\nCompare vendas por produto e mês, percentual vendido e estoque final. Trate unidades disponíveis como estoque inicial mais entradas do mês. Não confunda receita com lucro nem com saldo de caixa: faltam custos, despesas, prazos de recebimento e pagamentos. Não invente motivos para as diferenças.\n# Modelo de Entrega\nEntregue tabela de taxas, três achados e duas hipóteses a verificar. Não transforme estoque ausente em zero. Se calcular um saldo esperado, identifique-o como cálculo a conferir na contagem física, não como estoque registrado. Separe fatos e sugestões; cite as células usadas para eu conferir.",
          "observe": [
            "Pão de queijo passa de 96 unidades vendidas em maio para 126 em junho.",
            "Bolo tem 70% das unidades disponíveis vendidas nos dois meses: 56 de 80 e 63 de 90.",
            "O estoque final de Bolo em junho não foi informado; 27 unidades é o saldo calculado, ainda não conferido."
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
              "Vendas: Pão de queijo registra 126 unidades em junho.",
              "Avaliar produção e procura; maior venda não prova maior lucro."
            ],
            [
              "Estoque: Salgado termina maio com 6 unidades registradas.",
              "Conferir validade e contagem física antes de planejar novas compras."
            ],
            [
              "Percentual vendido: Bolo vende 56 de 80 unidades em maio, ou 70%.",
              "Investigar procura e quantidade produzida antes de mudar o preço."
            ],
            [
              "Receita: Bolo registra R$ 945 em junho.",
              "Conferir recebimentos, custos e despesas; receita não é saldo de caixa nem lucro."
            ]
          ]
        },
        {
          "tipo": "prompt",
          "rotulo": "Visualizar",
          "titulo": "Crie taxas e um gráfico",
          "tituloEnfase": "taxas e um gráfico",
          "nomePrompt": "Fórmula e gráfico conferíveis",
          "prompt": "# Perfil\nAtue como apoio no Google Planilhas.\n# Contexto\nUso a base didática fictícia desta aula em A1:F7. A contém produto, B mês, C unidades disponíveis, D unidades vendidas, E receita de vendas em reais e F estoque final registrado. Não há dados pessoais.\n# Objetivo\nCrie em G o percentual vendido (D dividido por C) e em H o saldo esperado em unidades (C menos D). Use percentual em G e número de unidades em H. Trate denominador zero como informação ausente, não como taxa zero. Não preencha F com o cálculo de H: o estoque registrado depende de conferência física.\n# Modelo de Entrega\nMostre as fórmulas da linha 2 adequadas à localidade da planilha e explique como preencher até a linha 7. Crie um gráfico de colunas com produtos no eixo de categorias, unidades vendidas no eixo numérico e uma série para cada mês. Não misture reais, unidades e percentuais no mesmo eixo. Se não puder inserir o gráfico, forneça as etapas manuais. Indique os intervalos usados e peça conferência: Bolo em maio deve ter percentual vendido de 70% e saldo esperado de 24 unidades. Não invente causas para as diferenças.",
          "dica": "Confira uma divisão manualmente. Dê ao gráfico o título “Unidades vendidas por produto e mês — base fictícia”."
        },
        {
          "tipo": "resultado",
          "rotulo": "Faça na sua conta",
          "titulo": "Agora faça na sua conta",
          "tituloEnfase": "na sua conta",
          "texto": "Repita o exercício com os dados fictícios. Confira a entrega antes de usar no seu negócio.",
          "exercicio": {
            "situacao": "Use uma planilha real sua: vendas por produto ou mês, contas a pagar ou controle de estoque.",
            "tarefa": [
              "Abra a planilha no Gemini e explique as colunas, os períodos e o que cada número significa.",
              "Peça a comparação que orienta a decisão: [[o que vende mais, o que atrasa ou o que mais pesa no caixa]].",
              "Confira um cálculo manualmente e anote a decisão que a resposta sugere."
            ],
            "entrega": "Um padrão dos seus próprios números, com uma decisão a tomar."
          },
          "esperado": [
            "Uma comparação de vendas e estoque sem confundir receita, caixa e lucro."
          ],
          "confira": [
            "Conferi colunas, seis registros e o estoque não informado em branco",
            "Validei um percentual vendido e um saldo esperado manualmente",
            "Conferi o gráfico e registrei o que falta para analisar estoque e caixa"
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
          "nomePrompt": "Imagem para o Instagram da minha loja",
          "prompt": "# Perfil\nAtue como fotógrafo de produtos para pequenos negócios.\n# Contexto\nEste é um exercício didático fictício para o Instagram e o catálogo de uma pequena loja de artesanato de [[seu município]]. O produto imaginado é um cesto de fibra trançada, sem marca. Não represente uma peça como produção de artesão real nem atribua certificações ou origem comprovada. Não inclua dados pessoais.\n# Objetivo\nCrie uma imagem com aparência de fotografia de catálogo: um cesto centralizado sobre mesa clara, fundo neutro, luz natural suave pela esquerda e enquadramento a três quartos. Mostre a trama sem brilho artificial e sem objetos que confundam o que está à venda.\n# Modelo de Entrega\nUse proporção quadrada 1:1, com margem para recorte no Instagram. Não inclua pessoas, logotipos, selos ou texto na imagem. Não invente assinatura de artesão. O resultado será identificado como imagem gerada por IA. Antes de publicar, vou conferir forma, alças, textura e fidelidade ao produto real; não trate esta simulação como foto documental.",
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
          "texto": "Repita o exercício com os dados fictícios. Confira a entrega antes de usar no seu negócio.",
          "exercicio": {
            "situacao": "Escolha um produto real para fotografar melhor: [[um item que você mais vende]].",
            "tarefa": [
              "Peça a imagem com cena, luz e enquadramento, sem prometer o que o produto não é.",
              "Edite um detalhe e compare com a foto original do produto.",
              "Guarde a versão final para usar em [[WhatsApp, Instagram ou catálogo]]."
            ],
            "entrega": "Uma imagem do seu produto pronta para divulgar."
          },
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
