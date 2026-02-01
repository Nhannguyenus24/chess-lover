import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setEmail(e.target.value)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)

    // TODO: Implement actual password reset API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Failed to send reset email. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
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
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 3,
                }}
              >
                <CheckCircleIcon
                  sx={{
                    fontSize: 64,
                    color: 'success.main',
                    backgroundColor: 'success.light',
                    borderRadius: '50%',
                    p: 1,
                    opacity: 0.1,
                  }}
                />
              </Box>
              <Typography variant="h1" component="h1" gutterBottom>
                Check your email
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                We've sent a password reset link to <strong>{email}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Please check your inbox and click on the link to reset your password.
                If you don't see the email, check your spam folder.
              </Typography>
            </Box>

            <Button
              component={Link}
              to="/login"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mb: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5568d3 0%, #6a3d8f 100%)',
                },
              }}
            >
              Back to login
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Didn't receive the email?{' '}
                <Button
                  variant="text"
                  onClick={() => {
                    setSuccess(false)
                    setEmail('')
                  }}
                  sx={{
                    color: '#667eea',
                    textTransform: 'none',
                    fontWeight: 600,
                    p: 0,
                    minWidth: 'auto',
                    textDecoration: 'underline',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Resend
                </Button>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    )
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
              Reset your password
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Enter your email address and we'll send you a link to reset your password.
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
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
              autoComplete="email"
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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Send reset link'}
            </Button>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Remember your password?{' '}
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
        </CardContent>
      </Card>
    </Container>
  )
}

export default ForgotPassword
