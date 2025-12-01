# Projeto 2: Aplicação Web Fullstack (React.js + Express.js + MySQL + Docker)

Este projeto implementa uma aplicação web em três camadas (Frontend, Backend HTTP e Banco de Dados) conforme os requisitos do Projeto 2 da disciplina de Programação Web Fullstack.

## 🚀 Tecnologias Utilizadas

| Camada | Tecnologia | Detalhes |
| :--- | :--- | :--- |
| **Frontend** | React.js | Desenvolvido com Vite, utilizando `react-router-dom` para roteamento e `axios` para comunicação com o Backend. |
| **Backend** | Express.js | Servidor HTTP RESTful implementado em Node.js, seguindo a estrutura de pastas exigida. |
| **Banco de Dados** | MySQL | Utilizado para persistência de dados de usuários e livros. |
| **Orquestração** | Docker & Docker Compose | Para garantir a execução consistente e isolada dos três serviços. |
| **Segurança** | JWT & bcryptjs | Implementação de autenticação via JSON Web Tokens (JWT) e hashing de senhas com bcryptjs. |

## ✨ Funcionalidades Implementadas

O sistema implementa as seguintes funcionalidades, acessíveis apenas após o login:

1.  **Login:** Autenticação de usuários via email e senha.
2.  **Busca:** Pesquisa de livros no banco de dados por título ou autor.
3.  **Inserção:** Adição de novos livros ao banco de dados.

## 📂 Estrutura do Projeto

O projeto segue a estrutura de pastas exigida, com o Frontend e o Backend separados:

```
.
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/          # Configuração do DB (db.config.js, initDB.js)
│   │   ├── models/          # Classes de acesso ao DB (User.js, Book.js)
│   │   ├── routes/          # Rotas da API (index.js, authMiddleware.js)
│   │   └── server.js        # Arquivo principal do Express.js
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── node_modules/
│   ├── src/
│   │   ├── api.js           # Configuração do Axios
│   │   ├── App.jsx          # Configuração de rotas
│   │   ├── Login.jsx        # Componente de Login
│   │   ├── Search.jsx       # Componente de Busca
│   │   ├── Insert.jsx       # Componente de Inserção
│   │   └── ...
│   ├── package.json
│   └── Dockerfile
├── .env                     # Variáveis de ambiente
└── docker-compose.yml       # Orquestração dos serviços
```

## ⚙️ Como Executar o Sistema (Usando Docker)

Para executar o sistema, você precisa ter o **Docker** e o **Docker Compose** instalados em sua máquina.

1.  **Clone o Repositório** (ou baixe os arquivos).
2.  **Configure as Variáveis de Ambiente:**
    *   O arquivo `.env` na raiz do projeto já contém as configurações padrão.
    *   **Usuário de Teste:** O sistema inicializa o banco de dados com um usuário padrão:
        *   **Email:** `user@test.com`
        *   **Senha:** `password123`
3.  **Inicie os Serviços:**
    *   Abra o terminal na pasta raiz do projeto (onde está o `docker-compose.yml`).
    *   Execute o comando para construir as imagens e iniciar os contêineres em modo *detached* (`-d`):

    ```bash
    docker-compose up --build -d
    ```

    *   *Nota: Se o comando acima falhar, tente usar `sudo docker-compose up --build -d`.*

4.  **Acesse a Aplicação:**
    *   Após a inicialização (pode levar alguns segundos para o MySQL e o Backend estarem prontos), acesse o Frontend no seu navegador:
        *   **URL:** `http://localhost`
5.  **Pare os Serviços:**
    *   Para parar e remover os contêineres (mantendo os volumes de dados), use:

    ```bash
    docker-compose down
    ```

## 🔒 Segurança e Validação

*   **Autenticação:** Uso de JWT para proteger as rotas de Busca e Inserção.
*   **Criptografia:** Senhas armazenadas no banco de dados com **bcryptjs**.
*   **Validação:** O Backend verifica a presença de campos obrigatórios (email/senha no login, título/autor na inserção) e retorna mensagens de erro apropriadas.
*   **HTTPS:** O Frontend está configurado para ser servido via Nginx, que é o padrão para ambientes de produção. A configuração de HTTPS pode ser adicionada ao Nginx.
