
// Importação para o aplicativo transpilado
import './src/main.js';

// Additional security check
if (window.location.hostname !== 'localhost' && 
    window.location.hostname !== '127.0.0.1' && 
    !window.location.hostname.includes('lovable.app') &&
    window.location.protocol !== 'https:') {
  console.warn('Possible insecure access detected. The application should run via HTTPS in production.');
}
