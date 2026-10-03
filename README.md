# Coach4me

Plataforma que conecta alunos a coaches (professores particulares). O coach cadastra as matérias, o valor da hora e os horários disponíveis. O aluno busca por matéria, dia da semana e horário e entra em contato direto pelo WhatsApp.

O projeto é um monorepo com três aplicações que compartilham a mesma API:

| Pasta     | Descrição                                   | Tecnologias                                  |
|-----------|---------------------------------------------|----------------------------------------------|
| `server/` | API REST                                    | Node.js, Express, TypeScript, Knex, SQLite   |
| `web/`    | Aplicação web                               | React, TypeScript, React Router, Axios       |
| `mobile/` | Aplicativo mobile                           | React Native, Expo, TypeScript, React Navigation, AsyncStorage |

## Funcionalidades

- Cadastro de coach com foto, WhatsApp, bio, matéria, valor da hora e **vários horários de aula**.
- Busca de coaches por matéria, dia da semana e horário.
- **Exibição dos horários disponíveis de cada coach na listagem, logo abaixo da bio** (web e mobile).
- Botão de contato que registra a conexão e abre o WhatsApp.
- Contador de conexões na tela inicial.
- Favoritos salvos no dispositivo (mobile).

## Funcionalidade implementada: horários na listagem de coaches

Antes, a listagem usava a tabela `class_schedule` apenas para filtrar, e os horários não eram retornados nem exibidos. Agora:

### Server

Em `server/src/controllers/ClassesController.ts`, o método `index` busca os horários das aulas encontradas na tabela `class_schedule` e devolve junto de cada coach, em um campo `schedule`.

- O `id` do coach sobrescrevia o `id` da aula no `select`, então foi adicionado o alias `classes.id as class_id`.
- Os horários são salvos em minutos no banco. A função `convertMinutesToHour` (`server/src/utils/convertMinutesToHour.ts`) converte para o formato `HH:mm`.

Exemplo de resposta de `GET /classes`:

```json
[
  {
    "name": "Maria Silva",
    "subject": "Matemática",
    "cost": 80,
    "bio": "Professora há 10 anos...",
    "whatsapp": "42999999999",
    "schedule": [
      { "week_day": 1, "from": "08:00", "to": "12:00" },
      { "week_day": 3, "from": "14:00", "to": "18:00" }
    ]
  }
]
```

### Web e Mobile

O componente `CoachItem` recebeu o campo `schedule` na interface `Coach` e passou a listar o dia da semana e o intervalo de horário abaixo da bio. O número do dia (0 a 6) é convertido para o nome (Domingo a Sábado).

## Como rodar

Pré-requisitos: Node.js (recomendado 14 ou 16) e npm. Para o mobile, o app Expo Go no celular ou um emulador.

Cada projeto roda em um terminal separado. Comece pelo server.

### 1. Server

```bash
cd server
npm install
npm run knex:migrate
npm start
```

A API sobe em `http://localhost:3333`.

### 2. Web

```bash
cd web
npm install
npm start
```

Abre em `http://localhost:3000`.

Em Linux/Mac, se ocorrer o erro `ERR_OSSL_EVP_UNSUPPORTED`, rode:

```bash
NODE_OPTIONS=--openssl-legacy-provider npm run start
```

### 3. Mobile

Antes de iniciar, altere o IP em `mobile/src/services/api.ts` para o IP da sua máquina na rede local:

```ts
baseURL: 'http://SEU_IP_AQUI:3333'
```

Depois:

```bash
cd mobile
npm install
npm start
```

Leia o QR code com o Expo Go. O celular e o computador devem estar na mesma rede.

## Rotas da API

| Método | Rota            | Descrição                                                        |
|--------|-----------------|------------------------------------------------------------------|
| GET    | `/classes`      | Lista coaches. Exige os filtros `subject`, `week_day` e `time`.  |
| POST   | `/classes`      | Cadastra coach, aula e horários (em uma transação).              |
| GET    | `/connections`  | Retorna o total de conexões.                                     |
| POST   | `/connections`  | Registra uma conexão (`coach_id`).                               |

## Banco de dados

SQLite, com migrations do Knex:

- `coaches`: nome, avatar, whatsapp e bio.
- `classes`: matéria e custo, com referência ao coach.
- `class_schedule`: dia da semana (0 a 6) e horário de início e fim (em minutos), com referência à aula.
- `connections`: coach contatado e data.

## Estrutura

```
coach4me/
├── server/
│   └── src/
│       ├── controllers/     # ClassesController, ConnectionsController
│       ├── database/        # conexão e migrations
│       ├── utils/           # conversão de horas e minutos
│       ├── routes.ts
│       └── server.ts
├── web/
│   └── src/
│       ├── components/      # CoachItem, Input, Select, Textarea, PageHeader
│       ├── pages/           # Landing, CoachList, CoachForm
│       └── services/api.ts
└── mobile/
    └── src/
        ├── components/      # CoachItem, PageHeader
        ├── pages/           # Landing, GiveClasses, CoachList, Favorites
        ├── routes/          # Stack e Bottom Tabs
        └── services/api.ts
```