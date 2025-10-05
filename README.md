## 📝 NoteNest: Bloco de Notas Moderno e Persistente (Estilo Apple Notes)

O **NoteNest** é um aplicativo de bloco de notas completo, projetado para imitar a experiência de usuário rápida e limpa de aplicativos nativos (como o Apple Notes), mas construído como uma *Full Stack* moderna.

O foco principal do projeto é a **persitência de dados em tempo real** e a **organização intuitiva** do conteúdo.

-----

## ✨ Destaques de Arquitetura e Funcionalidades

### 💻 Stack Técnica (T3-like)

  * **Frontend (UI/UX):** **Nuxt.js** (Vue.js Framework) e **Tailwind CSS** para design responsivo e componentes estilizados.
  * **Backend (API/Server):** Nuxt Server Routes (Node.js) e **Prisma** como ORM para comunicação com o banco de dados.
  * **Banco de Dados:** **MySQL** (gerenciado localmente via **Docker** para um ambiente de desenvolvimento limpo).
  * **Autenticação:** **JSON Web Tokens (JWT)** para gestão de sessão e **bcrypt** para *hashing* seguro de senhas.

### 🚀 Funcionalidades Chave

  * **Persistência em Tempo Real:** O conteúdo da nota é salvo automaticamente no banco de dados à medida que o usuário digita (sem a necessidade de um botão "Salvar").
  * **Organização por Tempo:** As notas são automaticamente agrupadas em categorias de navegação: **Today**, **Yesterday**, e **Earlier** (Anteriores), proporcionando uma experiência de usuário focada no tempo.
  * **Gestão Completa de Conteúdo (CRUD):**
      * Criação de novas notas.
      * **Remoção com Confirmação:** Ao excluir uma nota, um alerta estilizado (`SweetAlert`) exige confirmação para evitar perdas acidentais.
  * **Autenticação Robusta:**
      * **Registro e Login** de usuário.
      * **Validação de Formulário** e exibição de alertas estilizados para erros (e-mail duplicado, senha inválida, etc.).

### 🛠️ Soluções Técnicas (DevOps e Refatoração)

  * **Ambiente Dockerizado:** Utilização do **Docker Compose** para configurar e executar o servidor MySQL localmente, garantindo que o projeto seja facilmente portável (substituindo a necessidade de MAMP/XAMPP).
  * **Prisma Migrations:** Uso do Prisma para gerenciar o esquema do banco de dados e sincronizar o estado da aplicação com o servidor.
  * **Manuseio de Assincronicidade (Vue/Nuxt):** Implementação de *safe guards* (checagens de `null`/`undefined`) em propriedades computadas e *hooks* de ciclo de vida para prevenir *crashes* durante a busca assíncrona de dados (`$fetch`).
  * **Resolução de Conflitos (409):** Tratamento correto da resposta HTTP **409 Conflict** no *backend* (e no *frontend*) para e-mails duplicados durante o registro.

-----

## 📂 Estrutura de Pastas (Base Nuxt.js)

```
note-nest/
├── assets/             # Estilos globais (não Tailwind)
├── components/         # Componentes Vue reutilizáveis
├── lib/                # Módulos essenciais (ex: prisma.ts)
├── pages/              # Views (index.vue, login.vue, register.vue)
├── prisma/             # Schema e Migrations do Prisma
├── server/             # API Endpoints (server/api/notes.js)
├── .env                # Variáveis de ambiente (DB URL, JWT Secret)
├── nuxt.config.ts      # Configuração do Nuxt
└── package.json        # Dependências
```

-----

## 💡 Como Executar Localmente

Você precisará ter o **Node.js** e o **Docker Desktop** instalados.

1.  **Clone o Repositório**
2.  **Configurar o Banco de Dados Docker:**
    ```bash
    # 1. Inicia o container MySQL (root:root)
    docker-compose up -d
    ```
3.  **Instalar Dependências:**
    ```bash
    npm install
    ```
4.  **Sincronizar o Schema Prisma:**
    ```bash
    # Cria todas as tabelas no banco de dados 'NoteNest'
    npx prisma db push
    ```
5.  **Iniciar a Aplicação:**
    ```bash
    npm run dev
    ```
    O aplicativo estará acessível em `http://localhost:3000`.
