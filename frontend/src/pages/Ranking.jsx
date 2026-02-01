import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  AppBar,
  Toolbar,
  Button,
  Stack,
  Chip,
  Avatar,
  Tabs,
  Tab,
} from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

function Ranking() {
  const navigate = useNavigate()
  const [tabValue, setTabValue] = useState(0)

  // Mock data - Replace with actual API call
  const rankings = [
    { rank: 1, username: 'Grandmaster_Pro', rating: 2850, wins: 1245, losses: 89, draws: 156, avatar: '👑' },
    { rank: 2, username: 'ChessMaster2024', rating: 2750, wins: 1120, losses: 120, draws: 180, avatar: '🥇' },
    { rank: 3, username: 'KingOfChess', rating: 2700, wins: 980, losses: 145, draws: 175, avatar: '🥈' },
    { rank: 4, username: 'CheckmateQueen', rating: 2650, wins: 890, losses: 156, draws: 154, avatar: '🥉' },
    { rank: 5, username: 'PawnStorm', rating: 2600, wins: 850, losses: 178, draws: 172, avatar: '♟️' },
    { rank: 6, username: 'BishopPower', rating: 2550, wins: 780, losses: 190, draws: 130, avatar: '♝' },
    { rank: 7, username: 'RookMaster', rating: 2500, wins: 720, losses: 200, draws: 180, avatar: '♜' },
    { rank: 8, username: 'KnightRider', rating: 2450, wins: 680, losses: 220, draws: 100, avatar: '♞' },
    { rank: 9, username: 'QueenBee', rating: 2400, wins: 650, losses: 250, draws: 100, avatar: '♛' },
    { rank: 10, username: 'ChessNovice', rating: 2350, wins: 600, losses: 280, draws: 120, avatar: '♚' },
  ]

  const getRankColor = (rank) => {
    if (rank === 1) return '#FFD700' // Gold
    if (rank === 2) return '#C0C0C0' // Silver
    if (rank === 3) return '#CD7F32' // Bronze
    return 'inherit'
  }

  const getRankIcon = (rank) => {
    if (rank === 1) return '👑'
    if (rank === 2) return '🥇'
    if (rank === 3) return '🥈'
    return null
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Navigation Bar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#1a1a1a' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            ♟️ Chess Lover
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button color="inherit" onClick={() => navigate('/')}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Log In
            </Button>
            <Button
              variant="contained"
              startIcon={<PlayArrowIcon />}
              sx={{
                bgcolor: '#667eea',
                '&:hover': { bgcolor: '#5568d3' },
              }}
              onClick={() => navigate('/game')}
            >
              Play Now
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mb: 2 }}>
            <EmojiEventsIcon sx={{ fontSize: 48, color: '#FFD700' }} />
            <Typography variant="h3" component="h1" fontWeight={700}>
              Leaderboard
            </Typography>
          </Stack>
          <Typography variant="h6" color="text.secondary">
            Top players ranked by rating
          </Typography>
        </Box>

        {/* Tabs */}
        <Box sx={{ mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="All Time" />
            <Tab label="This Month" />
            <Tab label="This Week" />
          </Tabs>
        </Box>

        {/* Rankings Table */}
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Rank</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Player</TableCell>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>
                  Rating
                </TableCell>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>
                  Wins
                </TableCell>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>
                  Losses
                </TableCell>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>
                  Draws
                </TableCell>
                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>
                  Win Rate
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rankings.map((player) => {
                const totalGames = player.wins + player.losses + player.draws
                const winRate = totalGames > 0 ? ((player.wins / totalGames) * 100).toFixed(1) : 0

                return (
                  <TableRow
                    key={player.rank}
                    sx={{
                      '&:hover': { bgcolor: 'action.hover' },
                      bgcolor: player.rank <= 3 ? 'action.selected' : 'inherit',
                    }}
                  >
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 'bold',
                            color: getRankColor(player.rank),
                            minWidth: '30px',
                          }}
                        >
                          {getRankIcon(player.rank) || `#${player.rank}`}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>{player.avatar}</Avatar>
                        <Typography variant="body1" fontWeight={500}>
                          {player.username}
                        </Typography>
                        {player.rank <= 3 && (
                          <Chip
                            label={player.rank === 1 ? 'Champion' : player.rank === 2 ? 'Runner-up' : '3rd Place'}
                            size="small"
                            color="primary"
                          />
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={player.rating}
                        color={player.rating >= 2700 ? 'error' : player.rating >= 2500 ? 'warning' : 'default'}
                        sx={{ fontWeight: 'bold' }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography color="success.main" fontWeight={500}>
                        {player.wins}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography color="error.main" fontWeight={500}>
                        {player.losses}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography color="text.secondary" fontWeight={500}>
                        {player.draws}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        fontWeight={600}
                        sx={{
                          color: winRate >= 70 ? 'success.main' : winRate >= 50 ? 'warning.main' : 'error.main',
                        }}
                      >
                        {winRate}%
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Back Button */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            sx={{
              borderColor: '#667eea',
              color: '#667eea',
              '&:hover': {
                borderColor: '#5568d3',
                bgcolor: 'rgba(102, 126, 234, 0.1)',
              },
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default Ranking
