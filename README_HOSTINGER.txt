
# INSTRUÇÕES PARA HOSPEDAGEM NA HOSTINGER (SEM NODE.JS)

## Arquivos importantes para upload:

1. index.html (arquivo principal)
2. .htaccess (configurações do servidor)
3. dist/ (pasta com todos os arquivos compilados)
4. assets/ (se houver, com imagens e outros recursos estáticos)

## Instruções de upload:

1. Faça login no seu painel da Hostinger
2. Acesse o Gerenciador de Arquivos ou use FTP
3. Navegue até a pasta pública do seu domínio (geralmente public_html)
4. Faça upload de todos os arquivos e pastas listados acima
5. Certifique-se de que o arquivo .htaccess foi enviado corretamente (às vezes é um arquivo oculto)

## Verificação:

- Acesse seu domínio para verificar se o site está funcionando corretamente
- Se ocorrer algum problema, verifique os logs de erro do servidor na Hostinger

## Observações:

- Este site foi configurado para funcionar como um aplicativo estático, sem necessidade de Node.js
- As rotas são gerenciadas pelo arquivo .htaccess usando mod_rewrite
- Qualquer problema, entre em contato com o suporte da Hostinger para confirmar se as configurações de mod_rewrite estão ativadas em seu plano
