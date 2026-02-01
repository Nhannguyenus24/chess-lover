import { useState, useEffect, useRef } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  IconButton,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import RefreshIcon from '@mui/icons-material/Refresh'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CloseIcon from '@mui/icons-material/Close'
import HomeIcon from '@mui/icons-material/Home'
import { useNavigate } from 'react-router-dom'

// Puzzle data - Each puzzle has a position, solution, and objective
const puzzles = [
  {
    id: 1,
    title: 'Mate in 2',
    position: 'r1bqkb1r/pppp1Qpp/2n2n2/2B1p3/4P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4',
    solution: ['f6f7', 'e8e7', 'c5f8'],
    objective: 'Chiếu bí trong 2 nước',
    hint: 'Hãy tìm nước chiếu mạnh nhất!',
    difficulty: 'Easy',
  },
  {
    id: 2,
    title: 'Win Material',
    position: 'r1bqkb1r/pppp1ppp/2n2n2/2B1p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    solution: ['c5f8'],
    objective: 'Bắt quân và lấy lợi thế',
    hint: 'Có thể bắt quân giá trị!',
    difficulty: 'Medium',
  },
  {
    id: 3,
    title: 'Mate in 3',
    position: 'r1bqkb1r/pppp1Qpp/2n2n2/2B1p3/4P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4',
    solution: ['f6f7', 'e8e7', 'c5f8', 'e7d8', 'f8e8'],
    objective: 'Chiếu bí trong 3 nước',
    hint: 'Tập trung vào tấn công vua địch!',
    difficulty: 'Hard',
  },
  {
    id: 4,
    title: 'Tactical Win',
    position: 'r1bqkb1r/pppp1ppp/2n2n2/2B1p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
    solution: ['c5f8', 'e8f8', 'f3g5'],
    objective: 'Tìm nước đi chiến thuật tốt nhất',
    hint: 'Khai thác vị trí yếu của đối phương!',
    difficulty: 'Medium',
  },
]

function Puzzle() {
  const navigate = useNavigate()
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0)
  const [game, setGame] = useState(null)
  const [moveCount, setMoveCount] = useState(0)
  const [isSolved, setIsSolved] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [chatbotMessage, setChatbotMessage] = useState('')
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [userMoves, setUserMoves] = useState([])

  const currentPuzzle = puzzles[currentPuzzleIndex]

  useEffect(() => {
    initializePuzzle()
  }, [currentPuzzleIndex])

  const initializePuzzle = () => {
    const newGame = new Chess(currentPuzzle.position)
    setGame(newGame)
    setMoveCount(0)
    setIsSolved(false)
    setShowHint(false)
    setUserMoves([])
    setChatbotMessage(`Chào bạn! Đây là puzzle "${currentPuzzle.title}". ${currentPuzzle.objective}. Hãy thử giải nhé!`)
  }

  const onDrop = (sourceSquare, targetSquare) => {
    if (isSolved) return false

    try {
      const gameCopy = new Chess(game.fen())
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      })

      if (move === null) {
        setChatbotMessage('Nước đi này không hợp lệ. Hãy thử lại!')
        return false
      }

      const moveNotation = sourceSquare + targetSquare
      const newUserMoves = [...userMoves, moveNotation]
      setUserMoves(newUserMoves)
      setGame(gameCopy)
      setMoveCount(moveCount + 1)

      // Check if puzzle is solved
      checkSolution(newUserMoves)

      // Provide feedback based on move
      provideFeedback(moveNotation, newUserMoves)

      return true
    } catch (error) {
      setChatbotMessage('Có lỗi xảy ra. Vui lòng thử lại!')
      return false
    }
  }

  const checkSolution = (moves) => {
    const solution = currentPuzzle.solution
    let isCorrect = true

    // Check if all moves match the solution
    for (let i = 0; i < Math.min(moves.length, solution.length); i++) {
      if (moves[i] !== solution[i]) {
        isCorrect = false
        break
      }
    }

    // Check if puzzle is completely solved
    if (moves.length === solution.length && isCorrect) {
      setIsSolved(true)
      setChatbotMessage(`🎉 Tuyệt vời! Bạn đã giải đúng puzzle này! ${currentPuzzle.objective} đã được hoàn thành!`)
      setShowSuccessDialog(true)
    } else if (isCorrect && moves.length < solution.length) {
      setChatbotMessage('Tốt lắm! Tiếp tục với nước đi tiếp theo...')
    } else {
      setChatbotMessage('Hmm, nước đi này chưa đúng. Hãy suy nghĩ lại! 💭')
    }
  }

  const provideFeedback = (move, moves) => {
    const solution = currentPuzzle.solution
    const moveIndex = moves.length - 1

    if (moveIndex < solution.length && move === solution[moveIndex]) {
      if (moveIndex === solution.length - 1) {
        setChatbotMessage('🎯 Hoàn hảo! Bạn đã giải xong puzzle này!')
      } else {
        setChatbotMessage('Đúng rồi! Nước đi tốt! Tiếp tục...')
      }
    } else {
      // Provide hints based on the puzzle type
      if (currentPuzzle.objective.includes('Chiếu bí')) {
        setChatbotMessage('Hãy nghĩ về cách tấn công vua địch. Có thể bạn cần nhiều quân cờ hơn!')
      } else if (currentPuzzle.objective.includes('lấy lợi thế')) {
        setChatbotMessage('Hãy tìm cách bắt quân có giá trị hoặc tạo thế tấn công!')
      } else {
        setChatbotMessage('Hãy xem xét lại. Có thể có nước đi tốt hơn!')
      }
    }
  }

  const handleShowHint = () => {
    setShowHint(true)
    setChatbotMessage(`💡 Gợi ý: ${currentPuzzle.hint}`)
  }

  const handleNextPuzzle = () => {
    if (currentPuzzleIndex < puzzles.length - 1) {
      setCurrentPuzzleIndex(currentPuzzleIndex + 1)
    } else {
      setCurrentPuzzleIndex(0) // Loop back to first puzzle
    }
    setShowSuccessDialog(false)
  }

  const handleReset = () => {
    initializePuzzle()
  }

  if (!game) {
    return <Box>Loading...</Box>
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Navigation Bar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#1a1a1a' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            ♟️ Chess Puzzles
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button color="inherit" startIcon={<HomeIcon />} onClick={() => navigate('/')}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate('/game')}>
              Play Game
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Left Side - Puzzle Info and Chatbot */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* Puzzle Info */}
              <Card elevation={3}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5" fontWeight="bold">
                      {currentPuzzle.title}
                    </Typography>
                    <Chip
                      label={currentPuzzle.difficulty}
                      color={
                        currentPuzzle.difficulty === 'Easy'
                          ? 'success'
                          : currentPuzzle.difficulty === 'Medium'
                          ? 'warning'
                          : 'error'
                      }
                      size="small"
                    />
                  </Stack>
                  <Typography variant="body1" color="text.secondary" mb={2}>
                    {currentPuzzle.objective}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Puzzle {currentPuzzleIndex + 1} / {puzzles.length}
                  </Typography>
                </CardContent>
              </Card>

              {/* Chatbot */}
              <Card elevation={3} sx={{ minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    >
                      🤖
                    </Box>
                    <Typography variant="h6" fontWeight="bold">
                      Chess Bot
                    </Typography>
                  </Stack>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: 'action.hover',
                      borderRadius: 2,
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      minHeight: '200px',
                    }}
                  >
                    <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                      {chatbotMessage || 'Chào bạn! Hãy bắt đầu giải puzzle nhé!'}
                    </Typography>
                  </Paper>

                  {isSolved && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <CheckCircleIcon />
                        <Typography>Puzzle đã được giải!</Typography>
                      </Stack>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Stack spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<LightbulbIcon />}
                  onClick={handleShowHint}
                  disabled={isSolved}
                  fullWidth
                >
                  Xem Gợi ý
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={handleReset}
                  fullWidth
                >
                  Làm Lại
                </Button>
                {isSolved && (
                  <Button
                    variant="contained"
                    onClick={handleNextPuzzle}
                    fullWidth
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5568d3 0%, #6a3d8f 100%)',
                      },
                    }}
                  >
                    Puzzle Tiếp Theo
                  </Button>
                )}
              </Stack>

              {/* Progress */}
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Tiến Độ
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Số nước đã đi: {moveCount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Nước đi đúng: {userMoves.filter((m, i) => m === currentPuzzle.solution[i]).length} / {currentPuzzle.solution.length}
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* Right Side - Chess Board */}
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '600px',
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
          </Grid>
        </Grid>
      </Container>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onClose={() => setShowSuccessDialog(false)}>
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CheckCircleIcon color="success" />
            <Typography variant="h6">Chúc mừng!</Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Bạn đã giải đúng puzzle "{currentPuzzle.title}"! 🎉
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {currentPuzzle.objective} đã được hoàn thành trong {moveCount} nước đi.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSuccessDialog(false)}>Đóng</Button>
          <Button
            variant="contained"
            onClick={handleNextPuzzle}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5568d3 0%, #6a3d8f 100%)',
              },
            }}
          >
            Puzzle Tiếp Theo
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Puzzle
