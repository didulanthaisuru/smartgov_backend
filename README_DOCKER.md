# SmartGov Docker Setup

This repository includes a simple Docker Compose stack to run:

- MongoDB (port 27017)
- FastAPI backend + Socket.IO (port 8000)
- React frontend (built with Vite, served by Nginx on port 5173)

## Prerequisites
- Docker and Docker Compose installed

## Quick start

1. Copy environment template and adjust if needed:

```bash
cp .env.example .env
```

2. Build and start the stack:

```bash
docker compose up --build
```

- Backend: http://localhost:8000
- Frontend: http://localhost:5173
- Socket.IO path: http://localhost:8000/socket.io

The backend is configured to use `MONGO_URI=mongodb://mongo:27017/SmartGov` (the service name `mongo` resolves within the Docker network).

## Customizing

- Override the API base used at frontend build time by setting `VITE_API_BASE_URL` in `.env` before building.
- CORS in `backend/main.py` already allows http://localhost:5173.

## Common commands

- Rebuild after code changes:
```bash
docker compose build backend frontend
```

- Start/stop:
```bash
docker compose up -d
docker compose down
```

- Check logs:
```bash
docker compose logs -f backend
```

## Notes
- The frontend container serves a static build. When developing UI, continue using `npm run dev` locally; Docker is for packaged runs.
- Uploaded files are not persisted by default; add a volume for `backend/uploads/` if you need persistence.
