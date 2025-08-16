# Backend Dockerfile
FROM python:3.12-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_NO_CACHE_DIR=on

WORKDIR /app

# System deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    libzbar0 \
    libzbar-dev \
  && rm -rf /var/lib/apt/lists/*

# Install python deps
COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt

# Copy app
COPY . /app

# Expose API
EXPOSE 8000

# Run the ASGI app (FastAPI + Starlette root)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
