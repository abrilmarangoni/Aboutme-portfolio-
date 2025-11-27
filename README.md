# Portfolio

Personal portfolio website.

Built with Next.js and TypeScript.

## Setup

Install dependencies:

```bash
pnpm install
```

## Scoring System with KV

The game includes a ranking system using **Vercel KV** (Redis) for persistent score storage.

### Features

- **3 difficulty levels**: Easy, Medium, Hard
- **Score increments**: Always in steps of 10 (10, 20, 30, 40...)
- **Score calculation**: Based on elapsed time and pixels destroyed
- **Score freeze**: Score freezes immediately on Game Over
- **Company name**: Scores are associated with company names
- **Ranking display**: Top scores with trophies (gold, silver, bronze) for top 3

### KV Key Structure

Scores are stored in sorted sets:

- `scores:easy`
- `scores:medium`
- `scores:hard`

Each key uses Redis sorted sets, automatically ordered by score (highest to lowest).

### Score Storage

When a game ends:

1. Score is frozen immediately (`gameOver = true`)
2. Score is saved to KV with `companyName`
3. Score appears in the ranking chart for the selected difficulty

### Vercel KV Setup

See `KV_SETUP.md` for detailed setup instructions.

For local development, create a `.env.local` file with:

```env
KV_URL=your_kv_url
KV_REST_API_URL=your_rest_api_url
KV_REST_API_TOKEN=your_rest_api_token
KV_REST_API_READ_ONLY_TOKEN=your_read_only_token
```

### API Endpoints

- `GET /api/ranking` - Retrieve top scores for all difficulties
- `POST /api/ranking` - Save a new score

### Rules

- Score never updates after `gameOver = true`
- Score is saved only once per game
- Score increments in steps of 10
- Score value (e.g., 510) appears exactly as calculated in KV and ranking

## Development

Run locally:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```
