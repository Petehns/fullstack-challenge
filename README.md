# Fullstack Challenge

Aplicação web para cadastrar pessoas e o percentual de participação de cada uma. Os dados aparecem numa tabela e num gráfico de rosca. O frontend é feito em React e o backend é uma API REST feita em Django.

![Layout de referência](docs/layout-onepage.png)

## Tecnologias

**Frontend**
- React 19 + TypeScript
- Vite
- Recharts (gráfico de rosca)
- CSS Modules

**Backend**
- Python 3.12
- Django + Django REST Framework
- PostgreSQL
- django-cors-headers

## Estrutura do projeto

```
fullstack-challenge/
├── backend/                  # API REST em Django
│   ├── config/               # configurações do projeto e URLs principais
│   └── participants/         # model, serializer, views e URLs dos participantes
├── frontend/                 # aplicação React
│   └── src/
│       ├── App.tsx           # estado e chamadas à API
│       ├── types.ts          # tipos TypeScript compartilhados
│       └── components/       # formulário, tabela e gráfico
└── docs/                     # layout de referência
```

## Pré-requisitos

- [Python 3.12+](https://www.python.org/)
- [Node.js 20+](https://nodejs.org/) (desenvolvido com o Node 24)
- [PostgreSQL 17](https://www.postgresql.org/) (no macOS: `brew install postgresql@17`)

## Como rodar

O backend e o frontend rodam ao mesmo tempo, cada um no seu próprio terminal.

### 1. Banco de dados

Inicie o PostgreSQL e crie o banco:

```bash
brew services start postgresql@17   # macOS com Homebrew
createdb challenge
```

A conexão com o banco é lida de variáveis de ambiente. Se uma variável não for definida, o valor padrão é usado:

| Variável | Padrão |
|---|---|
| `DB_NAME` | `challenge` |
| `DB_USER` | `pete` |
| `DB_PASSWORD` | *(vazio)* |
| `DB_HOST` | `localhost` |
| `DB_PORT` | `5432` |

Defina `DB_USER` e `DB_PASSWORD` com o seu usuário local do PostgreSQL, por exemplo:

```bash
export DB_USER=seu_usuario
export DB_PASSWORD=sua_senha
```

Rode esses `export` no mesmo terminal que você vai usar para o backend, antes dos comandos abaixo.

### 2. Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate          # no Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

A API fica em **http://localhost:8000/participants/**.

### 3. Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Abra **http://localhost:5173** no navegador.

## Funcionalidades

- Cadastro de participante com nome, sobrenome e participação
- Tabela e gráfico de rosca que se atualizam assim que um participante é adicionado ou removido
- Dados salvos no PostgreSQL, então continuam lá depois de recarregar a página
- Remoção de participante pelo botão de lixeira que aparece ao passar o mouse sobre a linha da tabela
- Destaque da linha da tabela sob o mouse
- Subtítulo com a quantidade de participantes e o total de participação
- O gráfico mostra uma fatia cinza "Sem dados" enquanto a lista está vazia

### Validações

- Todos os campos do formulário são obrigatórios
- A participação precisa estar entre 0 e 100
- A soma de todas as participações não pode passar de 100%
- Os erros devolvidos pela API aparecem abaixo do formulário e somem depois de 5 segundos

## API

URL base: `http://localhost:8000`

| Método | Endpoint | Descrição | Sucesso |
|---|---|---|---|
| `GET` | `/participants/` | Lista todos os participantes | `200 OK` |
| `POST` | `/participants/` | Cadastra um participante | `201 Created` |
| `DELETE` | `/participants/<id>/` | Remove um participante | `204 No Content` |

### Cadastrar um participante

Requisição:

```json
{
  "firstName": "Carlos",
  "lastName": "Moura",
  "participation": 5
}
```

Resposta (`201 Created`):

```json
{
  "id": 1,
  "firstName": "Carlos",
  "lastName": "Moura",
  "participation": 5.0
}
```

### Erros

Dados inválidos retornam `400 Bad Request` com um objeto JSON. Cada chave é um campo, e o valor é uma lista de mensagens:

```json
{
  "participation": [
    "Total participation cannot exceed 100%. Only 40% is still available."
  ]
}
```
