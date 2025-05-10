
// Este arquivo serve como um redirecionamento para src/main.tsx
// Importante para a compatibilidade da aplicação
import './src/main.tsx';

// Verificação adicional de segurança
if (window.location.hostname !== 'localhost' && 
    window.location.hostname !== '127.0.0.1' && 
    !window.location.hostname.includes('lovable.app') &&
    window.location.protocol !== 'https:') {
  console.warn('Possível acesso inseguro detectado. A aplicação deve ser executada via HTTPS em produção.');
}
