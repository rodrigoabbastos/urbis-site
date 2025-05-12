
/**
 * Utilitários para lidar com imagens externas e CORS
 */

/**
 * Verifica se uma URL de imagem externa está acessível
 * @param url URL da imagem a ser verificada
 * @returns Promise que resolve com true se a imagem estiver acessível
 */
export const checkImageURL = async (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    
    img.onload = () => {
      resolve(true);
    };
    
    img.onerror = () => {
      console.error(`Erro ao carregar imagem de ${url}. Possível problema de CORS.`);
      resolve(false);
    };
    
    // Configura a URL após definir os eventos
    img.src = url;
  });
};

/**
 * Tenta carregar uma imagem e retorna a URL original ou uma URL de fallback
 * @param url URL da imagem a ser carregada
 * @param fallbackUrl URL de fallback caso a imagem original não carregue
 * @returns URL da imagem (original ou fallback)
 */
export const getImageWithFallback = async (
  url: string, 
  fallbackUrl: string = '/placeholder.svg'
): Promise<string> => {
  if (!url) return fallbackUrl;
  
  // Verifica se é uma URL interna (começa com /)
  if (url.startsWith('/')) {
    return url;
  }
  
  // Verifica se a URL externa é acessível
  const isAccessible = await checkImageURL(url);
  return isAccessible ? url : fallbackUrl;
};

/**
 * Verifica se uma string é uma URL válida
 * @param url String a ser verificada
 * @returns true se for uma URL válida
 */
export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Instrução para configurar CORS no servidor Hostinger
 */
export const corsInstructions = `
Para permitir o carregamento de imagens do seu servidor Hostinger:

1. Crie um arquivo .htaccess na pasta de imagens com o seguinte conteúdo:

<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, OPTIONS"
    Header set Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept"
</IfModule>

2. Se o arquivo .htaccess não funcionar, peça ao suporte da Hostinger para habilitar 
   o módulo headers e permitir a configuração de CORS nos diretórios de imagens.
`;
