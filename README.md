
# Coexistência entre WordPress e Aplicativo React

Este projeto foi configurado para funcionar junto com um WordPress existente no mesmo domínio.

## Como Funciona

1. **Detecção de Rotas WordPress:**
   - O aplicativo React detecta URLs que começam com prefixos como `/wp-admin`, `/wp-content`, etc.
   - Quando detecta uma URL do WordPress, redireciona automaticamente para o sistema WordPress.

2. **Configuração do Servidor Web:**
   - Os arquivos de exemplo de configuração estão em `server-config-examples/`
   - Existem exemplos para Apache e Nginx

## Configurando seu Servidor Web

### Para Apache

1. Edite o arquivo `server-config-examples/apache-example.conf` substituindo:
   - `seudominio.com.br` pelo seu domínio real
   - `/caminho/para/seu/app/react/dist/` pelo caminho real do seu aplicativo React
   - Ajuste o caminho do WordPress conforme necessário

2. Copie o arquivo para `/etc/apache2/sites-available/`
   ```
   sudo cp server-config-examples/apache-example.conf /etc/apache2/sites-available/seu-site.conf
   ```

3. Habilite o site e reinicie o Apache
   ```
   sudo a2ensite seu-site.conf
   sudo systemctl restart apache2
   ```

### Para Nginx

1. Edite o arquivo `server-config-examples/nginx-example.conf` substituindo:
   - `seudominio.com.br` pelo seu domínio real
   - `/caminho/para/seu/app/react/dist/` pelo caminho real do seu aplicativo React
   - Ajuste o caminho do WordPress conforme necessário

2. Copie o arquivo para `/etc/nginx/sites-available/`
   ```
   sudo cp server-config-examples/nginx-example.conf /etc/nginx/sites-available/seu-site.conf
   ```

3. Crie um link simbólico e reinicie o Nginx
   ```
   sudo ln -s /etc/nginx/sites-available/seu-site.conf /etc/nginx/sites-enabled/
   sudo systemctl restart nginx
   ```

## Personalização

Você pode ajustar os prefixos WordPress no arquivo `src/App.tsx` adicionando ou removendo itens no array `wordpressPrefixes`.
