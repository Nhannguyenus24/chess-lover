import { useState, useEffect, useRef } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import {
  Container,
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  IconButton,
  Chip,
  Stack,
  Divider,
  Grid,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import TimerIcon from '@mui/icons-material/Timer'

function Game() {
  const [game, setGame] = useState(new Chess())
  const [moveHistory, setMoveHistory] = useState([])
  const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] })
  const [whiteTime, setWhiteTime] = useState(600) // 10 minutes in seconds
  const [blackTime, setBlackTime] = useState(600)
  const [isWhiteTurn, setIsWhiteTurn] = useState(true)
  const [gameStatus, setGameStatus] = useState('active')
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')
  const timerRef = useRef(null)
  const chatEndRef = useRef(null)

  // Timer effect
  useEffect(() => {
    if (gameStatus === 'active') {
      timerRef.current = setInterval(() => {
        if (isWhiteTurn) {
          setWhiteTime((prev) => {
            if (prev <= 0) {
              setGameStatus('black_wins')
              return 0
            }
            return prev - 1
          })
        } else {
          setBlackTime((prev) => {
            if (prev <= 0) {
              setGameStatus('white_wins')
              return 0
            }
            return prev - 1
          })
        }
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isWhiteTurn, gameStatus])

  // Auto scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getPieceSymbol = (piece) => {
    const symbols = {
      p: '♟',
      r: '♜',
      n: '♞',
      b: '♝',
      q: '♛',
      k: '♚',
      P: '♙',
      R: '♖',
      N: '♘',
      B: '♗',
      Q: '♕',
      K: '♔',
    }
    return symbols[piece] || piece
  }

  const onDrop = (sourceSquare, targetSquare) => {
    try {
      const gameCopy = new Chess(game.fen())
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // Always promote to queen for simplicity
      })

      if (move === null) return false

      // Check for captured piece
      if (move.captured) {
        const capturedPiece = move.captured
        const color = move.color === 'w' ? 'white' : 'black'
        setCapturedPieces((prev) => ({
          ...prev,
          [color]: [...prev[color], capturedPiece],
        }))
      }

      // Update move history
      const moveNotation = `${Math.floor(moveHistory.length / 2) + 1}.${move.color === 'w' ? '' : '..'}${move.san}`
      setMoveHistory((prev) => [...prev, { move, notation: moveNotation, color: move.color }])

      // Update game state
      setGame(gameCopy)
      setIsWhiteTurn(!isWhiteTurn)

      // Check game status
      if (gameCopy.isCheckmate()) {
        setGameStatus(move.color === 'w' ? 'white_wins' : 'black_wins')
      } else if (gameCopy.isDraw()) {
        setGameStatus('draw')
      } else if (gameCopy.isStalemate()) {
        setGameStatus('stalemate')
      }

      return true
    } catch (error) {
      return false
    }
  }

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          user: 'You',
          message: chatInput,
          timestamp: new Date().toLocaleTimeString(),
        },
      ])
      setChatInput('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const resetGame = () => {
    setGame(new Chess())
    setMoveHistory([])
    setCapturedPieces({ white: [], black: [] })
    setWhiteTime(600)
    setBlackTime(600)
    setIsWhiteTurn(true)
    setGameStatus('active')
  }

  return (
    <Container maxWidth={false} sx={{ py: 3, height: '100vh', overflow: 'hidden' }}>
      <Grid container spacing={3} sx={{ height: '100%' }}>
        {/* Left Panel - Board and Timers */}
        <Grid item xs={12} md={8}>
          <Stack spacing={2} sx={{ height: '100%' }}>
            {/* Top Timer - Black */}
            <Paper
              elevation={3}
              sx={{
                p: 2,
                background: isWhiteTurn ? '#f5f5f5' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: isWhiteTurn ? '#000' : '#fff',
                transition: 'all 0.3s',
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <TimerIcon />
                  <Typography variant="h6" fontWeight="bold">
                    Black
                  </Typography>
                </Stack>
                <Typography variant="h5" fontWeight="bold" fontFamily="monospace">
                  {formatTime(blackTime)}
                </Typography>
              </Stack>
            </Paper>

            {/* Chess Board */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                minHeight: 0,
              }}
            >
              <Box sx={{ width: '100%', maxWidth: '600px', aspectRatio: '1' }}>
                <Chessboard
                  position={game.fen()}
                  onPieceDrop={onDrop}
                  boardOrientation="white"
                  customBoardStyle={{
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  }}
                />
              </Box>
            </Box>

            {/* Bottom Timer - White */}
            <Paper
              elevation={3}
              sx={{
                p: 2,
                background: isWhiteTurn ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f5f5f5',
                color: isWhiteTurn ? '#fff' : '#000',
                transition: 'all 0.3s',
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <TimerIcon />
                  <Typography variant="h6" fontWeight="bold">
                    White
                  </Typography>
                </Stack>
                <Typography variant="h5" fontWeight="bold" fontFamily="monospace">
                  {formatTime(whiteTime)}
                </Typography>
              </Stack>
            </Paper>

            {/* Game Status */}
            {gameStatus !== 'active' && (
              <Paper elevation={3} sx={{ p: 2, bgcolor: 'warning.light' }}>
                <Typography variant="h6" textAlign="center" fontWeight="bold">
                  {gameStatus === 'white_wins' && 'White Wins! 🎉'}
                  {gameStatus === 'black_wins' && 'Black Wins! 🎉'}
                  {gameStatus === 'draw' && 'Draw! 🤝'}
                  {gameStatus === 'stalemate' && 'Stalemate! 🤝'}
                </Typography>
                <Button fullWidth variant="contained" onClick={resetGame} sx={{ mt: 1 }}>
                  New Game
                </Button>
              </Paper>
            )}

            {/* Captured Pieces */}
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                Captured Pieces
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {capturedPieces.black.map((piece, idx) => (
                  <Chip
                    key={`black-${idx}`}
                    label={getPieceSymbol(piece.toUpperCase())}
                    size="small"
                    sx={{ fontSize: '1.2rem', height: '32px' }}
                  />
                ))}
                {capturedPieces.white.map((piece, idx) => (
                  <Chip
                    key={`white-${idx}`}
                    label={getPieceSymbol(piece)}
                    size="small"
                    sx={{ fontSize: '1.2rem', height: '32px' }}
                  />
                ))}
                {capturedPieces.white.length === 0 && capturedPieces.black.length === 0 && (
                  <Typography variant="body2" color="text.secondary">
                    No pieces captured yet
                  </Typography>
                )}
              </Stack>
            </Paper>
          </Stack>
        </Grid>

        {/* Right Panel - History and Chat */}
        <Grid item xs={12} md={4}>
          <Stack spacing={2} sx={{ height: '100%' }}>
            {/* Move History */}
            <Paper elevation={3} sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6" fontWeight="bold">
                  Move History
                </Typography>
              </Box>
              <Box sx={{ flex: 1, overflow: 'auto', p: 1 }}>
                <List dense>
                  {moveHistory.length === 0 ? (
                    <ListItem>
                      <ListItemText
                        primary="No moves yet"
                        primaryTypographyProps={{ color: 'text.secondary', variant: 'body2' }}
                      />
                    </ListItem>
                  ) : (
                    moveHistory.map((item, idx) => (
                      <ListItem
                        key={idx}
                        sx={{
                          bgcolor: item.color === 'w' ? 'action.hover' : 'background.paper',
                          borderRadius: 1,
                          mb: 0.5,
                        }}
                      >
                        <ListItemText
                          primary={item.notation}
                          primaryTypographyProps={{
                            fontFamily: 'monospace',
                            fontSize: '0.9rem',
                          }}
                        />
                      </ListItem>
                    ))
                  )}
                </List>
              </Box>
            </Paper>

            {/* Chat */}
            <Paper elevation={3} sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6" fontWeight="bold">
                  Chat
                </Typography>
              </Box>
              <Box sx={{ flex: 1, overflow: 'auto', p: 1 }}>
                {chatMessages.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
                    No messages yet. Start chatting!
                  </Typography>
                ) : (
                  <Stack spacing={1}>
                    {chatMessages.map((msg) => (
                      <Box
                        key={msg.id}
                        sx={{
                          p: 1.5,
                          borderRadius: 1,
                          bgcolor: 'action.hover',
                        }}
                      >
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {msg.user}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {msg.timestamp}
                          </Typography>
                        </Stack>
                        <Typography variant="body2">{msg.message}</Typography>
                      </Box>
                    ))}
                    <div ref={chatEndRef} />
                  </Stack>
                )}
              </Box>
              <Divider />
              <Box sx={{ p: 1.5 }}>
                <Stack direction="row" spacing={1}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Type a message..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <IconButton
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim()}
                    sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
                  >
                    <SendIcon />
                  </IconButton>
                </Stack>
              </Box>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Game
