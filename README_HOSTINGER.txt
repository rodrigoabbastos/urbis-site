
# INSTRUÇÕES PARA HOSPEDAGEM NA HOSTINGER (SITE DINÂMICO SEM NODE.JS)

## Arquivos importantes para upload:

1. index.html (arquivo principal)
2. main.js (script de inicialização dinâmica)
3. .htaccess (configurações do servidor principal)
4. public/.htaccess (configurações para pasta pública)
5. dist/ (pasta com todos os arquivos compilados)
6. assets/ (se houver, com imagens e outros recursos estáticos)

## Instruções de upload:

1. Faça login no seu painel da Hostinger
2. Acesse o Gerenciador de Arquivos ou use FTP
3. Navegue até a pasta pública do seu domínio (geralmente public_html)
4. Faça upload de todos os arquivos e pastas listados acima
5. Certifique-se de que os arquivos .htaccess foram enviados corretamente (às vezes são arquivos ocultos)

## Configuração de domínio:

1. No painel da Hostinger, vá para a seção "Domínios"
2. Configure seu domínio para apontar para o diretório onde você fez upload dos arquivos
3. Certifique-se de que os registros DNS estão configurados corretamente:
   - Registro A: aponte para o IP do servidor da Hostinger
   - Registro CNAME para www: aponte para seu domínio raiz (@)

## Configuração automática após publicação no Lovable:

Para automatizar a atualização do seu site em www.urbis.com.br após publicação no Lovable:

1. **Opção 1 - Usar CI/CD com GitHub:**
   - Conecte seu projeto Lovable ao GitHub
   - Configure uma workflow no GitHub Actions que sincronize com sua hospedagem na Hostinger via SFTP/SSH
   - Isso permitirá atualização automática quando você publicar no Lovable e fizer push para o GitHub

2. **Opção 2 - Usar ferramenta de implantação:**
   - Instale uma ferramenta como DeployHQ ou Deploybot
   - Configure para monitorar seu repositório GitHub conectado ao Lovable
   - Configure a ferramenta para implantar automaticamente em sua hospedagem Hostinger

## Verificação:

- Acesse seu domínio para verificar se o site está funcionando corretamente
- Verifique o console do navegador para confirmar que o script dinâmico está sendo executado
- Se ocorrer algum problema, verifique os logs de erro do servidor na Hostinger

## Observações:

- Este site foi configurado para funcionar como um aplicativo dinâmico, sem necessidade de Node.js
- As funcionalidades dinâmicas são processadas pelo JavaScript do lado do cliente
- O Supabase é usado como backend para armazenamento de dados
- As rotas são gerenciadas pelo arquivo .htaccess usando mod_rewrite
- Qualquer problema, entre em contato com o suporte da Hostinger para confirmar se as configurações de mod_rewrite estão ativadas em seu plano
