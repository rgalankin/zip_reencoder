# PAEI Test Service

This repository contains a minimal Node.js backend implementing part of the PAEI testing workflow. It supports tokenised link generation and result submission with basic scoring.

## Setup
1. Copy `.env.example` to `.env` and adjust `BASE_URL` and other values.
2. Start the server:
   ```bash
   node app/backend/server.js
   ```

## API
- `POST /api/link.create` — create a single-use link.
- `POST /api/submit` — accept answers, compute PAEI code and percentages, store result.

Data is stored in JSON files under `app/backend/data/` for demo purposes.
