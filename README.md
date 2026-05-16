# AI Marketing OS (V1 → V19)

Production-oriented monorepo implementing an evolution from static marketing pages to autonomous multi-agent SaaS.

## Stages
- V1-V4: Static + multi-page + dynamic content system (existing site pages + `frontend` app)
- V5-V9: Automation, SEO, traffic, monetization modules (`backend/jobs`, `agents/modules`)
- V10-V14: SaaS + API + realtime + Docker
- V15-V16: Autonomous agent orchestration + multi-agent cloud workflow
- V17: Microservices
- V18: Kubernetes + CI/CD
- V19: Autonomous business loop

## Monorepo Structure
- `frontend`: React (Vite) dashboard
- `backend`: Node.js/Express API + JWT + WebSockets + PostgreSQL-ready service layer
- `agents`: AI agents and orchestrator loop
- `services`: microservices (campaign, analytics, billing)
- `infra`: docker, k8s manifests, GitHub Actions workflow
- `shared`: shared types and helpers

## Quick Start
1. Copy `.env.example` to `.env` (required for Docker Compose).
2. Run `docker compose -f infra/docker/docker-compose.yml up --build`.
3. Open frontend at `http://localhost:5173`, backend at `http://localhost:4000`.

## Environment Variables
See `.env.example`.

## Deployment
- Build containers using `infra/docker/Dockerfile.*`
- Apply K8s manifests in `infra/k8s`
- Use GitHub Actions workflow in `.github/workflows/ci.yml`


## Full Automation
- One-command bootstrap: `make bootstrap` or `./scripts/bootstrap.sh`
- One-command full startup: `make up` or `./scripts/run-all.sh`
- Continuous local logs: `make logs`
- Health verification: `make health`
- Full CI-equivalent checks locally: `make ci`

## Run Commands
- Local dev (frontend + backend): `make dev`
- Containerized stack: `make up`
- Stop stack: `make down`


## Deployment Troubleshooting
- If deployment fails with workspace conflicts, ensure each workspace has its own `package.json` (already added for `services/*` and `shared`).
- If Docker fails to load env vars, verify `.env` exists (compose now reads `.env`, not `.env.example`).
- Use `make ci` before deploy to validate syntax/tests locally.
