# fleetflow-infra

> **FleetFlow Production Board** · [View Kanban Board →](https://github.com/users/aldoprogrammer/projects/2)

Local infrastructure for FleetFlow — PostgreSQL, Redis, and NestJS API (Docker).

## Stack

- Docker Compose · PostgreSQL 16 · Redis 7 · NestJS API

## Quick start (local API dev)

```bash
cd fleetflow-infra
docker compose up -d
```

Starts **postgres**, **redis**, and **fleetflow-api** (Docker). Matching runs inside the API (BullMQ + Redis).

**Video / live demo (web → match → Flutter → web):** [DEMO_E2E.md](../fleetflow-docs/DEMO_E2E.md)

Before each demo take, reset drivers that were left `ON_TRIP`:

```bash
docker exec fleetflow-api sh -c "cd /app/fleetflow-api && node scripts/qa-reset-drivers.mjs"
```

Run NestJS API locally on port **3000** (hot-reload):

```bash
cd ../fleetflow-api
npx prisma migrate deploy
npx prisma db seed
pnpm start:dev
```

Run Next.js locally on port **3001**:

```bash
cd ../fleetflow-web
pnpm dev
```

### Prisma (from `fleetflow-api`)

> Do not run `npx prisma ...` from the monorepo root — the schema is in `fleetflow-api/prisma/`.

```bash
cd ../fleetflow-api

# or from root: pnpm prisma:studio
pnpm prisma:studio

# other commands
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:push
pnpm prisma:seed
```

## Docker Compose — essential commands

Run all commands from the **`fleetflow-infra`** folder.

### Start services (background)

```bash
docker compose up -d
```

- `-d` = detached (runs in the background)

### Check container status

```bash
docker compose ps
# or
docker ps
```

### View logs (live)

```bash
# all services
docker compose logs -f

# single service (example: postgres)
docker compose logs -f postgres
```

Press `Ctrl + C` to exit log follow mode.

### Stop services (data preserved)

```bash
docker compose stop
```

Containers stop; volumes and database data **remain**.

### Stop and remove containers

```bash
docker compose down
```

Containers are removed, but **postgres/redis volumes remain**.

### Full reset (delete database data)

```bash
docker compose down -v
```

⚠️ **Warning:** `-v` deletes volumes → Postgres and Redis data are lost. Use for a fresh start or corrupted DB.

### Restart services

```bash
docker compose restart
```

### Rebuild after editing `docker-compose.yml`

```bash
docker compose up -d --build
```

### Fresh infra bootstrap

```bash
docker compose down -v
docker compose up -d
cd ../fleetflow-api
npx prisma migrate deploy
npx prisma db seed
```

### Quick reference

| Goal | Command |
|------|---------|
| Start | `docker compose up -d` |
| Check status | `docker compose ps` |
| View logs | `docker compose logs -f` |
| Stop (keep data) | `docker compose stop` |
| Stop + remove containers | `docker compose down` |
| Reset DB & Redis | `docker compose down -v` then `up -d` |

## Services

| Service | Port | Default `up` |
|---------|------|--------------|
| PostgreSQL | 5432 | yes |
| Redis | 6379 | yes |
| fleetflow-api | 3000 | yes |

## QA smoke checks

Validates API health + web portal when stack is running:

```bash
# from monorepo root
pnpm test:smoke
```

Script: `qa/smoke-stack.mjs`

Full guide: [fleetflow-docs/QA_TESTING.md](../fleetflow-docs/QA_TESTING.md)

## Related repos

| Repo | Role |
|------|------|
| [fleetflow-api](https://github.com/aldoprogrammer) | NestJS backend |
| [fleetflow-web](https://github.com/aldoprogrammer) | Next.js portal |
| [fleetflow-app](https://github.com/aldoprogrammer) | Flutter client |
| [fleetflow-shared](https://github.com/aldoprogrammer) | Shared contracts |
| [fleetflow-docs](https://github.com/aldoprogrammer) | Architecture docs |

## GitHub About (recommended)

Set **Website** in repo **About** → `https://github.com/users/aldoprogrammer/projects/2`
