# Recomendador de Produtos RD Station

Este projeto consiste em um sistema de recomendação de produtos da RD Station, desenvolvido em um monorepo com frontend e backend separados. O usuário pode selecionar preferências e funcionalidades desejadas no frontend e receber recomendações personalizadas.

---

## Tecnologias utilizadas

- React (Frontend)
- Backend simulado com json-server (Node.js)
- Yarn Workspaces & Lerna (Monorepo)
- Tailwind CSS (Estilização)
- Jest (Testes unitários)

---

## Funcionalidades

- Formulário dinâmico para seleção de preferências e funcionalidades
- Validações no formulário para garantir que pelo menos uma opção seja selecionada
- Exibição de recomendações personalizadas baseadas nas escolhas do usuário
- Testes unitários cobrindo validações e integrações básicas

---

## Como rodar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/devmichaelheming/monorepo
```

2. Instale as dependências na raiz do monorepo:

```bash
yarn install
```

3. Instale as dependências do frontend:

```bash
cd frontend
yarn install
```

4. Instale as dependências do backend:

```bash
cd backend
yarn install
```

5. Volte para a raiz do monorepo e rode ambos os serviços em modo desenvolvimento:

```bash
cd ..
yarn dev
```

---

## Estrutura do projeto

```
monorepo/
├── backend/            # Backend json-server (Node.js)
├── frontend/           # Frontend React Application
├── .gitignore
├── LICENSE
├── README.md
├── install.sh
├── lerna.json
├── package.json
└── yarn.lock
```

---

## Testes

Os testes unitários estão localizados principalmente no frontend, utilizando Jest. Eles cobrem validações do formulário, integração com serviços e renderização condicional dos componentes.

Para rodar os testes:

```bash
cd frontend
yarn test
```

---

## Contato

Desenvolvido por Michael Heming de Oliveira  

Email: devmichael.heming@gmail.com<br>
LinkedIn: [linkedin.com/in/michaelheming](https://www.linkedin.com/in/devmichaelheming/)  