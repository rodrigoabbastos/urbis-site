
// Código de inicialização para o site estático
document.addEventListener('DOMContentLoaded', function() {
  console.log('Urbis site estático iniciado com sucesso');
  
  // Carregar o conteúdo principal quando o DOM estiver pronto
  const scriptElement = document.createElement('script');
  scriptElement.src = './dist/assets/index.js';
  scriptElement.type = 'text/javascript';
  document.body.appendChild(scriptElement);
});
