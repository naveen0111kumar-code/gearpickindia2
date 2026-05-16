#!/usr/bin/env bash
set -euo pipefail

cp -n .env.example .env || true
npm i
npm --workspace backend i
npm --workspace frontend i

echo "Bootstrap complete"
