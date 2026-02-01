package routes

import (
	"github.com/gin-gonic/gin"
	"chess-lover/backend/handlers"
)

func SetupRoutes(router *gin.Engine) {
	api := router.Group("/api/v1")
	{
		// Health check
		api.GET("/health", handlers.HealthCheck)

		// Game routes
		games := api.Group("/games")
		{
			games.POST("", handlers.CreateGame)
			games.GET("/:id", handlers.GetGame)
			games.PUT("/:id", handlers.UpdateGame)
			games.DELETE("/:id", handlers.DeleteGame)
			games.GET("", handlers.ListGames)
		}

		// Move routes
		moves := api.Group("/games/:gameId/moves")
		{
			moves.POST("", handlers.MakeMove)
			moves.GET("", handlers.GetMoves)
		}
	}
}
