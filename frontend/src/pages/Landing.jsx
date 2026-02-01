import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
  Paper,
  AppBar,
  Toolbar,
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import PeopleIcon from '@mui/icons-material/People'
import SpeedIcon from '@mui/icons-material/Speed'
import { Chessboard } from 'react-chessboard'

function Landing() {
  const navigate = useNavigate()

  const features = [
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'Fast Games',
      description: 'Play quick games with time controls',
    },
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
      title: 'Ranked Matches',
      description: 'Compete and climb the leaderboard',
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      title: 'Play with Friends',
      description: 'Challenge your friends to a game',
    },
  ]

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Navigation Bar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#1a1a1a' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            ♟️ Chess Lover
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button color="inherit" onClick={() => navigate('/puzzle')}>
              Puzzles
            </Button>
            <Button color="inherit" onClick={() => navigate('/news')}>
              News
            </Button>
            <Button color="inherit" onClick={() => navigate('/forum')}>
              Forum
            </Button>
            <Button color="inherit" onClick={() => navigate('/ranking')}>
              Rankings
            </Button>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Log In
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#667eea',
                '&:hover': { bgcolor: '#5568d3' },
              }}
              onClick={() => navigate('/register')}
            >
              Sign Up
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ py: 8, alignItems: 'center' }}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                mb: 3,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Play Chess Online
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
              Join millions of players worldwide. Play chess for free, challenge friends, and improve your skills.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                startIcon={<PlayArrowIcon />}
                onClick={() => navigate('/game')}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5568d3 0%, #6a3d8f 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                  },
                  transition: 'all 0.3s',
                }}
              >
                Play Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/bot-game')}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  borderColor: '#667eea',
                  color: '#667eea',
                  '&:hover': {
                    borderColor: '#5568d3',
                    bgcolor: 'rgba(102, 126, 234, 0.1)',
                  },
                }}
              >
                Play vs Bot
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/ranking')}
                sx={{
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  borderColor: '#667eea',
                  color: '#667eea',
                  '&:hover': {
                    borderColor: '#5568d3',
                    bgcolor: 'rgba(102, 126, 234, 0.1)',
                  },
                }}
              >
                View Rankings
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Paper
                elevation={8}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: '#f5f5f5',
                }}
              >
                <Box sx={{ width: '100%', maxWidth: '400px', aspectRatio: '1' }}>
                  <Chessboard
                    position="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
                    boardOrientation="white"
                    customBoardStyle={{
                      borderRadius: '8px',
                    }}
                  />
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        {/* Features Section */}
        <Box sx={{ py: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            sx={{ mb: 6, fontWeight: 700 }}
          >
            Why Play Chess Lover?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  elevation={3}
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        color: 'primary.main',
                        mb: 2,
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom fontWeight={600}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            py: 8,
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 4,
            color: 'white',
            mb: 8,
          }}
        >
          <Typography variant="h3" component="h2" sx={{ mb: 2, fontWeight: 700 }}>
            Ready to Play?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of players and start your chess journey today
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<PlayArrowIcon />}
            onClick={() => navigate('/game')}
            sx={{
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              bgcolor: 'white',
              color: '#667eea',
              '&:hover': {
                bgcolor: '#f5f5f5',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
              },
              transition: 'all 0.3s',
            }}
          >
            Start Playing Now
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 4,
          bgcolor: '#1a1a1a',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2">
          © 2024 Chess Lover. All rights reserved.
        </Typography>
      </Box>
    </Box>
  )
}

export default Landing
