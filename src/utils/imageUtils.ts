
/**
 * Normaliza URLs de imagem para garantir formatação consistente
 * @param imageUrl URL da imagem a ser normalizada
 * @returns URL da imagem normalizada
 */
export const normalizeImageUrl = (imageUrl: string): string => {
  if (!imageUrl) return '';
  
  // Substitui barras invertidas por barras normais
  let normalizedUrl = imageUrl.replace(/\\/g, '/');
  
  // Verifica se é uma URL absoluta ou uma rota relativa a /lovable-uploads
  if (!normalizedUrl.startsWith('http') && 
      !normalizedUrl.startsWith('/') && 
      normalizedUrl.includes('lovable-uploads')) {
    normalizedUrl = `/${normalizedUrl}`;
  }
  
  // Para favicons e outros recursos estáticos, garantir que a URL esteja correta
  if (normalizedUrl.startsWith('/lovable-uploads')) {
    console.log(`Recurso do projeto detectado: ${normalizedUrl}`);
  }
  
  // Garante que as URL do projeto tenham o formato correto
  console.log(`Imagem normalizada: ${normalizedUrl}`);
  
  return normalizedUrl;
};

/**
 * Verifica se uma URL é um recurso local do projeto
 * @param url URL a ser verificada
 * @returns boolean indicando se é um recurso local
 */
export const isLocalResource = (url: string): boolean => {
  if (!url) return false;
  return url.includes('lovable-uploads') || url.startsWith('/public/');
};
