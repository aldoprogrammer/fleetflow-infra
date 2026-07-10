-- FleetFlow local PostgreSQL bootstrap
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE SCHEMA IF NOT EXISTS fleetflow;

COMMENT ON DATABASE fleetflow IS 'FleetFlow on-demand logistics system of record';
