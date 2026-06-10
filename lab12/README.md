# Лабораторна робота №12 — Контейнеризація

## Опис

Повний застосунок (Nest.js backend, React frontend, PostgreSQL),
контейнеризований за допомогою Docker та Docker Compose.

## Структура

- `backend/` — Nest.js застосунок з багатоетапним Dockerfile
- `frontend/` — React застосунок з роздачею через Nginx
- `compose.yaml` — опис середовища з трьох сервісів
- `.env.example` — приклад необхідних змінних середовища

## Запуск

1. Скопіюйте `.env.example` у `.env` та заповніть значення
2. Виконайте `docker compose up --build`
3. Відкрийте `http://localhost:8080`