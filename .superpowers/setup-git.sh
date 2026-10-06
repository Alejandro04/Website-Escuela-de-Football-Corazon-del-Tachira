#!/usr/bin/env bash
set -euo pipefail
git init -q
git config user.email "dev@local"
git config user.name "CDT Dev"
git checkout -q -b feature/website
git add -A
git commit -q -m "chore: initial state (Next.js boilerplate + design docs)"
git log --oneline