import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  Alert,
  Divider,
  Stack,
  CircularProgress,
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookIcon from '@mui/icons-material/Facebook'

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // TODO: Implement actual login API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Navigate to game page after login
      navigate('/game')
    } catch (err) {
      setError('Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 2,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        },
      }}
    >
      <Card sx={{ maxWidth: 440, width: '100%', position: 'relative', zIndex: 1 }}>
        <CardContent sx={{ p: 6 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h1" component="h1" gutterBottom>
              Log in to Chess Lover
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Welcome back! Please enter your details.
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Username or Email"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username or email"
              required
              autoComplete="username"
              sx={{ mb: 2.5 }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              sx={{ mb: 2 }}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              <FormControlLabel
                control={<Checkbox />}
                label="Remember me"
                sx={{ m: 0 }}
              />
              <Link
                to="/forgot-password"
                style={{
                  color: '#667eea',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
                onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
              >
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mb: 3,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5568d3 0%, #6a3d8f 100%)',
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Log in'}
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link
                to="/register"
                style={{
                  color: '#667eea',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
                onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
              >
                Sign up
              </Link>
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Or continue with
            </Typography>
          </Divider>

          <Stack direction="row" spacing={1.5}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{
                borderColor: '#e5e7eb',
                color: '#374151',
                '&:hover': {
                  borderColor: '#d1d5db',
                  backgroundColor: '#f9fafb',
                },
              }}
            >
              Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FacebookIcon />}
              sx={{
                borderColor: '#e5e7eb',
                color: '#374151',
                '&:hover': {
                  borderColor: '#d1d5db',
                  backgroundColor: '#f9fafb',
                },
              }}
            >
              Facebook
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Login
