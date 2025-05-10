
// Código de inicialização para o site dinâmico (módulo ES6)
document.addEventListener('DOMContentLoaded', function() {
  console.log('Urbis site dinâmico iniciado com sucesso');
  
  // Verificar se o site está sendo executado no domínio principal
  const isMainDomain = window.location.hostname === 'www.urbis.com.br' || 
                       window.location.hostname === 'urbis.com.br';
  
  console.log(`Site rodando em: ${window.location.hostname}`);
  
  // Carregar dados dinâmicos se necessário
  if (typeof window.fetchDynamicContent === 'function') {
    window.fetchDynamicContent();
  }
  
  // Mostrar mensagem específica dependendo do ambiente
  if (isMainDomain) {
    console.log('Site em produção: www.urbis.com.br');
  } else if (window.location.hostname.includes('lovable.app')) {
    console.log('Ambiente de desenvolvimento Lovable');
  } else {
    console.log('Ambiente local ou de teste');
  }
  
  // Reportar versão
  console.log("Versão da aplicação: " + (new Date()).toISOString());
});

// Adicionar hook para atualizações dinâmicas
window.updateContent = function(section, content) {
  console.log(`Atualizando conteúdo da seção: ${section}`);
  const sectionElement = document.getElementById(section);
  if (sectionElement && content) {
    sectionElement.innerHTML = content;
    return true;
  }
  return false;
};

// Exportação para compatibilidade com módulos ES6
export {};
