
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
      console.log(`Imagem carregada com sucesso: ${url}`);
      resolve(true);
    };
    
    img.onerror = (error) => {
      console.error(`Erro ao carregar imagem de ${url}. Possível problema de CORS.`, error);
      console.error(`Verifique se a URL está correta e se o arquivo existe em ${new URL(url).origin}/`);
      
      // Verificar se o domínio é urbis.com.br
      if (url.includes('urbis.com.br')) {
        console.error(`
          Para imagens do domínio urbis.com.br:
          1. Verifique se a imagem existe no caminho correto (use / e não \\)
          2. Confirme que a imagem está na pasta pública do servidor (public_html ou www)
          3. Verifique as permissões do arquivo (deve ser 644)
        `);
      }
      
      resolve(false);
    };
    
    // Configura a URL após definir os eventos
    img.src = url;
  });
};

/**
 * Normaliza uma URL de imagem, substituindo barras invertidas por barras normais
 * @param url URL da imagem a ser normalizada
 * @returns URL normalizada
 */
export const normalizeImageUrl = (url: string): string => {
  if (!url) return '';
  // Substituir barras invertidas por barras normais
  return url.replace(/\\/g, '/');
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
  
  // Normaliza a URL (substitui \ por /)
  url = normalizeImageUrl(url);
  
  // Verifica se é uma URL interna (começa com /)
  if (url.startsWith('/')) {
    return url;
  }
  
  // Se a URL for de um servidor externo, como urbis.com.br
  if (isValidURL(url)) {
    console.log(`Tentando carregar imagem externa: ${url}`);
    // Verifica se a URL externa é acessível
    const isAccessible = await checkImageURL(url);
    
    if (!isAccessible) {
      console.warn(`A imagem ${url} não pôde ser carregada. Usando fallback.`);
      console.warn('É necessário configurar CORS no servidor de origem. Veja as instruções em corsInstructions.');
    }
    
    return isAccessible ? url : fallbackUrl;
  }
  
  return fallbackUrl;
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

1. Crie um arquivo .htaccess na pasta pública do seu site (public_html ou www) com o seguinte conteúdo:

# Arquivo .htaccess para permitir acesso CORS às imagens
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, OPTIONS" 
    Header set Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept"
</IfModule>

# Permitir acesso a tipos de imagens comuns
<FilesMatch "\\.(jpg|jpeg|png|gif|webp|svg)$">
    Order Allow,Deny
    Allow from all
</FilesMatch>

# Se o código acima não funcionar, você pode tentar a versão mais recente:
<FilesMatch "\\.(jpg|jpeg|png|gif|webp|svg)$">
    Require all granted
</FilesMatch>

2. Verifique se as permissões dos arquivos de imagem estão corretas:
   - Arquivos: 644 (rw-r--r--)
   - Pastas: 755 (rwxr-xr-x)

3. Se o arquivo .htaccess não funcionar, peça ao suporte da Hostinger para habilitar 
   o módulo headers e permitir a configuração de CORS nos diretórios de imagens.
`;

/**
 * Extrai o domínio de uma URL
 * @param url URL para extrair o domínio
 * @returns O domínio da URL
 */
export const extractDomain = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  } catch (e) {
    return '';
  }
};

/**
 * Verifica se uma URL é do mesmo domínio que o site atual
 * @param url URL para verificar
 * @returns true se a URL for do mesmo domínio
 */
export const isSameDomain = (url: string): boolean => {
  if (!url || !isValidURL(url)) return false;
  
  const urlDomain = extractDomain(url);
  const currentDomain = window.location.hostname;
  
  return urlDomain === currentDomain;
};
