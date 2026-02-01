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
  Button,
  Chip,
  Stack,
  Divider,
  Grid,
  Alert,
  CircularProgress,
  AppBar,
  Toolbar,
} from '@mui/material'
import TimerIcon from '@mui/icons-material/Timer'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import HomeIcon from '@mui/icons-material/Home'
import { useNavigate } from 'react-router-dom'

function BotGame() {
  const navigate = useNavigate()
  const [game, setGame] = useState(new Chess())
  const [moveHistory, setMoveHistory] = useState([])
  const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] })
  const [whiteTime, setWhiteTime] = useState(600) // 10 minutes in seconds
  const [blackTime, setBlackTime] = useState(600)
  const [isWhiteTurn, setIsWhiteTurn] = useState(true) // Player is white, bot is black
  const [gameStatus, setGameStatus] = useState('active')
  const [botMessages, setBotMessages] = useState([])
  const [isBotThinking, setIsBotThinking] = useState(false)
  const timerRef = useRef(null)
  const chatEndRef = useRef(null)

  // Initialize bot message
  useEffect(() => {
    setBotMessages([
      {
        id: Date.now(),
        user: 'Chess Bot',
        message: 'Chào bạn! Tôi là Chess Bot. Bạn chơi trắng, tôi chơi đen. Hãy bắt đầu ván cờ nhé! ♟️',
        timestamp: new Date().toLocaleTimeString(),
      },
    ])
  }, [])

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
  }, [botMessages])

  // Bot makes move when it's black's turn
  useEffect(() => {
    if (!isWhiteTurn && gameStatus === 'active' && !isBotThinking) {
      makeBotMove()
    }
  }, [isWhiteTurn, gameStatus])

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

  // Simple bot AI - evaluates moves and picks the best one
  const evaluatePosition = (game) => {
    const fen = game.fen()
    let score = 0

    // Piece values
    const pieceValues = {
      p: 1,
      r: 5,
      n: 3,
      b: 3,
      q: 9,
      k: 0,
    }

    // Count material
    for (let i = 0; i < fen.length; i++) {
      const char = fen[i]
      if (char in pieceValues) {
        score += pieceValues[char]
      } else if (char.toUpperCase() in pieceValues) {
        score -= pieceValues[char.toLowerCase()]
      }
    }

    // Check for checkmate
    if (game.isCheckmate()) {
      if (game.turn() === 'w') {
        score -= 1000 // Black wins
      } else {
        score += 1000 // White wins
      }
    }

    // Check for check
    if (game.isCheck()) {
      if (game.turn() === 'w') {
        score -= 10 // Black is checking
      } else {
        score += 10 // White is checking
      }
    }

    return score
  }

  // Get best move using minimax (simplified)
  const getBestMove = (game, depth = 2) => {
    const moves = game.moves({ verbose: true })
    if (moves.length === 0) return null

    let bestMove = null
    let bestScore = -Infinity

    for (const move of moves) {
      const gameCopy = new Chess(game.fen())
      gameCopy.move(move)

      const score = evaluatePosition(gameCopy)

      // Prefer captures
      if (move.captured) {
        const captureScore = score + 5
        if (captureScore > bestScore) {
          bestScore = captureScore
          bestMove = move
        }
      } else if (score > bestScore) {
        bestScore = score
        bestMove = move
      }
    }

    // If no good move found, pick random
    if (!bestMove) {
      bestMove = moves[Math.floor(Math.random() * moves.length)]
    }

    return bestMove
  }

  const makeBotMove = async () => {
    setIsBotThinking(true)

    // Simulate thinking time
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    try {
      const gameCopy = new Chess(game.fen())
      const bestMove = getBestMove(gameCopy)

      if (bestMove) {
        const move = gameCopy.move(bestMove)

        if (move) {
          // Check for captured piece
          if (move.captured) {
            const capturedPiece = move.captured
            setCapturedPieces((prev) => ({
              ...prev,
              black: [...prev.black, capturedPiece],
            }))
          }

          // Update move history
          const moveNotation = `${Math.floor(moveHistory.length / 2) + 1}...${move.san}`
          setMoveHistory((prev) => [...prev, { move, notation: moveNotation, color: move.color }])

          // Update game state
          setGame(gameCopy)
          setIsWhiteTurn(true)

          // Generate bot commentary
          generateBotCommentary(move, gameCopy)

          // Check game status
          if (gameCopy.isCheckmate()) {
            setGameStatus('black_wins')
            addBotMessage('🎉 Checkmate! Tôi đã thắng! Cảm ơn bạn đã chơi cùng tôi!')
          } else if (gameCopy.isDraw()) {
            setGameStatus('draw')
            addBotMessage('🤝 Hòa cờ! Ván cờ hay đấy!')
          } else if (gameCopy.isStalemate()) {
            setGameStatus('stalemate')
            addBotMessage('🤝 Stalemate! Ván cờ kết thúc hòa!')
          } else if (gameCopy.isCheck()) {
            addBotMessage('⚡ Chiếu! Bạn cần bảo vệ vua của mình!')
          }
        }
      }
    } catch (error) {
      console.error('Bot move error:', error)
    } finally {
      setIsBotThinking(false)
    }
  }

  const generateBotCommentary = (move, gameCopy) => {
    const commentaries = []

    // Check for captures
    if (move.captured) {
      commentaries.push(`Tôi đã bắt ${getPieceSymbol(move.captured.toUpperCase())}! Đó là một nước đi tốt.`)
    }

    // Check for check
    if (gameCopy.isCheck()) {
      commentaries.push('Tôi đang chiếu vua của bạn! Hãy cẩn thận!')
    }

    // Check for piece development
    if (move.piece === 'n' || move.piece === 'b') {
      commentaries.push('Tôi đang phát triển quân cờ. Thế trận đang thú vị!')
    }

    // Check for castling
    if (move.flags.includes('k') || move.flags.includes('q')) {
      commentaries.push('Tôi đã nhập thành để bảo vệ vua. An toàn hơn rồi!')
    }

    // Check for promotion
    if (move.promotion) {
      commentaries.push('Tôi đã phong tốt thành hậu! Mạnh mẽ hơn rồi!')
    }

    // Generic comments
    const genericComments = [
      'Nước đi của tôi! Hãy xem bạn sẽ làm gì tiếp theo.',
      'Thú vị! Tôi đang suy nghĩ về chiến lược tiếp theo.',
      'Ván cờ đang diễn ra tốt đẹp!',
      'Hãy xem bạn có thể đối phó với nước đi này không.',
    ]

    if (commentaries.length > 0) {
      addBotMessage(commentaries[0])
    } else {
      addBotMessage(genericComments[Math.floor(Math.random() * genericComments.length)])
    }
  }

  const addBotMessage = (message) => {
    setBotMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: 'Chess Bot',
        message,
        timestamp: new Date().toLocaleTimeString(),
      },
    ])
  }

  const onDrop = (sourceSquare, targetSquare) => {
    // Only allow player (white) to move
    if (!isWhiteTurn || gameStatus !== 'active' || isBotThinking) {
      return false
    }

    try {
      const gameCopy = new Chess(game.fen())
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      })

      if (move === null) {
        addBotMessage('Nước đi đó không hợp lệ. Hãy thử lại!')
        return false
      }

      // Check for captured piece
      if (move.captured) {
        const capturedPiece = move.captured
        setCapturedPieces((prev) => ({
          ...prev,
          white: [...prev.white, capturedPiece],
        }))
        addBotMessage(`Bạn đã bắt ${getPieceSymbol(move.captured)} của tôi! Nước đi tốt!`)
      } else {
        // Generic positive feedback
        const feedbacks = [
          'Nước đi hay! Tôi đang suy nghĩ...',
          'Tốt! Để tôi xem tôi sẽ làm gì tiếp theo.',
          'Nước đi thú vị! Tôi sẽ đáp trả ngay.',
        ]
        addBotMessage(feedbacks[Math.floor(Math.random() * feedbacks.length)])
      }

      // Update move history
      const moveNotation = `${Math.floor(moveHistory.length / 2) + 1}.${move.san}`
      setMoveHistory((prev) => [...prev, { move, notation: moveNotation, color: move.color }])

      // Update game state
      setGame(gameCopy)
      setIsWhiteTurn(false) // Bot's turn

      // Check game status
      if (gameCopy.isCheckmate()) {
        setGameStatus('white_wins')
        addBotMessage('🎉 Chúc mừng! Bạn đã thắng! Bạn chơi rất tốt!')
      } else if (gameCopy.isDraw()) {
        setGameStatus('draw')
        addBotMessage('🤝 Hòa cờ! Ván cờ hay đấy!')
      } else if (gameCopy.isStalemate()) {
        setGameStatus('stalemate')
        addBotMessage('🤝 Stalemate! Ván cờ kết thúc hòa!')
      } else if (gameCopy.isCheck()) {
        addBotMessage('⚡ Bạn đang chiếu tôi! Tôi cần bảo vệ vua!')
      }

      return true
    } catch (error) {
      addBotMessage('Có lỗi xảy ra. Vui lòng thử lại!')
      return false
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
    setBotMessages([
      {
        id: Date.now(),
        user: 'Chess Bot',
        message: 'Ván cờ mới! Bạn chơi trắng, tôi chơi đen. Hãy bắt đầu! ♟️',
        timestamp: new Date().toLocaleTimeString(),
      },
    ])
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Navigation Bar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#1a1a1a' }}>
        <Toolbar>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ flexGrow: 1 }}>
            <SmartToyIcon />
            <Typography variant="h5" component="div" fontWeight="bold">
              Play vs Bot
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button color="inherit" startIcon={<HomeIcon />} onClick={() => navigate('/')}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate('/game')}>
              Play Online
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth={false} sx={{ py: 3, height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
        <Grid container spacing={3} sx={{ height: '100%' }}>
          {/* Left Panel - Board and Timers */}
          <Grid item xs={12} md={8}>
            <Stack spacing={2} sx={{ height: '100%' }}>
              {/* Top Timer - Bot (Black) */}
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
                    {isBotThinking ? (
                      <CircularProgress size={20} sx={{ color: isWhiteTurn ? '#000' : '#fff' }} />
                    ) : (
                      <SmartToyIcon />
                    )}
                    <Typography variant="h6" fontWeight="bold">
                      Chess Bot (Black)
                    </Typography>
                    {isBotThinking && (
                      <Chip label="Đang suy nghĩ..." size="small" sx={{ ml: 1 }} />
                    )}
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
                  position: 'relative',
                }}
              >
                {isBotThinking && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 10,
                      bgcolor: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      p: 2,
                      borderRadius: 2,
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <CircularProgress size={24} sx={{ color: 'white' }} />
                      <Typography>Bot đang suy nghĩ...</Typography>
                    </Stack>
                  </Box>
                )}
                <Box sx={{ width: '100%', maxWidth: '600px', aspectRatio: '1' }}>
                  <Chessboard
                    position={game.fen()}
                    onPieceDrop={onDrop}
                    boardOrientation="white"
                    arePiecesDraggable={isWhiteTurn && gameStatus === 'active' && !isBotThinking}
                    customBoardStyle={{
                      borderRadius: '8px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                      opacity: isBotThinking ? 0.7 : 1,
                    }}
                  />
                </Box>
              </Box>

              {/* Bottom Timer - Player (White) */}
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
                      You (White)
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
                    {gameStatus === 'white_wins' && 'You Win! 🎉'}
                    {gameStatus === 'black_wins' && 'Bot Wins! 🤖'}
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

          {/* Right Panel - History and Bot Chat */}
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

              {/* Bot Chat */}
              <Paper elevation={3} sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <SmartToyIcon color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                      Bot Commentary
                    </Typography>
                  </Stack>
                </Box>
                <Box sx={{ flex: 1, overflow: 'auto', p: 1 }}>
                  {botMessages.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
                      Bot sẽ nhận xét về ván cờ...
                    </Typography>
                  ) : (
                    <Stack spacing={1}>
                      {botMessages.map((msg) => (
                        <Box
                          key={msg.id}
                          sx={{
                            p: 1.5,
                            borderRadius: 1,
                            bgcolor: 'primary.light',
                            color: 'primary.contrastText',
                          }}
                        >
                          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {msg.user}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.8 }}>
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
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default BotGame
