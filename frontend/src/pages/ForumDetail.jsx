import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  AppBar,
  Toolbar,
  Button,
  Paper,
  Avatar,
  TextField,
  Divider,
  IconButton,
  Breadcrumbs,
  Link,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import ForumIcon from '@mui/icons-material/Forum'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SendIcon from '@mui/icons-material/Send'
import PersonIcon from '@mui/icons-material/Person'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CommentIcon from '@mui/icons-material/Comment'

// Mock data - In real app, this would come from API
const mockQuestion = {
  id: 1,
  title: 'Làm thế nào để cải thiện khả năng tính toán trong cờ vua?',
  content:
    'Tôi đang gặp khó khăn trong việc tính toán các biến thể. Tôi thường bỏ sót các nước đi quan trọng và không thể nhìn trước được nhiều nước. Có ai có lời khuyên hoặc phương pháp luyện tập nào hiệu quả không?',
  author: 'ChessBeginner',
  authorAvatar: '👤',
  date: '2024-02-15',
  views: 245,
  answers: 12,
  upvotes: 18,
  downvotes: 2,
  category: 'Học tập',
  tags: ['kỹ thuật', 'cải thiện'],
  isSolved: false,
}

const mockAnswers = [
  {
    id: 1,
    content:
      'Tôi khuyên bạn nên luyện tập giải puzzle cờ vua hàng ngày. Puzzle giúp bạn nhận biết các cơ hội chiến thuật và cải thiện khả năng tính toán. Bắt đầu với puzzle dễ và tăng dần độ khó.',
    author: 'TacticsMaster',
    authorAvatar: '🎯',
    date: '2024-02-15',
    upvotes: 15,
    downvotes: 0,
    isAccepted: true,
  },
  {
    id: 2,
    content:
      'Một cách khác là chơi cờ với thời gian dài hơn. Khi bạn có nhiều thời gian, hãy cố gắng tính toán nhiều biến thể trước khi đánh. Điều này giúp bạn phát triển thói quen suy nghĩ sâu hơn.',
    author: 'TimePlayer',
    authorAvatar: '⏰',
    date: '2024-02-15',
    upvotes: 8,
    downvotes: 1,
    isAccepted: false,
  },
  {
    id: 3,
    content:
      'Sử dụng công cụ phân tích như Stockfish để xem lại các ván cờ của bạn. So sánh nước đi của bạn với nước đi tốt nhất và tìm hiểu tại sao. Điều này giúp bạn học hỏi từ sai lầm.',
    author: 'Analyzer',
    authorAvatar: '📊',
    date: '2024-02-16',
    upvotes: 12,
    downvotes: 0,
    isAccepted: false,
  },
  {
    id: 4,
    content:
      'Tôi đồng ý với các ý kiến trên. Ngoài ra, hãy thử chơi cờ chậm và phân tích từng nước đi. Đừng vội vàng, hãy dành thời gian để suy nghĩ về tất cả các khả năng.',
    author: 'SlowChess',
    authorAvatar: '🐢',
    date: '2024-02-16',
    upvotes: 5,
    downvotes: 0,
    isAccepted: false,
  },
]

function ForumDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [question] = useState(mockQuestion)
  const [answers, setAnswers] = useState(mockAnswers)
  const [newAnswer, setNewAnswer] = useState('')
  const [upvotedAnswers, setUpvotedAnswers] = useState(new Set())
  const [downvotedAnswers, setDownvotedAnswers] = useState(new Set())

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleUpvote = (answerId) => {
    const newUpvoted = new Set(upvotedAnswers)
    const newDownvoted = new Set(downvotedAnswers)

    if (newUpvoted.has(answerId)) {
      newUpvoted.delete(answerId)
      setAnswers(
        answers.map((a) => (a.id === answerId ? { ...a, upvotes: a.upvotes - 1 } : a))
      )
    } else {
      if (newDownvoted.has(answerId)) {
        newDownvoted.delete(answerId)
        setAnswers(
          answers.map((a) =>
            a.id === answerId ? { ...a, upvotes: a.upvotes + 1, downvotes: a.downvotes - 1 } : a
          )
        )
      } else {
        setAnswers(
          answers.map((a) => (a.id === answerId ? { ...a, upvotes: a.upvotes + 1 } : a))
        )
      }
      newUpvoted.add(answerId)
    }

    setUpvotedAnswers(newUpvoted)
    setDownvotedAnswers(newDownvoted)
  }

  const handleDownvote = (answerId) => {
    const newUpvoted = new Set(upvotedAnswers)
    const newDownvoted = new Set(downvotedAnswers)

    if (newDownvoted.has(answerId)) {
      newDownvoted.delete(answerId)
      setAnswers(
        answers.map((a) => (a.id === answerId ? { ...a, downvotes: a.downvotes - 1 } : a))
      )
    } else {
      if (newUpvoted.has(answerId)) {
        newUpvoted.delete(answerId)
        setAnswers(
          answers.map((a) =>
            a.id === answerId ? { ...a, downvotes: a.downvotes + 1, upvotes: a.upvotes - 1 } : a
          )
        )
      } else {
        setAnswers(
          answers.map((a) => (a.id === answerId ? { ...a, downvotes: a.downvotes + 1 } : a))
        )
      }
      newDownvoted.add(answerId)
    }

    setUpvotedAnswers(newUpvoted)
    setDownvotedAnswers(newDownvoted)
  }

  const handleSubmitAnswer = () => {
    if (newAnswer.trim()) {
      const answer = {
        id: answers.length + 1,
        content: newAnswer,
        author: 'You',
        authorAvatar: '👤',
        date: new Date().toISOString().split('T')[0],
        upvotes: 0,
        downvotes: 0,
        isAccepted: false,
      }
      setAnswers([...answers, answer])
      setNewAnswer('')
    }
  }

  const sortedAnswers = [...answers].sort((a, b) => {
    if (a.isAccepted) return -1
    if (b.isAccepted) return 1
    return b.upvotes - a.upvotes
  })

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#1a1a1a' }}>
        <Toolbar>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ flexGrow: 1 }}>
            <ForumIcon />
            <Typography variant="h5" component="div" fontWeight="bold">
              Diễn Đàn Cờ Vua
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button color="inherit" startIcon={<HomeIcon />} onClick={() => navigate('/')}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate('/forum')}>
              Back to Forum
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link
            color="inherit"
            href="#"
            onClick={(e) => {
              e.preventDefault()
              navigate('/')
            }}
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <Link
            color="inherit"
            href="#"
            onClick={(e) => {
              e.preventDefault()
              navigate('/forum')
            }}
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          >
            <ForumIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Forum
          </Link>
          <Typography color="text.primary">{question.title}</Typography>
        </Breadcrumbs>

        <Grid container spacing={3}>
          {/* Question */}
          <Grid item xs={12}>
            <Card elevation={3}>
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip label={question.category} color="primary" size="small" />
                    {question.isSolved && (
                      <Chip
                        icon={<CheckCircleIcon />}
                        label="Đã giải quyết"
                        color="success"
                        size="small"
                      />
                    )}
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: 'auto' }}>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <VisibilityIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {question.views}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <CommentIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {question.answers}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>

                  <Typography variant="h4" component="h1" fontWeight="bold">
                    {question.title}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {question.tags.map((tag, idx) => (
                      <Chip key={idx} label={tag} size="small" variant="outlined" />
                    ))}
                  </Stack>

                  <Divider />

                  <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                    {question.content}
                  </Typography>

                  <Divider />

                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
                        {question.authorAvatar}
                      </Avatar>
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          {question.author}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <CalendarTodayIcon fontSize="small" color="action" />
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(question.date)}
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <IconButton size="small" onClick={() => {}}>
                        <ThumbUpIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="body2">{question.upvotes}</Typography>
                      <IconButton size="small" onClick={() => {}}>
                        <ThumbDownIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="body2">{question.downvotes}</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Answers */}
          <Grid item xs={12}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
              {answers.length} Câu Trả Lời
            </Typography>

            <Stack spacing={2}>
              {sortedAnswers.map((answer) => (
                <Card
                  key={answer.id}
                  elevation={2}
                  sx={{
                    borderLeft: answer.isAccepted ? '4px solid' : 'none',
                    borderColor: answer.isAccepted ? 'success.main' : 'transparent',
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={2}>
                      {answer.isAccepted && (
                        <Chip
                          icon={<CheckCircleIcon />}
                          label="Câu trả lời được chấp nhận"
                          color="success"
                          size="small"
                          sx={{ width: 'fit-content' }}
                        />
                      )}

                      <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.05rem' }}>
                        {answer.content}
                      </Typography>

                      <Divider />

                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                            {answer.authorAvatar}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {answer.author}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {formatDate(answer.date)}
                            </Typography>
                          </Box>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <IconButton
                            size="small"
                            onClick={() => handleUpvote(answer.id)}
                            color={upvotedAnswers.has(answer.id) ? 'primary' : 'default'}
                          >
                            <ThumbUpIcon fontSize="small" />
                          </IconButton>
                          <Typography variant="body2">{answer.upvotes}</Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleDownvote(answer.id)}
                            color={downvotedAnswers.has(answer.id) ? 'error' : 'default'}
                          >
                            <ThumbDownIcon fontSize="small" />
                          </IconButton>
                          <Typography variant="body2">{answer.downvotes}</Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>

          {/* Answer Form */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Trả Lời Câu Hỏi
              </Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  label="Câu trả lời của bạn"
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder="Chia sẻ kiến thức và kinh nghiệm của bạn..."
                />
                <Stack direction="row" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    startIcon={<SendIcon />}
                    onClick={handleSubmitAnswer}
                    disabled={!newAnswer.trim()}
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5568d3 0%, #6a3d8f 100%)',
                      },
                    }}
                  >
                    Đăng Trả Lời
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default ForumDetail
