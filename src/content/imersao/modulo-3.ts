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
          "nomePrompt": "Concorrentes e ideias para o meu negócio",
          "prompt": "# Perfil\nAtue como apoio ao dono de um(a) [[seu ramo e tipo de negócio]] na pesquisa de mercado.\n\n# Contexto\nEstou realizando uma pesquisa de mercado para o meu negócio localizado em [[seu bairro e município]]. Quero conhecer concorrentes, preços e ideias de produtos ou serviços antes de investir. Use apenas fontes públicas, sem dados pessoais de clientes ou funcionários (não utilize CPF, dados bancários ou informações sob sigilo).\n\n# Objetivo\nPesquise ofertas e preços públicos de concorrentes do meu segmento na região e proponha até três ideias de produtos ou serviços para testar. Compare tamanho, unidade, data do preço e condições de venda; não compare unidades de medida incomparáveis. Considere custos, validade, estoque e capacidade de produção ou atendimento. Cruze fontes independentes. Não trate uma postagem em rede social como prova de demanda nem dados estaduais como procura real no bairro.\n\n# Modelo de Entrega\nProponha primeiro um plano de pesquisa. No relatório, entregue resumo e matriz com ideia de produto ou serviço, público, concorrente ou oferta de referência, preço e unidade, fonte e data, obstáculo e teste de baixo custo. Não invente empresas, preços, estatísticas ou entrevistas. Marque dados ausentes como “não localizado” e inferências como hipóteses. Separe os dados públicos encontrados das estimativas e hipóteses. Indique o que devo conferir diretamente no mercado local antes de comprar insumos ou mudar meus preços.",
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
          "texto": "Repita o exercício com os dados reais do seu negócio, sem incluir dados pessoais de clientes. Confira a entrega antes de aplicar no seu dia a dia.",
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
      "materiais": [
        {
          "nome": "Fonte 1 · Metas do mês e regras da loja",
          "url": "/materiais/fonte-1-metas-e-regras.txt",
          "formato": "Documento TXT",
          "descricao": "Documento com metas de vendas, tabela de preços e regras de atendimento/troca para subir no Notebook."
        },
        {
          "nome": "Fonte 2 · Resultados realizados no mês",
          "url": "/materiais/fonte-2-resultados-do-mes.txt",
          "formato": "Documento TXT",
          "descricao": "Relatório de fechamento com vendas reais, posts publicados e pendências para confrontar com a Fonte 1."
        }
      ],
      "passos": [
        {
          "tipo": "tela",
          "tela": "notebook",
          "rotulo": "Na ferramenta",
          "titulo": "Reúna plano e resultados",
          "tituloEnfase": "plano e resultados",
          "texto": "Abra Notebooks e adicione as duas fontes com dados reais da sua empresa do próximo passo em documentos separados. Confira a lista de fontes; não envie dados pessoais de clientes ou arquivos sem autorização.",
          "arquivos": [
            {
              "nome": "Fonte 1 · Metas e regras da loja",
              "url": "/materiais/fonte-1-metas-e-regras.txt",
              "formato": "Documento TXT",
              "descricao": "Baixe e adicione como primeira fonte no seu Notebook."
            },
            {
              "nome": "Fonte 2 · Resultados realizados",
              "url": "/materiais/fonte-2-resultados-do-mes.txt",
              "formato": "Documento TXT",
              "descricao": "Baixe e adicione como segunda fonte para testar as citações."
            }
          ]
        },
        {
          "tipo": "prompt",
          "rotulo": "Consultar fontes",
          "titulo": "Confronte plano e execução",
          "tituloEnfase": "plano e execução",
          "nomePrompt": "Plano e histórico de vendas do seu negócio",
          "prompt": "# Perfil\nAtue como apoio ao dono de uma micro ou pequena empresa na revisão de metas e resultados do negócio.\n\n# Contexto\nConsulte apenas as fontes abaixo no notebook, utilizando os dados reais da sua empresa. Não inclua CPF, dados bancários ou dados pessoais de clientes e funcionários.\nFonte 1 — Metas planejadas para o período: [[cole aqui as metas do mês ou período, ex.: volume de vendas por produto/serviço, ações de marketing previstas, meta de avaliação/satisfação e metas financeiras]].\nFonte 2 — Resultados realizados no período: [[cole aqui os resultados obtidos no mesmo período, ex.: quantidade vendida, ações de divulgação executadas, média de avaliações recebidas e status do fechamento de custos, despesas e lucro]].\n\n# Objetivo\nCompare metas e resultados. Não trate produtos ou serviços vendidos como clientes únicos nem satisfação como lucro. Não atribua as vendas a ações de divulgação sem evidência concreta. Não invente dados ausentes.\n\n# Modelo de Entrega\nEntregue uma tabela com meta, resultado, situação e citação da fonte correspondente.\nSepare fato, interpretação e lacuna.\nSugira uma verificação prática para o próximo fechamento do mês.\nSe a fonte não permitir responder a algum ponto, declare isso explicitamente. Vou abrir cada citação para conferir os trechos.",
          "recebe": {
            "titulo": "Exemplo de leitura com dados reais do seu negócio (sem dados pessoais de clientes)",
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
          "tipo": "prompt",
          "rotulo": "Treinar equipe",
          "titulo": "Transforme regras em guia de integração",
          "tituloEnfase": "em guia de integração",
          "texto": "Notebooks também servem para criar a base de conhecimento da loja: suba tabela de preços, política de trocas e rotina de atendimento para gerar um manual de balcão e FAQ com citações.",
          "nomePrompt": "Manual de integração e FAQ da equipe",
          "prompt": "# Perfil\nAtue como organizador de treinamento operacional para pequenos negócios.\n\n# Contexto\nAdicionei no notebook os documentos internos do meu negócio de [[seu ramo de atuação]]:\n- Fonte 1 — Catálogo/Tabela de produtos, serviços e preços: [[resuma ou cole as regras de produtos, prazos e garantias]]\n- Fonte 2 — Regras de atendimento, trocas e abertura/fechamento: [[resuma ou cole os procedimentos da loja]]\nNão há dados pessoais de clientes ou funcionários nas fontes.\n\n# Objetivo\nCrie um Guia Rápido de Integração para novos funcionários e um FAQ de Balcão (10 dúvidas mais comuns dos clientes com a resposta exata baseada nos documentos). Não invente descontos, prazos de garantia ou políticas que não estejam escritos nas fontes.\n\n# Modelo de Entrega\n1. Checklist do 1º dia de trabalho (abertura, atendimento e fechamento) com citação da fonte.\n2. FAQ de Balcão: Pergunta do cliente | Resposta padrão recomendada | Fonte citada.\n3. Pontos em aberto: situações comuns do dia a dia que ainda não estão documentadas nas fontes ([A DEFINIR PELO DONO]).",
          "observe": [
            "Cada resposta do FAQ aponta para um trecho real das normas da empresa?",
            "Situações não previstas nas regras aparecem como [A DEFINIR PELO DONO] em vez de regras inventadas?",
            "O guia pode ser exportado ou transformado em Resumo em Áudio no Notebook para treinar a equipe?"
          ],
          "dica": "Use também o recurso de Resumo em Áudio do Notebook para que novos colaboradores ouçam as regras da loja durante o treinamento."
        },
        {
          "tipo": "resultado",
          "rotulo": "Faça na sua conta",
          "titulo": "Agora faça na sua conta",
          "tituloEnfase": "na sua conta",
          "texto": "Repita o exercício com os dados reais da sua empresa, sem incluir dados pessoais de clientes. Confira a entrega antes de aplicar no seu negócio.",
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
            "Adicionei as duas fontes com dados reais do meu negócio e fiz a pergunta",
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
      "objetivo": "Transformar informações do negócio em materiais editáveis e criar calculadoras interativas de gestão sem programar.",
      "voceSaiCom": "Um material comercial revisado e uma calculadora interativa de preço e margem no Canvas.",
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
          "nomePrompt": "Catálogo e post do meu negócio",
          "prompt": "# Perfil\nAtue como redator de cardápios e posts promocionais para pequenos negócios.\n# Contexto\nEstes são os dados reais da oferta do meu negócio em [[seu município]]:\n- Itens e preços: [[liste aqui os produtos, tamanhos/porções e valores individuais e/ou do combo]]\n- Regras e validade: [[informe dias, horários e condições, ex.: apenas retirada no balcão ou delivery]]\nAtenção: Não inclua CPF, dados bancários ou dados pessoais de clientes. Baseie-se apenas nas informações fornecidas.\n# Objetivo\nCrie no Canvas uma página editável com um cardápio curto da oferta e uma legenda de post para o Instagram. Use somente os dados fornecidos acima. Não invente ingredientes, adicionais, disponibilidade, benefícios de saúde ou promessas de venda não mencionadas.\n# Modelo de Entrega\nOrganize a resposta com:\n1. Título atrativo\n2. Cardápio enxuto com produtos, tamanhos/porções e preços informados\n3. Condições e regras da oferta\n4. Legenda para Instagram (com chamada para ação)\n5. Checklist rápido de conferência\nMarque qualquer informação que precise de confirmação operacional como pendente de conferência. Use linguagem simples, direta e até 350 palavras. Termine perguntando se preços, estoque e horários foram conferidos antes da publicação.",
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
          "prompt": "# Perfil\nAtue como editor de linguagem simples.\n\n# Contexto\nNo Canvas, selecionei [[o texto do post ou aviso da sua empresa]]. Minha oferta e regras reais são: [[descreva seus produtos/serviços, preços, tamanhos e condições de retirada, entrega ou horário]]. [[Informe pendências, se houver, ex.: estoque diário não confirmado]]. Não inclua CPF, dados bancários ou dados pessoais de clientes.\n\n# Objetivo\nReescreva apenas a seleção para os clientes do meu negócio. Preserve produtos, preços, tamanhos informados e condições reais da oferta. Não altere o restante do documento nem inclua dados novos ou informações não fornecidas.\n\n# Modelo de Entrega\nSubstitua o trecho por até três frases curtas, sem jargão. Não anuncie entrega, disponibilidade garantida ou itens não informados. Preserve eventuais avisos ou pendências indicadas (como confirmação de estoque). Se houver ambiguidade, sinalize-a em vez de completar com suposição. Explique na conversa o que mudou e o que foi preservado para que eu compare com a versão anterior.",
          "dica": "Selecione o trecho antes de enviar. Compare o documento inteiro após a edição; não presuma que só a seleção mudou."
        },
        {
          "tipo": "prompt",
          "rotulo": "Criar calculadora",
          "titulo": "Crie uma calculadora de preço no Canvas",
          "tituloEnfase": "de preço no Canvas",
          "texto": "O Canvas também gera mini-aplicativos interativos sem exigir programação. Peça um simulador visual para testar preços de venda, taxas de maquininha e descontos no balcão.",
          "nomePrompt": "Simulador interativo de precificação e taxas",
          "prompt": "# Perfil\nAtue como desenvolvedor de ferramentas visuais de gestão para pequenos negócios no Gemini Canvas.\n\n# Contexto\nTenho uma empresa de [[seu segmento]] e preciso de uma calculadora interativa em tela única (HTML/JS visual no Canvas) para simular rapidamente o preço de venda e a margem real dos meus produtos ou serviços antes de dar um desconto.\nValores padrão iniciais do meu negócio: imposto de [[alíquota %, ex.: 6%]], taxa de PIX [[%, ex.: 0%]], débito [[%, ex.: 1,5%]], crédito à vista [[%, ex.: 3,2%]] e crédito parcelado [[%, ex.: 9,5%]].\n\n# Objetivo\nConstrua no Canvas um aplicativo interativo onde eu possa digitar: Custo Direto do Produto/Serviço (R$), Embalagem/Frete (R$), Comissão (%), Imposto (%), Taxa da Maquininha (%) e Margem Líquida Desejada (%) ou Preço de Venda Praticado (R$).\n\n# Modelo de Entrega\nEntregue o simulador visual funcionando em português (R$) com:\n1. Campos de entrada claros e botões rápidos para alternar entre PIX, Débito, Crédito 1x e Parcelado.\n2. Painel de resultado em destaque mostrando: Preço de Venda Sugerido (R$), Lucro Líquido em R$ por unidade, Margem de Contribuição (%) e Markup equivalente.\n3. Alerta visual em vermelho sempre que a margem líquida ficar abaixo de [[margem mínima, ex.: 15%]] ou der prejuízo.\n4. Explicação visível da fórmula: Preço = Custo Total / (1 - Soma dos % de Imposto, Taxa, Comissão e Margem).",
          "observe": [
            "A calculadora abre no painel visual do Canvas pronta para digitar valores?",
            "Usa a fórmula correta por dentro (divisão por 1 - taxas) em vez de apenas somar percentuais sobre o custo?",
            "Destaca em vermelho quando o desconto ou parcelamento corrói a margem mínima?"
          ],
          "dica": "Clique em Visualizar/Preview no topo do Canvas para usar a calculadora interativa em tela cheia."
        },
        {
          "tipo": "resultado",
          "rotulo": "Faça na sua conta",
          "titulo": "Agora faça na sua conta",
          "tituloEnfase": "na sua conta",
          "texto": "Repita o exercício com os dados reais da sua empresa, sem incluir dados pessoais de clientes. Confira a entrega antes de aplicar no seu negócio.",
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
      "materiais": [
        {
          "nome": "Planilha de Vendas e Giro de Estoque",
          "url": "/materiais/controle-vendas-estoque-planilha.csv",
          "formato": "Planilha CSV",
          "descricao": "Contém os 6 registros de Maio/Junho prontos para importar no Google Planilhas + tabela limpa para sua empresa."
        }
      ],
      "passos": [
        {
          "tipo": "tela",
          "tela": "sheets",
          "rotulo": "Na ferramenta",
          "titulo": "Prepare a base de análise",
          "tituloEnfase": "a base de análise",
          "texto": "Abra uma planilha e o painel do Gemini. Cole a tabela com os dados reais do seu negócio em colunas separadas (sem incluir dados pessoais de clientes); confirme os tipos numéricos e deixe o estoque final não informado em branco.",
          "arquivos": [
            {
              "nome": "Planilha de Vendas e Giro de Estoque",
              "url": "/materiais/controle-vendas-estoque-planilha.csv",
              "formato": "Planilha CSV",
              "descricao": "Baixe e abra no Google Planilhas (Arquivo → Importar) para acompanhar a aula passo a passo."
            }
          ]
        },
        {
          "tipo": "prompt",
          "rotulo": "Analisar base",
          "titulo": "Compare vendas e estoque",
          "tituloEnfase": "vendas e estoque",
          "nomePrompt": "Base de vendas reais do seu negócio (sem dados pessoais de clientes)",
          "prompt": "# Perfil\nAtue como especialista em controle de vendas e estoque para o dono de uma micro ou pequena empresa do ramo de [[seu ramo de atuação]].\n\n# Contexto\nAbaixo estão os dados reais do meu negócio, agregados por produto e período, sem conter nomes de clientes, CPF, dados bancários ou outras informações pessoais. \n\n[[Cole aqui a sua tabela ou os dados das suas vendas e estoque no formato: Produto | Mês | Unidades disponíveis no mês | Unidades vendidas | Receita de vendas (R$) | Estoque final (unidades)]]\n\n# Objetivo\nCompare as vendas por produto e mês, o percentual vendido e o estoque final. Trate as unidades disponíveis como estoque inicial somado às entradas do mês. Não confunda receita com lucro nem com saldo de caixa (já que faltam custos, despesas, prazos de recebimento e pagamentos). Apenas analise os números fornecidos, sem inventar justificativas ou motivos não informados para as variações.\n\n# Modelo de Entrega\nEntregue:\n1. Tabela com as taxas de venda e giro por produto e período.\n2. Três achados principais baseados estritamente nos números.\n3. Duas hipóteses práticas a verificar na operação.\n\nRegras:\n- Não transforme dados de estoque ausentes ou em branco em zero.\n- Se calcular um saldo esperado de estoque, identifique-o explicitamente como \"cálculo teórico a conferir na contagem física\", e não como estoque registrado.\n- Separe com clareza fatos (números) de sugestões de ação.\n- Aponte os valores ou linhas de referência para que eu possa auditar os cálculos.",
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
          "tipo": "comparacao",
          "rotulo": "Markup vs. Margem",
          "titulo": "Não confunda markup com margem real",
          "tituloEnfase": "com margem real",
          "texto": "Um dos erros mais caros na gestão de pequenos negócios é dobrar o custo achando que terá 100% de lucro. Veja a diferença antes de calcular na planilha.",
          "colunas": [
            "Conta intuitiva (perigosa)",
            "Conta auditada no Gemini"
          ],
          "linhas": [
            [
              "“Comprei por R$ 50 e vendo por R$ 100: ganho 100% de lucro.”",
              "Markup de 2x gera R$ 50 de margem bruta (50% sobre o preço de venda), antes de descontar impostos e taxas."
            ],
            [
              "“Posso dar 20% de desconto no cartão parcelado sem problema.”",
              "R$ 80 menos 12% de parcelamento (R$ 9,60), 6% de imposto (R$ 4,80) e R$ 50 de custo deixa só R$ 15,60 (19,5%) para pagar todo o custo fixo."
            ],
            [
              "“O produto que mais vende é o que mais dá dinheiro.”",
              "Item de alto giro com margem negativa ou corroída por frete/embalagem drena o caixa quanto mais vende."
            ],
            [
              "“Vendi R$ 30 mil no mês, então o caixa está positivo.”",
              "Se você vendeu em 4x sem antecipar e precisa pagar o fornecedor em 15 dias, falta capital de giro no meio do mês."
            ]
          ],
          "frase": "Peça sempre ao Gemini para descontar imposto, taxa de maquininha, frete e perda antes de mostrar a margem de contribuição."
        },
        {
          "tipo": "prompt",
          "rotulo": "Visualizar",
          "titulo": "Crie taxas e um gráfico",
          "tituloEnfase": "taxas e um gráfico",
          "nomePrompt": "Fórmula e gráfico conferíveis",
          "prompt": "# Perfil\nAtue como apoio no Google Planilhas.\n# Contexto\nUso a planilha de controle de vendas e estoque do meu negócio no intervalo [[intervalo da sua planilha, ex.: A1:F20]]. A coluna A contém produto, B mês, C unidades disponíveis, D unidades vendidas, E receita de vendas em reais e F estoque final registrado. Não inclua CPF, dados bancários ou dados pessoais de clientes.\n# Objetivo\nCrie na coluna G o percentual vendido (D dividido por C) e na coluna H o saldo esperado em unidades (C menos D). Formate como percentual em G e número de unidades em H. Trate denominador zero como informação ausente, não como taxa zero. Não preencha F com o cálculo de H: o estoque registrado depende de conferência física.\n# Modelo de Entrega\nMostre as fórmulas da linha 2 adequadas à localidade da planilha (padrão Brasil) e explique como preencher até a linha [[última linha da sua tabela]]. Crie um gráfico de colunas com produtos no eixo de categorias, unidades vendidas no eixo numérico e uma série para cada mês. Não misture reais, unidades e percentuais no mesmo eixo. Se não puder inserir o gráfico diretamente, forneça o passo a passo manual para criá-lo no Google Planilhas. Indique os intervalos usados e mostre como conferir o resultado esperado para a primeira linha de produto. Não invente causas para as diferenças de estoque.",
          "dica": "Confira uma divisão manualmente. Dê ao gráfico o título “Unidades vendidas por produto e mês” utilizando os dados reais do seu negócio (sem incluir dados pessoais de clientes)."
        },
        {
          "tipo": "resultado",
          "rotulo": "Faça na sua conta",
          "titulo": "Agora faça na sua conta",
          "tituloEnfase": "na sua conta",
          "texto": "Repita o exercício utilizando os dados reais da sua empresa, sem incluir dados pessoais de clientes. Confira a entrega antes de aplicar no seu negócio.",
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
          "titulo": "Fotografe um produto do seu próprio negócio",
          "tituloEnfase": "um produto do seu negócio",
          "nomePrompt": "Imagem para o Instagram da minha loja",
          "prompt": "# Perfil\nAtue como fotógrafo de produtos para pequenos negócios.\n\n# Contexto\nPreciso de uma imagem para o Instagram e catálogo do meu negócio em [[seu município]]. O produto a ser apresentado é [[descreva seu produto, ex.: cesto de fibra trançada]]. Não inclua dados pessoais, dados bancários ou marcas de terceiros.\n\n# Objetivo\nCrie uma imagem com aparência de fotografia de catálogo profissional: [[descreva a posição do produto e cenário, ex.: produto centralizado sobre mesa clara, fundo neutro, luz natural suave pela esquerda e enquadramento a três quartos]]. Mostre a textura e o acabamento da peça sem brilho artificial e sem objetos que confundam o que está à venda.\n\n# Modelo de Entrega\nUse proporção quadrada 1:1, com margem para recorte no Instagram. Não inclua pessoas, logotipos, selos ou texto na imagem. A composição deve priorizar fidelidade de formato, acabamento e textura para representar visualmente o produto real à venda.",
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
          "prompt": "# Perfil\nAtue como editor de fotografia de produto.\n# Contexto\nVou anexar [[foto própria do seu produto]], sem pessoas, dados pessoais ou marcas de terceiros. A peça real da foto é a referência; não acrescente características de outro produto.\n# Objetivo\nTroque apenas o fundo por [[tipo de fundo desejado, ex.: superfície bege neutra]] e suavize sombras fortes. Preserve cor, textura, dimensões aparentes e características reais da peça. Não esconda defeitos relevantes para a compra.\n# Modelo de Entrega\nEntregue uma versão quadrada com margem de segurança, sem texto, logotipo ou selo. Não crie acessórios nem remova partes do produto. Se não conseguir preservar um detalhe, avise em vez de reconstruí-lo silenciosamente. Vou comparar a edição com a foto original antes de usar. Mantenha a identificação de conteúdo gerado ou editado por IA e não solicite remover mecanismos de procedência.",
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
          "texto": "Repita o exercício com os dados reais do seu negócio, sem incluir dados pessoais de clientes. Confira a entrega antes de aplicar na sua rotina.",
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
