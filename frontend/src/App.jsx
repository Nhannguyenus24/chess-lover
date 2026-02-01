import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Game from './pages/Game'
import BotGame from './pages/BotGame'
import Landing from './pages/Landing'
import Ranking from './pages/Ranking'
import Puzzle from './pages/Puzzle'
import News from './pages/News'
import Forum from './pages/Forum'
import ForumDetail from './pages/ForumDetail'
import theme from './theme/theme'
import './App.css'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/game" element={<Game />} />
          <Route path="/bot-game" element={<BotGame />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/puzzle" element={<Puzzle />} />
          <Route path="/news" element={<News />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/:id" element={<ForumDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
