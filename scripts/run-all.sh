#!/usr/bin/env bash
set -euo pipefail

docker compose -f infra/docker/docker-compose.yml up --build -d

echo "Waiting for backend health..."
for i in {1..30}; do
  if curl -fsS http://localhost:4000/health >/dev/null; then
    echo "Backend healthy"
    exit 0
  fi
  sleep 2
done

echo "Backend did not become healthy in time"
exit 1
