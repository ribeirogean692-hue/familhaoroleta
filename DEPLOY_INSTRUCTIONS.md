# Instruções de Deploy para Vercel

## Passos para publicar no GitHub e Vercel:

### 1. Configurar Git localmente:
```bash
cd "C:\Users\pedro\Desktop\ROLETA\criacao-de-site-roleta"
git init
git add .
git commit -m "first commit"
git branch -M main
```

### 2. Criar repositório no GitHub:
- Acesse https://github.com/new
- Nomeie o repositório como "familhaoroleta"
- Escolha "Public" 
- **Não** inicialize com README

### 3. Conectar ao GitHub (substitua seu token):
```bash
git remote add origin https://github.com/seu-usuario/familhaoroleta.git
git push -u origin main
```

### 4. Publicar na Vercel:
- Acesse https://vercel.com
- Faça login com GitHub
- Clique em "New Project"
- Selecione seu repositório "familhaoroleta"
- Clique em "Deploy"

## Notas importantes:
- O sistema está pronto para deploy
- Nenhum ambiente específico configurado
- Todos os arquivos estão no repositório
- Vercel detectará automaticamente que é Next.js