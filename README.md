<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">Este projeto é uma API para controle de despesas pessoais, desenvolvida com <strong>NestJS</strong>, <strong>Prisma ORM</strong>, <strong>PostgreSQL</strong> e <strong>Redis</strong>.</p>

## ✨ Funcionalidades desenvolvidas

- CRUD completo de despesas (`/v1/expenses`)
- Filtros por mês, ano e categoria
- Seed automatizado de despesas com dados fake
- Armazenamento de dados com PostgreSQL via Prisma
- Redis integrado para cache manual ou para controle de dados voláteis
- Docker Compose com Postgres e Redis
- Health checks nos containers do Docker
- Código organizado em módulos (Database, Expense, Cache)
- Pronto para ambientes de desenvolvimento e produção
- **Documentação automática da API com Swagger**
  - Endpoints detalhados, contratos de entrada (DTOs) documentados e validados com `class-validator`
  - Acesso à documentação interativa em `/v1/docs`


## Deploy

- **URL de Produção:**  
  [https://expenses-tech-challenge.fly.dev/](https://expenses-tech-challenge.fly.dev/)
  
  > Documentação Swagger: https://expenses-tech-challenge.fly.dev/v1/docs

  ## Atenção! Token de autenticação Bearer fake-jwt-token
  Utilize o ```fake-jwt-token``` dentro do Authorize na documentação para ter acesso aos endpoints.

---

## 🚀 Como rodar em desenvolvimento (Docker)

**Pré-requisitos**:

- Docker
- Docker Compose

1. **Clone o repositório**

   ```sh
   git clone git@github.com:yMaatheus/expenses-tech-challenge.git
   cd expenses-tech-challenge
   ```

2. **Configure as variáveis de ambiente**

   Crie um arquivo `.env` na raiz com o seguinte conteúdo (ajuste as senhas se quiser):

   ```env
   # Application Environment Variables:
   
   DATABASE_URL=postgresql://admin:admin123@postgres:5432/expenses_db
   REDIS_URL=redis://:admin_password@redis:6379

   PORT=3333

   # Docker Environment Variables:

   POSTGRES_USER=admin
   POSTGRES_PASSWORD=admin123
   POSTGRES_HOST=postgres
   POSTGRES_PORT=5432
   POSTGRES_DATABASE=expenses_db

   REDIS_PASSWORD=admin_password
   REDIS_HOST=redis
   REDIS_PORT=6379
   ```

3. **Suba os containers**

   ```sh
   docker compose -f docker-compose.dev.yml up -d
   ```

4. **Acesse o container do app**

   ```sh
   docker-compose exec app bash
   ```

5. **Rode as migrations do Prisma dentro do container**

   ```sh
   npx prisma migrate deploy
   ```

6. **(Opcional) Rode o seed para popular o banco**

   ```sh
   npx prisma db seed
   ```

7. **Inicie a aplicação em modo desenvolvimento**

   ```sh
   npm run start:dev
   ```

   > O app ficará disponível em: http://localhost:3333

---
