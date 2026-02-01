package config

import (
	"os"
)

type Config struct {
	Environment string
	Port        string
	DatabaseURL string
}

func Load() *Config {
	return &Config{
		Environment: getEnv("ENV", "development"),
		Port:        getEnv("PORT", "8080"),
		DatabaseURL: getEnv("DATABASE_URL", ""),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
