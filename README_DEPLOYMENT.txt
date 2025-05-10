
# INSTRUÇÕES DE IMPLANTAÇÃO PARA O SITE URBIS

## Estrutura de Arquivos Correta

Após a compilação com Vite, sua estrutura de implantação deve ser:

```
/
├── index.html
├── main.js
├── .htaccess
├── dist/
│   ├── assets/
│   │   ├── index.[hash].css
│   │   ├── index.[hash].js
│   │   └── [outros arquivos de assets]
│   └── [outros arquivos compilados]
└── [outros arquivos e pastas]
```

## Passo a Passo para Upload

1. Execute o comando de build: `npm run build`
2. Faça upload de TODOS os seguintes arquivos para a raiz do servidor:
   - index.html
   - main.js (certifique-se que tem o atributo type="module")
   - .htaccess
   - favicon.ico (se existir)
   - pasta `dist/` completa com todos os arquivos compilados

3. IMPORTANTE: A pasta `dist/` deve ser colocada na raiz do servidor.

## Verificação de Implantação

1. Acesse o site urbis.com.br
2. Verifique o console do navegador (F12) para garantir que não há erros 404
3. Confirme se o arquivo main.js está sendo executado corretamente

## Solução de Problemas Comuns

- **Erro 404 para assets**: Verifique se os arquivos CSS/JS estão na pasta `dist/assets/` na raiz do servidor
- **Página em branco**: Verifique o console do navegador para identificar arquivos não encontrados
- **Redirecionamentos incorretos**: Confirme as configurações no arquivo .htaccess

Para qualquer problema, recomendamos verificar:
1. A estrutura de arquivos no servidor
2. As permissões dos arquivos e pastas (644 para arquivos, 755 para pastas)
3. A configuração do servidor web (Apache/Nginx/IIS)
```
