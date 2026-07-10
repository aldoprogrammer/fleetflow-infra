# fleetflow-infra

> **FleetFlow Production Board** · [View Kanban Board →](https://github.com/users/aldoprogrammer/projects/2)

Local high-availability infrastructure for FleetFlow — PostgreSQL, Redis, API stub, and Python matching service.

## Stack

- Docker Compose · PostgreSQL 16 · Redis 7

## Quick start

```bash
docker compose up -d
```

## Services

| Service | Port |
|---------|------|
| PostgreSQL | 5432 |
| Redis | 6379 |
| fleetflow-api (stub) | 3000 |
| python-matching-service | 8000 |

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
