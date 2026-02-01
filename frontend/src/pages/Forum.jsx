import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
  AppBar,
  Toolbar,
  Button,
  Paper,
  Avatar,
  TextField,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import ForumIcon from '@mui/icons-material/Forum'
import AddIcon from '@mui/icons-material/Add'
import PersonIcon from '@mui/icons-material/Person'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CommentIcon from '@mui/icons-material/Comment'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

// Mock forum questions data
const mockQuestions = [
  {
    id: 1,
    title: 'Làm thế nào để cải thiện khả năng tính toán trong cờ vua?',
    content: 'Tôi đang gặp khó khăn trong việc tính toán các biến thể. Có ai có lời khuyên không?',
    author: 'ChessBeginner',
    authorAvatar: '👤',
    date: '2024-02-15',
    views: 245,
    answers: 12,
    upvotes: 18,
    category: 'Học tập',
    tags: ['kỹ thuật', 'cải thiện'],
    isSolved: false,
  },
  {
    id: 2,
    title: 'Chiến thuật nào tốt nhất để chơi với màu đen?',
    content: 'Tôi luôn cảm thấy khó khăn khi chơi với màu đen. Có ai có thể chia sẻ chiến thuật không?',
    author: 'BlackPlayer',
    authorAvatar: '♟️',
    date: '2024-02-14',
    views: 189,
    answers: 8,
    upvotes: 15,
    category: 'Chiến thuật',
    tags: ['màu đen', 'chiến thuật'],
    isSolved: true,
  },
  {
    id: 3,
    title: 'Giải thích về quy tắc En Passant',
    content: 'Tôi không hiểu rõ về quy tắc En Passant. Ai có thể giải thích chi tiết không?',
    author: 'NewPlayer',
    authorAvatar: '🎓',
    date: '2024-02-13',
    views: 156,
    answers: 6,
    upvotes: 10,
    category: 'Luật chơi',
    tags: ['en passant', 'luật'],
    isSolved: true,
  },
  {
    id: 4,
    title: 'Cách phòng thủ tốt nhất khi bị tấn công?',
    content: 'Khi đối phương tấn công mạnh, tôi nên làm gì để phòng thủ hiệu quả?',
    author: 'DefenseSeeker',
    authorAvatar: '🛡️',
    date: '2024-02-12',
    views: 203,
    answers: 9,
    upvotes: 12,
    category: 'Chiến thuật',
    tags: ['phòng thủ', 'tấn công'],
    isSolved: false,
  },
  {
    id: 5,
    title: 'Nên học khai cuộc nào trước?',
    content: 'Tôi là người mới bắt đầu. Khai cuộc nào dễ học và hiệu quả nhất?',
    author: 'OpeningLearner',
    authorAvatar: '📚',
    date: '2024-02-11',
    views: 312,
    answers: 15,
    upvotes: 25,
    category: 'Khai cuộc',
    tags: ['khai cuộc', 'người mới'],
    isSolved: true,
  },
  {
    id: 6,
    title: 'Làm sao để nhớ các thế cờ?',
    content: 'Tôi muốn học các thế cờ nhưng khó nhớ. Có phương pháp nào hiệu quả không?',
    author: 'MemoryHelper',
    authorAvatar: '🧠',
    date: '2024-02-10',
    views: 178,
    answers: 7,
    upvotes: 9,
    category: 'Học tập',
    tags: ['ghi nhớ', 'thế cờ'],
    isSolved: false,
  },
]

const categories = ['Tất cả', 'Học tập', 'Chiến thuật', 'Luật chơi', 'Khai cuộc', 'Trung cuộc', 'Tàn cuộc']

function Forum() {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState(mockQuestions)
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    content: '',
    category: 'Học tập',
    tags: '',
  })

  const filteredQuestions =
    selectedCategory === 0
      ? questions
      : questions.filter((q) => q.category === categories[selectedCategory])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Hôm nay'
    if (diffDays === 1) return 'Hôm qua'
    if (diffDays < 7) return `${diffDays} ngày trước`
    return date.toLocaleDateString('vi-VN')
  }

  const handleCreateQuestion = () => {
    if (newQuestion.title.trim() && newQuestion.content.trim()) {
      const question = {
        id: questions.length + 1,
        title: newQuestion.title,
        content: newQuestion.content,
        author: 'You',
        authorAvatar: '👤',
        date: new Date().toISOString().split('T')[0],
        views: 0,
        answers: 0,
        upvotes: 0,
        category: newQuestion.category,
        tags: newQuestion.tags.split(',').map((t) => t.trim()),
        isSolved: false,
      }
      setQuestions([question, ...questions])
      setNewQuestion({ title: '', content: '', category: 'Học tập', tags: '' })
      setOpenDialog(false)
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Học tập': 'primary',
      'Chiến thuật': 'success',
      'Luật chơi': 'warning',
      'Khai cuộc': 'info',
      'Trung cuộc': 'error',
      'Tàn cuộc': 'secondary',
    }
    return colors[category] || 'default'
  }

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
            <Button color="inherit" onClick={() => navigate('/game')}>
              Play Game
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Hỏi & Đáp về Cờ Vua
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5568d3 0%, #6a3d8f 100%)',
                },
              }}
            >
              Đặt Câu Hỏi
            </Button>
          </Stack>
          <Typography variant="body1" color="text.secondary">
            Chia sẻ kiến thức, đặt câu hỏi và học hỏi từ cộng đồng cờ vua
          </Typography>
        </Box>

        {/* Categories */}
        <Paper elevation={2} sx={{ mb: 3, p: 1 }}>
          <Tabs
            value={selectedCategory}
            onChange={(e, newValue) => setSelectedCategory(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {categories.map((cat, index) => (
              <Tab key={index} label={cat} />
            ))}
          </Tabs>
        </Paper>

        {/* Questions List */}
        <Stack spacing={2}>
          {filteredQuestions.length === 0 ? (
            <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                Chưa có câu hỏi nào trong danh mục này
              </Typography>
            </Paper>
          ) : (
            filteredQuestions.map((question) => (
              <Card
                key={question.id}
                elevation={2}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    elevation: 4,
                    transform: 'translateY(-2px)',
                  },
                }}
                onClick={() => navigate(`/forum/${question.id}`)}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box sx={{ flex: 1 }}>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                          <Chip
                            label={question.category}
                            color={getCategoryColor(question.category)}
                            size="small"
                          />
                          {question.isSolved && (
                            <Chip label="Đã giải quyết" color="success" size="small" />
                          )}
                        </Stack>
                        <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom>
                          {question.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {question.content}
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {question.tags.map((tag, idx) => (
                            <Chip key={idx} label={tag} size="small" variant="outlined" />
                          ))}
                        </Stack>
                      </Box>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: 2 }}>
                        <Stack alignItems="center">
                          <ThumbUpIcon fontSize="small" color="action" />
                          <Typography variant="caption">{question.upvotes}</Typography>
                        </Stack>
                      </Stack>
                    </Stack>

                    <Divider />

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                          {question.authorAvatar}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {question.author}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(question.date)}
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={3}>
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
                  </Stack>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      </Container>

      {/* Create Question Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Đặt Câu Hỏi Mới</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Tiêu đề câu hỏi"
              value={newQuestion.title}
              onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
              placeholder="Ví dụ: Làm thế nào để cải thiện kỹ năng cờ vua?"
            />
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Nội dung câu hỏi"
              value={newQuestion.content}
              onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
              placeholder="Mô tả chi tiết câu hỏi của bạn..."
            />
            <TextField
              select
              fullWidth
              label="Danh mục"
              value={newQuestion.category}
              onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })}
              SelectProps={{
                native: true,
              }}
            >
              {categories.slice(1).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Tags (phân cách bằng dấu phẩy)"
              value={newQuestion.tags}
              onChange={(e) => setNewQuestion({ ...newQuestion, tags: e.target.value })}
              placeholder="Ví dụ: kỹ thuật, cải thiện, người mới"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button
            variant="contained"
            onClick={handleCreateQuestion}
            disabled={!newQuestion.title.trim() || !newQuestion.content.trim()}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5568d3 0%, #6a3d8f 100%)',
              },
            }}
          >
            Đăng Câu Hỏi
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Forum
