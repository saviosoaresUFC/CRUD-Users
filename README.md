# 🚀 CRUD de Usuários com Node.js, Express e PostgreSQL

Esta é uma API RESTful simples para gerenciar o registo e as informações de usuários, implementando as operações completas de **C**rear, **R**ealizar a leitura, **U**pdate (Atualizar) e **D**elete (Excluir).

## 🌟 Tecnologias Utilizadas

| Tecnologia | Descrição |
| :--- | :--- |
| **Node.js** | Ambiente de execução JavaScript no lado do servidor. |
| **Express** | Framework web rápido, flexível e minimalista para Node.js. |
| **PostgreSQL** | Banco de dados relacional robusto e de código aberto. |
| **Sequelize** | ORM (Object-Relational Mapper) para Node.js, usado para interagir com o PostgreSQL. |
| **Bcrypt** | Biblioteca para fazer *hash* criptográfico de senhas, garantindo a segurança. |
| **dotenv** | Para carregar variáveis de ambiente a partir do ficheiro `.env`. |

## 📦 Estrutura do Projeto

```text
crud-node-express/
├── config/
│   └── database.js             # Configuração e conexão do Sequelize (PostgreSQL)
├── controllers/
│   └── userController.js       # Lógica de negócio do CRUD
├── models/
│   └── User.js                 # Definição do Modelo e Validações (Sequelize)
├── routes/
│   └── userRoutes.js           # Definição dos endpoints da API
├── .env                        # Variáveis de ambiente (credenciais do DB)
├── package.json
└── server.js                   # Ponto de entrada da aplicação
```

## ⚙️ Instalação e Configuração

Siga os passos abaixo para colocar a aplicação a funcionar na sua máquina local.

### Pré-requisitos

Certifique-se de que tem o seguinte instalado:

* **Node.js e npm** (versão LTS recomendada)
* **PostgreSQL** (Servidor em execução)

### 1. Clonar o Repositório e Instalar Dependências

```bash
# Clone o repositório em sua máquina ou simplesmente baixe o zip no GitHub
git clone https://github.com/saviosoaresUFC/CRUD-Users.git

# Navegue até a pasta do projeto
cd crud-node-express 

# Instale os pacotes necessários
npm install 
```

### 2. Configurar Variáveis de Ambiente

Crie um ficheiro chamado **`.env`** na raiz do projeto e preencha com as suas credenciais do PostgreSQL.

```ini
# Configuração do Servidor
PORT=3000

# Configuração do PostgreSQL
DB_HOST=localhost
DB_USER=seu_usuario_postgres
DB_PASSWORD=sua_senha_postgres
DB_NAME=crud_users_db
DB_PORT=5432 
```
> **Nota:** O Sequelize tentará criar a base de dados (`DB_NAME`) e as tabelas (a tabela `users`) se elas não existirem, usando as credenciais fornecidas.

### 3. Iniciar o Servidor

Utilize o script `dev` para iniciar o servidor com `nodemon` (que reinicia automaticamente a cada alteração).

```bash
npm run dev
```

O servidor estará a correr em `http://localhost:3000`.

## 🖥️ Endpoints da API (CRUD)

Todos os endpoints são prefixados por `/api/users`.

| Operação | Método HTTP | URL | Descrição |
| :--- | :--- | :--- | :--- |
| **C**riar | `POST` | `/api/users` | Regista um novo usuário. |
| **R**ealizar (Todos) | `GET` | `/api/users` | Lista todos os usuários (sem o campo senha). |
| **R**ealizar (ID) | `GET` | `/api/users/:id` | Retorna um usuário específico por ID. |
| **U**pdate | `PUT` | `/api/users/:id` | Atualiza os dados de um usuário por ID. |
| **D**elete | `DELETE` | `/api/users/:id` | Remove um usuário por ID. |

### Modelo de Dados Obrigatório (Body - POST/PUT)

| Campo | Tipo | Requisito | Notas |
| :--- | :--- | :--- | :--- |
| `username` | String | Mín. 6 caracteres, Único | Nome de usuário. |
| `fullName` | String | Mín. 6 caracteres | Nome completo. |
| `email` | String | Válido, Único | Endereço de email. |
| `password` | String | Mín. 6 caracteres | A senha é automaticamente hasheada (bcrypt) antes de ser salva. |
| `newsletter` | Boolean | Opcional | Valor padrão: `false`. |

### Exemplo de Requisição (POST)

**URL:** `POST http://localhost:3000/api/users`

**Body (JSON):**

```json
{
  "username": "coder_parceiro",
  "fullName": "Parceiro de Programacao",
  "email": "parceiro@email.com",
  "password": "uma_senha_forte",
  "newsletter": true
}
```

## 🔐 Segurança

* **Hash de Senha:** Todas as senhas são hasheadas usando a biblioteca **Bcrypt** e um *salt* de 10 rodadas antes de serem armazenadas no banco de dados.
* **Exclusão de Senha na Resposta:** O controlador garante que o campo `password` seja excluído das respostas `GET` e `POST` para evitar exposição de dados sensíveis.

## 🤝 Contribuições

Sinta-se à vontade para sugerir melhorias, como adicionar autenticação com JWT, paginação ou testes unitários!