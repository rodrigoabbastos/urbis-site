
import { SiteContent } from './types';

// Default content (based on current site)
export const defaultContent: SiteContent = {
  hero: {
    title: "Não gaste um real sequer antes de falar com a URBIS.",
    subtitle: "Somos o melhor investimento para o seu empreendimento imobiliário. Unimos experiência, conhecimento, inteligência e estratégia para transformar sua idéia em um grande negócio.",
    ctaText: "Fale com um especialista",
    ctaLink: "#contact",
    backgroundImage: "https://cdn.midjourney.com/8071897a-b5ac-4953-a3b8-b4a29bd2a053/0_0.png"
  },
  about: {
    title: "Quem somos",
    description: [
      "A URBIS é uma consultoria especializada na estruturação de empreendimentos urbanos com inteligência técnica, visão estratégica e agilidade. Atuamos desde o estudo de viabilidade até a aprovação e implantação, transformando terrenos em projetos viáveis, valorizados e legalmente seguros.",
      "Com experiência consolidada, integrando áreas como urbanismo, meio ambiente, infraestrutura e legislação, a URBIS é o parceiro ideal para destravar terrenos e criar valor duradouro para loteadores, investidores e incorporadores."
    ],
    features: [
      "Inteligência técnica e visão estratégica",
      "Expertise em urbanismo e meio ambiente",
      "Conhecimento profundo em legislação",
      "Agilidade nos processos de aprovação",
      "Foco em valorização do empreendimento",
      "Suporte completo do estudo à implantação"
    ],
    image: "https://urbis.com.br/wp-content/uploads/2023/08/infografico_ppt-02-1.png"
  },
  services: [
    {
      id: "1",
      icon: "FileSearch",
      title: "Estudos de Viabilidade Urbanística e Ambiental",
      description: "Identificamos oportunidades, riscos e diretrizes técnicas para transformar terrenos em ativos rentáveis.",
      detailedDescription: "Nossa equipe realiza estudos técnicos completos que avaliam potencialidades, restrições ambientais, viabilidade econômica e conformidade legal. Isso permite decisões de investimento embasadas e redução de riscos no desenvolvimento do seu empreendimento."
    },
    {
      id: "2",
      icon: "Building2",
      title: "Projetos Urbanísticos e de Infraestrutura",
      description: "Desenvolvemos projetos alinhados às normas e à topografia, otimizando o aproveitamento do terreno.",
      detailedDescription: "Elaboramos projetos que maximizam o aproveitamento da área, respeitando as características topográficas e ambientais. Nossos projetos contemplam soluções técnicas que reduzem custos de implantação e valorizam cada lote do empreendimento."
    },
    {
      id: "3",
      icon: "FileCheck",
      title: "Licenciamento Ambiental e Urbanístico",
      description: "Gerenciamos todo o processo de licenciamento junto aos órgãos competentes, garantindo agilidade e conformidade.",
      detailedDescription: "Conduzimos o processo completo de licenciamento, incluindo estudos técnicos, análises de impacto ambiental e urbanístico, e representação junto aos órgãos reguladores. Nossa experiência permite destravar processos e obter aprovações com maior rapidez."
    },
    {
      id: "4",
      icon: "FileLock",
      title: "Regularização Fundiária e Legal",
      description: "Apoiamos empreendimentos na adequação jurídica e documental, com foco na segurança e viabilidade comercial.",
      detailedDescription: "Realizamos a análise completa da situação fundiária, resolvemos pendências documentais e implementamos estratégias de regularização que proporcionam segurança jurídica para o empreendimento e seus futuros compradores."
    },
    {
      id: "5",
      icon: "Building",
      title: "Compatibilização com Órgãos Públicos",
      description: "Facilitamos a aprovação do projeto junto a prefeituras, concessionárias e demais entes reguladores.",
      detailedDescription: "Nossa equipe possui ampla experiência em negociação com órgãos públicos e conhecimento dos processos técnicos e burocráticos de aprovação. Isso permite antecipar exigências, reduzir tempo de análise e maximizar as chances de aprovação rápida do seu projeto."
    },
    {
      id: "6",
      icon: "LineChart",
      title: "Consultoria Estratégica para Loteamentos e Condomínios",
      description: "Oferecemos inteligência técnica e visão de mercado para viabilizar e valorizar loteamentos e condomínios.",
      detailedDescription: "Combinamos conhecimento técnico com visão de mercado para orientar decisões estratégicas do empreendimento, desde a concepção até a comercialização. Avaliamos tendências, oportunidades e riscos para maximizar o retorno sobre o investimento."
    }
  ],
  methodology: {
    title: "Como trabalhamos",
    description: "Nosso método combina técnica, visão estratégica e agilidade. Veja como estruturamos o caminho do seu empreendimento:",
    steps: [
      {
        id: "1",
        icon: "Search",
        title: "Análise Inicial do Terreno",
        description: "Levantamos dados físicos, legais e ambientais para identificar restrições e potencial de uso."
      },
      {
        id: "2",
        icon: "FileSearch",
        title: "Estudo de Viabilidade",
        description: "Simulamos cenários e apresentamos soluções otimizadas com base na legislação e mercado."
      },
      {
        id: "3",
        icon: "FileCheck",
        title: "Projeto e Licenciamento",
        description: "Elaboramos o projeto urbanístico, infraestrutura e conduzimos os licenciamentos necessários."
      },
      {
        id: "4",
        icon: "Shield",
        title: "Compatibilização e Aprovação",
        description: "Acompanhamos o processo junto aos órgãos até a aprovação completa."
      },
      {
        id: "5",
        icon: "Construction",
        title: "Suporte à Implantação",
        description: "Prestamos apoio técnico e estratégico até a execução do empreendimento."
      }
    ]
  },
  projects: {
    title: "Projetos em destaque",
    description: "Conheça alguns empreendimentos em que aplicamos nossa metodologia, viabilizando projetos de forma estratégica, técnica e segura.",
    items: [
      {
        id: "1",
        image: "https://images.unsplash.com/photo-1542889601-399c4f3a8402?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        title: "Residencial Parque das Águas",
        description: "Loteamento com completa infraestrutura, áreas de lazer e preservação ambiental. Projeto aprovado em tempo recorde com otimização do uso do solo.",
        client: "Incorporadora XYZ",
        year: "2023",
        type: "urban"
      },
      {
        id: "2",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        title: "Condomínio Vale Verde",
        description: "Condomínio horizontal de alto padrão com solução inovadora para preservação ambiental e aproveitamento da topografia natural.",
        client: "Construtora ABC",
        year: "2022",
        type: "urban"
      },
      {
        id: "3",
        image: "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1746&q=80",
        title: "Smart City Jardins",
        description: "Projeto urbano com infraestrutura tecnológica integrada, soluções sustentáveis e planejamento para crescimento ordenado.",
        client: "Prefeitura Municipal",
        year: "2023",
        type: "smart"
      },
      {
        id: "4",
        image: "https://images.unsplash.com/photo-1549877452-9c68f96e42e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        title: "Eco Parque Industrial",
        description: "Área industrial com licenciamento ambiental completo e soluções para minimizar impactos ambientais enquanto maximiza eficiência logística.",
        client: "Associação Industrial",
        year: "2022",
        type: "smart"
      },
      {
        id: "5",
        image: "https://images.unsplash.com/photo-1511452885600-a3d2c9148a31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
        title: "Regularização Vila Nova",
        description: "Projeto de regularização fundiária que beneficiou mais de 500 famílias, incluindo toda documentação e adequação urbanística.",
        client: "Associação de Moradores",
        year: "2021",
        type: "urban"
      },
      {
        id: "6",
        image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80",
        title: "Centro Comercial Monteiro",
        description: "Complexo comercial com aprovação acelerada graças ao planejamento estratégico e acompanhamento especial junto aos órgãos reguladores.",
        client: "Grupo Investimentos",
        year: "2023",
        type: "urban"
      }
    ]
  },
  contact: {
    email: "contato@urbis.com.br",
    phone: "+55 51 3333-3333",
    whatsapp: "+5551999999999",
    address: "Av. Carlos Gomes, 1001, Sala 801, Porto Alegre - RS",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27629.333276641605!2d-51.20332761738281!3d-30.034064699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951979a41bcb2fef%3A0x5c12e4e0077fd9ff!2sAv.%20Carlos%20Gomes%2C%201001%20-%20Auxiliadora%2C%20Porto%20Alegre%20-%20RS%2C%2090480-004!5e0!3m2!1spt-BR!2sbr!4v1665510254489!5m2!1spt-BR!2sbr"
  },
  linkedInPosts: [
    {
      id: '1',
      text_snippet: 'Hoje o presidente da @urbisinteligencia, @rodrigoabb, esteve presente no 1o. Encontro de Desenvolvimento Imobiliário no SINDUSCON-RS. Um evento importante para discutir as oportunidades e desafios que este setor apresenta no Rio Grande do Sul.',
      image_url: '/images/projects/project1.jpg',
      post_url: 'https://www.linkedin.com/posts/rodrigoabb_desenvolvimentoimobiliaerrio-loteamentos-activity-7322577696763404288-fD4z',
      date: new Date(2024, 4, 1).toISOString(),
      likes: 75,
      comments: 12,
    },
    {
      id: '2',
      text_snippet: 'A URBIS é especialista em aprovação de loteamentos. Temos um histórico de sucesso em projetos complexos, com um método exclusivo que reduz prazos e maximiza resultados para nossos clientes.',
      post_url: 'https://www.linkedin.com/company/urbis-inteligencia/posts/',
      date: new Date(2024, 3, 20).toISOString(),
      likes: 63,
      comments: 8,
    },
    {
      id: '3',
      text_snippet: 'Somos referência em aprovação e viabilidade de empreendimentos imobiliários. Nossa equipe multidisciplinar garante que seu projeto tenha todas as aprovações necessárias, com segurança jurídica e eficiência técnica.',
      image_url: '/images/projects/project2.jpg',
      post_url: 'https://www.linkedin.com/company/urbis-inteligencia/posts/',
      date: new Date(2024, 3, 15).toISOString(),
      likes: 92,
      comments: 17,
    },
  ]
};
