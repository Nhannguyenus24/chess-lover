# Chess Lover Backend

Backend API for the Chess Lover application built with Go and Gin framework.

## Prerequisites

- Go 1.21 or higher
- Git

## Setup

1. Install dependencies:
```bash
go mod download
```

2. Run the server:
```bash
go run main.go
```

The server will start on port 8080 by default. You can change this by setting the `PORT` environment variable.

## Environment Variables

- `PORT` - Server port (default: 8080)
- `ENV` - Environment (development/production, default: development)
- `DATABASE_URL` - Database connection string (optional)

## API Endpoints

### Health Check
- `GET /api/v1/health` - Health check endpoint

### Games
- `POST /api/v1/games` - Create a new game
- `GET /api/v1/games/:id` - Get a game by ID
- `PUT /api/v1/games/:id` - Update a game
- `DELETE /api/v1/games/:id` - Delete a game
- `GET /api/v1/games` - List all games

### Moves
- `POST /api/v1/games/:gameId/moves` - Make a move
- `GET /api/v1/games/:gameId/moves` - Get all moves for a game

## Project Structure

```
backend/
├── main.go           # Application entry point
├── go.mod            # Go module file
├── config/           # Configuration management
├── handlers/         # HTTP request handlers
├── models/           # Data models
├── routes/           # Route definitions
└── middleware/       # Custom middleware (future)
```

## Development

To run in development mode:
```bash
ENV=development go run main.go
```

## Next Steps

- [ ] Add database integration (PostgreSQL/SQLite)
- [ ] Implement move validation logic
- [ ] Add game state management
- [ ] Implement WebSocket support for real-time gameplay
- [ ] Add authentication and user management
- [ ] Add game history and replay functionality
