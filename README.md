# PL Grounds

Tracking Premier League stadiums, matches, teams, players, and statistics.

## Project Description

PL Grounds is an Express/MongoDB application for managing Premier League data. It includes REST endpoints, EJS views, Swagger documentation, GraphQL via GraphQL Yoga, Redis-backed caching, JWT authentication, and match lifecycle features such as upcoming, live, and history matches.

## Prerequisites

- Node.js `>=20.0.0`
- npm
- MongoDB
- Redis or Redis Stack for caching

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Nader7x/PremierLeagueStadiums.git
cd PremierLeagueStadiums
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root. At minimum, configure:

```env
# Use a strong random secret. Do not commit real secrets.
JWT_SECRET_KEY=replace_with_a_strong_random_secret

# Either provide a full URI...
MONGO_URI=mongodb://127.0.0.1:27017/premierLeagueDB

# ...or omit MONGO_URI and let server.js use this DB name locally.
MONGO_DB_NAME=premierLeagueDB

# Comma-separated list of allowed browser origins.
ALLOWED_ORIGINS=http://localhost:3000

# Redis configuration. Local development defaults are usually 127.0.0.1:6379.
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_USERNAME=default
REDIS_PASSWORD=

# Optional: Firebase service account JSON as a single-line JSON string.
# Required only if push notifications are enabled.
FIREBASE_SERVICE_ACCOUNT=
```

Notes:

- `server.js` starts Redis first, then MongoDB, then the HTTP server.
- If `MONGO_URI` is not set, the app falls back to `mongodb://127.0.0.1:27017/${MONGO_DB_NAME}`.
- Redis initialization tries configured Redis first and then local Redis. Startup fails if both connections fail.
- Firebase credentials are no longer loaded from a committed JSON file. Provide `FIREBASE_SERVICE_ACCOUNT` through your environment or secret manager.

### 4. Start MongoDB and Redis

MongoDB:

```bash
mongod
```

Redis:

```bash
redis-server
```

### 5. Run the application

Production-style start:

```bash
npm start
```

Development mode with Node watch:

```bash
npm run dev
```

The app starts on `http://localhost:3000` by default.

## Available Interfaces

- REST API: `http://localhost:3000`
- Swagger API docs: `http://localhost:3000/api-docs`
- GraphQL endpoint: `http://localhost:3000/graphql`
- Ruru GraphQL UI: `http://localhost:3000/`

## API Overview

### Teams

- `GET /teams` — retrieve teams. Supports pagination with `?page=1&limit=10`.
- `GET /teamsWithPlayers` — retrieve teams with populated squad and coach data.
- `GET /teamsWithNoStadium` — retrieve teams without a stadium.
- `GET /leagueStandings` — retrieve teams sorted by points descending.
- `POST /team` — add a new team.
- `DELETE /team/:id` — delete a team.
- `PATCH /team/:id` — update a team.

### Stadiums

- `GET /stadiums` — retrieve all stadiums.
- `GET /stadiumsWithTeam` — retrieve stadiums with populated home team names.
- `GET /stadiumMatches/:id` — retrieve matches for a stadium with populated team names.
- `GET /stadiumHistoryMatches/:id` — retrieve ended matches for a stadium.
- `POST /stadium` — add a new stadium.
- `DELETE /stadium/:id` — delete a stadium.
- `PATCH /stadium/:id` — update a stadium.

### Matches

- `GET /matches` — retrieve matches. Supports pagination with `?page=1&limit=10`.
- `GET /matchesWithNames` — retrieve matches with populated team, referee, and commentator names.
- `GET /matchesLive` — retrieve currently live matches (`status: true`, `endState: false`).
- `GET /matchesHistory` — retrieve ended matches (`endState: true`).
- `GET /upcomingMatches` — retrieve not-started, not-ended matches.
- `POST /match` — add a new match.
- `PATCH /match/:id` — update a match.
- `DELETE /match/:id` — delete a match.

### Players

- `GET /players` — retrieve all players.
- `GET /playersWithSameTeam/:teamId` — retrieve players for one team.
- `POST /player` — add a new player and update the team squad atomically with `$addToSet`.
- `POST /players` — add multiple players.
- `DELETE /player/:id` — delete a player.
- `PATCH /player/:id` — update a player.

### Coaches, Referees, and Commentators

- `GET /coaches`, `GET /referees`, `GET /commentators`
- `POST /coach`, `POST /referee`, `POST /commentator`
- `PATCH /coach/:id`, `PATCH /referee/:id`, `PATCH /commentator/:id`
- `DELETE /coach/:id`, `DELETE /referee/:id`, `DELETE /commentator/:id`

Update routes run Mongoose validators.

### Authentication

- `POST /register` — register a user or admin.
- `POST /login` — login and receive a JWT.

JWT notes:

- Admin and user tokens are bounded to one week.
- Registration checks duplicate usernames across both `User` and `Admin` account types.

## Redis Caching

Redis is used to cache frequently requested data and reduce MongoDB load.

The cache layer stores JSON using standard Redis string commands:

- Writes: `SET key JSON.stringify(data) EX <seconds>`
- Reads: `GET key` followed by `JSON.parse(...)`

Examples of cached data include matches, players, history matches, upcoming matches, and other read-heavy endpoints.

To clear all local Redis data during development:

```bash
redis-cli FLUSHALL
```

## Validation and Data Integrity

Mongoose schemas use `required: true` for required fields instead of `allowNull: false`. Numeric statistics and match scores now have safe defaults such as `0`.

Examples:

- Match goals default to `0`.
- Team `wins`, `loss`, `draw`, and `points` default to `0`.
- Player `position` is required and validated against the allowed position enum.

## Security Notes

- CORS uses the `ALLOWED_ORIGINS` environment variable instead of allowing all origins.
- Production 5xx errors return a generic message instead of leaking internal error details.
- Firebase credentials should be supplied through environment variables or a secret manager, not committed files.
- Use a cryptographically strong `JWT_SECRET_KEY` and never commit real secrets.
