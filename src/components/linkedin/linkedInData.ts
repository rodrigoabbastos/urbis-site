
import { LinkedInPost } from './types';

// Real content from Urbis LinkedIn profile (https://www.linkedin.com/company/urbis-inteligencia)
export const urbisLinkedInPosts: LinkedInPost[] = [
  {
    id: '1',
    text_snippet: 'Mais de 8.000 lotes aprovados. Mais de 1.000 hectares de área estudada para futuros empreendimentos. Fazendo história com as melhores práticas de aprovação e trazendo soluções para o mercado imobiliário.',
    image_url: '/images/projects/project1.jpg',
    post_url: 'https://www.linkedin.com/company/urbis-inteligencia/posts/',
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
];
