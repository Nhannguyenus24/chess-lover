package models

// Game represents a chess game
type Game struct {
	ID          string   `json:"id"`
	Status      string   `json:"status"`      // active, finished, abandoned
	CurrentTurn string   `json:"currentTurn"` // white, black
	Board       [8][8]string `json:"board"`
	WhitePlayer string   `json:"whitePlayer,omitempty"`
	BlackPlayer string   `json:"blackPlayer,omitempty"`
	CreatedAt   string   `json:"createdAt,omitempty"`
	UpdatedAt   string   `json:"updatedAt,omitempty"`
}

// Move represents a chess move
type Move struct {
	ID        string `json:"id"`
	GameID    string `json:"gameId"`
	From      string `json:"from"`      // e.g., "e2"
	To        string `json:"to"`        // e.g., "e4"
	Piece     string `json:"piece"`     // e.g., "pawn"
	Color     string `json:"color"`     // white, black
	MoveNumber int   `json:"moveNumber"`
	Notation  string `json:"notation"`  // e.g., "e4"
	CreatedAt string `json:"createdAt,omitempty"`
}

// InitialBoardState returns the initial chess board state
func InitialBoardState() [8][8]string {
	return [8][8]string{
		{"r", "n", "b", "q", "k", "b", "n", "r"},
		{"p", "p", "p", "p", "p", "p", "p", "p"},
		{"", "", "", "", "", "", "", ""},
		{"", "", "", "", "", "", "", ""},
		{"", "", "", "", "", "", "", ""},
		{"", "", "", "", "", "", "", ""},
		{"P", "P", "P", "P", "P", "P", "P", "P"},
		{"R", "N", "B", "Q", "K", "B", "N", "R"},
	}
}
