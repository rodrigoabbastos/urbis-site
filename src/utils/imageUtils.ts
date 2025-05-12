
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
  
  // Garante que as URL do projeto tenham o formato correto
  console.log(`Imagem normalizada: ${normalizedUrl}`);
  
  return normalizedUrl;
};
