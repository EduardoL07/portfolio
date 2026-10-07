// Conteúdo geral do site. Edite aqui textos, links e as palavras do efeito de digitação.

export const site = {
  name: 'Eduardo Lessa',
  title: 'Eduardo Lessa — UI/UX & Product Designer',
  description:
    'Product Designer com 4 anos de experiência desenhando produtos digitais de ponta a ponta, do discovery à entrega.',
  location: 'São Paulo, Brasil',
  focus: 'Product Designer · UX · UI',
  available: 'Disponível para novos projetos',
};

export const links = {
  email: 'mailto:edu177243@gmail.com',
  whatsapp:
    'https://wa.me/5511912055898?text=Ol%C3%A1%20Edu.%20Estava%20vendo%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20fazer%20um%20servi%C3%A7o%2C%20podemos%20conversar%20melhor%20%3F',
  linkedin: 'https://www.linkedin.com/in/eduardo-lessa-728942265',
  behance: 'https://www.behance.net/edulessa',
  // Destino do botão "Ver portfólio ↗" abaixo dos cases
  portfolio: 'https://www.behance.net/edulessa',
  cv: '/Eduardo_Lessa_Curriculo_UIUX.pdf',
};

export const nav = [
  { label: 'Cases', href: '/#cases' },
  { label: 'Sobre', href: '/#sobre' },
  { label: 'Experiência', href: '/#experiencia' },
  { label: 'Contato', href: '#contato' },
];

export const hero = {
  lead: 'UI/UX & Product Designer. Transformo problemas complexos em produtos',
  // A primeira frase é a que aparece ao carregar; as demais entram no efeito de digitação.
  typed: ['simples e úteis.', 'fáceis de usar.', 'que dão resultado.'],
  intro:
    '4 anos desenhando apps, sites e plataformas de ponta a ponta: pesquisa, protótipo no Figma, teste com usuários e entrega junto a PM e Engenharia.',
};

// Cases ainda sem página: aparecem na home depois dos publicados, com a capa animada no lugar da imagem.
export const upcomingCases = [
  {
    title: 'Zone',
    year: '2026',
    tags: ['SaaS', 'Product Designer'],
    summary:
      'Zone é uma plataforma de voz, chat e transmissão de tela para comunidades, criada com o objetivo de ser um hub fácil de usar no seu dia a dia. Interface e design system em construção.',
    // Frase digitada na capa do card
    typed: 'Em desenvolvimento...',
  },
];

export const about = {
  statementLead: 'Acredito que o bom design é o que',
  statementSerif: 'Traz Resultado',
  bio: 'Atuo no ciclo completo de design: pesquisa com usuários, definição de hipóteses, prototipação no Figma, testes de usabilidade e colaboração direta com PM e Engenharia para levar a solução ao ar. Também tenho domínio de desenvolvimento em Framer, o que me dá visão prática de viabilidade técnica e me aproxima do time de Eng na hora de discutir trade-offs.',
  principles: [
    { title: 'Pesquisa antes de pixel', text: 'Entendo o problema e as pessoas antes de abrir a primeira tela.' },
    { title: 'Sistema, não tela', text: 'Tokens e componentes que mantêm o produto consistente ao crescer.' },
    { title: 'Validar cedo', text: 'Protótipo na mão do usuário o quanto antes, para errar barato.' },
  ],
};

export const experiences = [
  {
    period: '2022 — 2024',
    role: 'UI/UX Designer',
    text: 'Howl · Responsável pelo design end-to-end de produtos digitais sites, apps e plataformas',
  },
  {
    period: '2024 — 2025',
    role: 'Product Designer',
    text: 'Cliver · Liderei projetos de UI/UX de ponta a ponta para produtos digitais, da pesquisa inicial ao design final',
  },
];

// Cursos, na mesma lista da experiência
export const education = [
  { period: '2025 — atual', role: 'UI/UX Designer', text: 'Design Circuit · Curso de UI/UX' },
  { period: '2025 — atual', role: 'UX Designer', text: 'Ebac · Curso de UX Design' },
  { period: '2024', role: 'Framer Expert', text: 'Framer Skills · Curso Framer Expert' },
];

export const cta = {
  lead: 'Tem um projeto em mente?',
  typed: ['Vamos conversar.', 'Vamos criar juntos.'],
};
