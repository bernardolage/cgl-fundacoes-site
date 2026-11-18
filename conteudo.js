/* ============================================================
   CONTEÚDO DO SITE — CGL FUNDAÇÕES
   ------------------------------------------------------------
   ESTE É O ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR PARA MUDAR
   TEXTOS, FOTOS, SERVIÇOS, OBRAS E DADOS DE CONTATO.

   Como editar:
   - Texto: troque o que está entre aspas. Mantenha as aspas.
   - Foto: troque o nome do arquivo OU substitua a imagem na
     pasta "imagens/" mantendo o mesmo nome.
   - Listas (serviços, obras): copie um bloco { ... } inteiro,
     cole logo abaixo e edite. Separe cada bloco com vírgula.

   Não apague vírgulas, chaves { } ou colchetes [ ].
   ============================================================ */

window.CONTEUDO = {

  /* ---------- IDENTIDADE ---------- */
  empresa: {
    nome: "CGL Fundações",
    desde: "1997",
    slogan: "Fundações profundas e contenções desde 1997",
  },

  /* ---------- MENU (ordem dos links) ---------- */
  menu: [
    { id: "inicio",       texto: "Início" },
    { id: "sobre",        texto: "A empresa" },
    { id: "servicos",     texto: "Serviços" },
    { id: "equipamentos", texto: "Equipamentos" },
    { id: "obras",        texto: "Obras" },
    { id: "contato",      texto: "Contato" },
  ],

  /* ---------- LINK PARA O SISTEMA (cabeçalho e rodapé) ---------- */
  sistema: { texto: "Acessar Sistema", url: "https://app.cglfundacoes.com.br" },

  /* ---------- SEÇÃO INÍCIO (HERO) ---------- */
  hero: {
    imagem: "imagens/hero.jpg",
    titulo: "Fundações que sustentam grandes obras",
    subtitulo: "Desde 1997 executando estacas hélice contínua, estaca raiz, estacas secantes e fundações especiais em todo o Brasil, com frota própria e equipe de engenheiros qualificados.",
    botaoPrimario: "Solicitar orçamento",
    botaoSecundario: "Conheça os serviços",
  },

  /* ---------- FAIXA DE NÚMEROS ---------- */
  numeros: [
    { valor: "1997", rotulo: "fundações desde" },
    { valor: "100%", rotulo: "frota de equipamentos própria" },
    { valor: "Ø1000", rotulo: "mm de diâmetro em hélice contínua" },
    { valor: "BR", rotulo: "obras em todo o território nacional" },
  ],

  /* ---------- SEÇÃO A EMPRESA ---------- */
  sobre: {
    imagem: "imagens/sobre.jpg",
    titulo: "Quem é a CGL Fundações",
    chamada: "Solidez técnica desde 1997",
    paragrafos: [
      "Sediada no Distrito Industrial de Itabira/MG, a CGL Fundações executa fundações especiais em todo o território brasileiro desde 1997, para obras industriais, de mineração, comerciais e residenciais de todos os portes.",
      "Contamos com infraestrutura completa de equipamentos próprios e equipe altamente qualificada, oferecendo liberdade de opções técnicas e econômicas para cada situação de projeto.",
      "Todos os trabalhos são planejados e executados por uma experiente equipe de engenheiros e técnicos, que presta assessoria completa — da avaliação da economia dos recursos empregados à otimização do uso dos equipamentos.",
    ],
    valores: [
      { titulo: "Qualidade", texto: "Compromisso com a excelência técnica em cada serviço executado." },
      { titulo: "Prazo", texto: "Cumprimento rigoroso dos cronogramas acordados com o cliente." },
      { titulo: "Segurança", texto: "Promoção da segurança do trabalho e preservação do meio ambiente." },
    ],
  },

  /* ---------- SEÇÃO SERVIÇOS ----------
     icone: escolha entre  estaca | raiz | secante | parede | sondagem | terra | consultoria  */
  servicos: {
    titulo: "Nossos serviços",
    chamada: "Soluções completas em fundações e contenções",
    lista: [
      {
        icone: "estaca",
        nome: "Estaca Hélice Contínua Monitorada",
        descricao: "Fundação moldada in loco com trado contínuo e concreto injetado pela haste central. Execução monitorada por computador, sem vibração e possível com nível d'água. Diâmetros de Ø300 a Ø1000 mm.",
      },
      {
        icone: "raiz",
        nome: "Estaca Raiz",
        descricao: "Alto atrito lateral e equipamentos de pequeno porte para áreas restritas. Sem vibração nem descompressão do terreno, atravessa matacões, rocha e concreto. Diâmetros Ø250, Ø310 e Ø410 mm.",
      },
      {
        icone: "secante",
        nome: "Parede Diafragma com Estacas Secantes",
        descricao: "Contenção executada a seco com perfuratriz de cabeçote duplo (trado e revestimento girando em sentidos opostos), sem lama bentonítica, com baixo ruído e alta precisão de verticalidade.",
      },
      {
        icone: "sondagem",
        nome: "Escavadas com Trado Mecanizado",
        descricao: "Estaca moldada no solo, escavada com trado helicoidal acionado por perfuratriz montada sobre caminhão e concretada a partir da superfície. Diâmetros de Ø250 a Ø1500 mm.",
      },
      {
        icone: "parede",
        nome: "Estacas Cravadas Pré-moldadas e Metálicas",
        descricao: "Cravação por martelo hidráulico de estacas de concreto pré-moldado e perfis metálicos, com produtividade maior que a dos bate-estacas convencionais.",
      },
      {
        icone: "terra",
        nome: "Locação de Bombas de Concreto",
        descricao: "Bombas estacionárias Putzmeister e Schwing, de 57 a 90 m³/h, para obras e empresas.",
      },
    ],
  },

  /* ---------- SEÇÃO EQUIPAMENTOS ---------- */
  equipamentos: {
    titulo: "Estrutura e equipamentos",
    chamada: "Frota própria para atender qualquer projeto",
    texto: "A CGL Fundações dispõe de uma frota própria e diversificada de perfuratrizes e equipamentos de apoio, o que garante disponibilidade, agilidade e previsibilidade de prazo nas obras.",
    destaques: [
      { titulo: "Perfuratrizes de hélice contínua", texto: "CZM EM800 e EM800 Super sobre chassis Caterpillar, até 30 m de profundidade." },
      { titulo: "Perfuratrizes de estaca raiz", texto: "CZM CR14, CZM MC140 e CMV M20-10 sobre esteira, em Ø250, Ø310 e Ø410 mm." },
      { titulo: "Cabeçote duplo para secantes", texto: "CZM EM1000/32 sobre Caterpillar 336, em Ø420, Ø520 e Ø620 mm, até 19 m." },
      { titulo: "Caminhões perfuratriz", texto: "Trado mecanizado de Ø250 a Ø1500 mm, até 25 m de profundidade." },
      { titulo: "Cravação", texto: "Martelo hidráulico CZM EM 5000HH sobre Caterpillar 320D." },
      { titulo: "Bombas de concreto", texto: "Putzmeister TK70 e Schwing SP2000, de 57 a 90 m³/h." },
    ],
  },

  /* ---------- SEÇÃO OBRAS / PORTFÓLIO ----------
     Para adicionar uma obra: copie um bloco { ... }, cole abaixo e edite. */
  obras: {
    titulo: "Obras realizadas",
    chamada: "Projetos que comprovam nossa experiência",
    lista: [
      {
        imagem: "imagens/obra-1.jpg",
        nome: "MIP / Vale",
        local: "Minas Gerais",
        descricao: "Estaca hélice contínua monitorada: 1.891 m em Ø500 mm, 9.342 m em Ø800 mm e 2.197 m em Ø1000 mm.",
      },
      {
        imagem: "imagens/obra-2.jpg",
        nome: "Estádio Independência",
        local: "Belo Horizonte/MG",
        descricao: "Cerca de 22.000 metros de estaca hélice contínua monitorada, entre contenção e fundação, de Ø400 a Ø800 mm.",
      },
      {
        imagem: "imagens/obra-3.jpg",
        nome: "Mozark",
        local: "Minas Gerais",
        descricao: "8.066 m de estacas secantes Ø420 mm e 2.605 m de hélice contínua em Ø700 e Ø800 mm.",
      },
      {
        imagem: "imagens/obra-4.jpg",
        nome: "EcoMall",
        local: "São Paulo/SP",
        descricao: "567 estacas secantes de Ø420 mm com 10 metros para o shopping, cliente MV Construções.",
      },
      {
        imagem: "imagens/obra-5.jpg",
        nome: "Vale Verde / Vale",
        local: "Itabira/MG",
        descricao: "Cravação de estacas prancha para contenção do novo tanque de decantação de rejeitos no Complexo de Itabira (Mina Cauê).",
      },
    ],
  },

  /* ---------- SEÇÃO ORÇAMENTO ---------- */
  orcamento: {
    titulo: "Solicite seu orçamento",
    chamada: "Conte sobre sua obra e nossa equipe entra em contato",
    texto: "Preencha os dados abaixo. Quanto mais informações, mais preciso será o retorno da nossa equipe técnica.",
    servicosDisponiveis: [
      "Estaca Hélice Contínua",
      "Estaca Raiz",
      "Estaca Secante / Parede Diafragma",
      "Trado Mecanizado",
      "Estaca Pré-moldada ou Metálica",
      "Locação de Bomba de Concreto",
      "Ainda não sei / preciso de orientação",
    ],
    mensagemSucesso: "Recebemos sua solicitação! Nossa equipe comercial entrará em contato em breve.",
  },

  /* ---------- CONTATO ---------- */
  contato: {
    titulo: "Fale com a CGL Fundações",
    chamada: "Estamos prontos para atender sua obra",
    endereco: "Avenida Hematita, 562 — Distrito Industrial, Itabira/MG — CEP 35903-051",
    telefone: "(31) 3833-4100",
    celular: "(31) 97155-1620",
    whatsapp: "5531971551620",            // só números, com 55 na frente
    email: "orcamento@cglfundacoes.com.br",
    horario: "Segunda a sexta, 8h às 18h",
    // Link do mapa: abra o Google Maps no endereço e cole o link "Incorporar mapa".
    mapaIncorporar: "https://www.google.com/maps?q=Avenida+Hematita+562+Distrito+Industrial+Itabira+MG&output=embed",
  },

  /* ---------- RODAPÉ ---------- */
  rodape: {
    texto: "CGL Fundações — Engenharia de fundações desde 1997.",
    cnpj: "CNPJ 25.290.743/0001-74",
  },
};
