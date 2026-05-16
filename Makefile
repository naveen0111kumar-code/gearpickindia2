SHELL := /bin/bash

.PHONY: bootstrap dev up down logs test lint health ci

bootstrap:
	cp -n .env.example .env || true
	npm i
	npm --workspace backend i
	npm --workspace frontend i


dev:
	npm run dev

up:
	docker compose -f infra/docker/docker-compose.yml up --build -d

down:
	docker compose -f infra/docker/docker-compose.yml down

logs:
	docker compose -f infra/docker/docker-compose.yml logs -f --tail=100

test:
	npm test

lint:
	node --check backend/src/index.js
	node --check backend/src/routes/ai.js
	node --check agents/core/orchestrator.js

health:
	curl -fsS http://localhost:4000/health

ci: bootstrap lint test
