# fleetflow-infra

> **FleetFlow Production Board** · [View Kanban Board →](https://github.com/users/aldoprogrammer/projects/2)

Local high-availability infrastructure for FleetFlow — PostgreSQL, Redis, API stub, and Python matching service.

## Stack

- Docker Compose · PostgreSQL 16 · Redis 7

## Quick start (local API dev)

```bash
cd fleetflow-infra
docker compose up -d
```

Starts **postgres**, **redis**, **python-matching-service** only.  
Run NestJS API locally on port **3000**:

```bash
cd ../fleetflow-api
pnpm start:dev
```

## Docker Compose — perintah penting

Jalankan semua command dari folder **`fleetflow-infra`**.

### Nyalakan services (background)

```bash
docker compose up -d
```

- `-d` = detached (jalan di background, terminal bebas dipakai lagi)

### Cek status container

```bash
docker compose ps
# atau
docker ps
```

### Lihat log (real-time)

```bash
# semua services
docker compose logs -f

# satu service saja (contoh postgres)
docker compose logs -f postgres
```

Tekan `Ctrl + C` untuk keluar dari mode log.

### Stop services (data tetap aman)

```bash
docker compose stop
```

Container berhenti, volume/database **tidak** dihapus.

### Stop + hapus container

```bash
docker compose down
```

Container dihapus, tapi **data volume (postgres/redis) tetap ada**.

### Reset total (hapus data database juga)

```bash
docker compose down -v
```

⚠️ **Hati-hati:** `-v` menghapus volume → data Postgres & Redis hilang. Pakai kalau mau fresh start / DB corrupt.

### Restart services

```bash
docker compose restart
```

### Rebuild setelah ubah `docker-compose.yml`

```bash
docker compose up -d --build
```

### Nyalakan ulang dari nol (fresh infra)

```bash
docker compose down -v
docker compose up -d
cd ../fleetflow-api
npx prisma migrate dev
```

### Ringkasan cepat

| Mau apa? | Command |
|----------|---------|
| Nyalakan | `docker compose up -d` |
| Cek jalan atau tidak | `docker compose ps` |
| Lihat log error | `docker compose logs -f` |
| Matikan (data aman) | `docker compose stop` |
| Matikan + hapus container | `docker compose down` |
| Reset DB & Redis | `docker compose down -v` lalu `up -d` |

## Optional: API inside Docker

```bash
docker compose --profile docker-api up -d
```

## Services

| Service | Port | Default `up` |
|---------|------|--------------|
| PostgreSQL | 5432 | yes |
| Redis | 6379 | yes |
| python-matching-service | 8000 | yes |
| fleetflow-api (Docker stub) | 3000 | no — use profile `docker-api` |

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
