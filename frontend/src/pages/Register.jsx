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
  Link as MuiLink,
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookIcon from '@mui/icons-material/Facebook'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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

  const validateForm = () => {
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    // TODO: Implement actual registration API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Navigate to login after successful registration
      navigate('/login')
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
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
              Create your account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Join Chess Lover and start playing today!
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
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
              autoComplete="username"
              sx={{ mb: 2.5 }}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              autoComplete="email"
              sx={{ mb: 2.5 }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password (min. 8 characters)"
              required
              autoComplete="new-password"
              sx={{ mb: 2.5 }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              autoComplete="new-password"
              sx={{ mb: 2 }}
            />

            <FormControlLabel
              control={<Checkbox required />}
              label={
                <Typography variant="body2">
                  I agree to the{' '}
                  <MuiLink
                    component={Link}
                    to="/terms"
                    sx={{ color: '#667eea', textDecoration: 'none' }}
                    onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
                    onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
                  >
                    Terms of Service
                  </MuiLink>
                  {' '}and{' '}
                  <MuiLink
                    component={Link}
                    to="/privacy"
                    sx={{ color: '#667eea', textDecoration: 'none' }}
                    onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
                    onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
                  >
                    Privacy Policy
                  </MuiLink>
                </Typography>
              }
              sx={{ mb: 3 }}
            />

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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign up'}
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link
                to="/login"
                style={{
                  color: '#667eea',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
                onMouseEnter={(e) => (e.target.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.target.style.textDecoration = 'none')}
              >
                Log in
              </Link>
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Or sign up with
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

export default Register
