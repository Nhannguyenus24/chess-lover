import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Stack,
  AppBar,
  Toolbar,
  Button,
  Paper,
  Divider,
  Avatar,
  Breadcrumbs,
  Link,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import ArticleIcon from '@mui/icons-material/Article'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PersonIcon from '@mui/icons-material/Person'
import { Chessboard } from 'react-chessboard'

// Mock articles data
const articles = [
  {
    id: 1,
    title: 'Lịch sử cờ vua: Từ Ấn Độ đến thế giới',
    excerpt:
      'Cờ vua có nguồn gốc từ Ấn Độ cổ đại, được gọi là Chaturanga. Bài viết này sẽ đưa bạn qua hành trình lịch sử của môn cờ vua từ thế kỷ thứ 6 đến ngày nay.',
    content: `
      <h2>Nguồn gốc cờ vua</h2>
      <p>Cờ vua, hay còn gọi là Chess, có nguồn gốc từ Ấn Độ cổ đại vào khoảng thế kỷ thứ 6 sau Công nguyên. Trò chơi ban đầu được gọi là Chaturanga, có nghĩa là "bốn phần" trong tiếng Sanskrit, đại diện cho bốn loại quân trong quân đội Ấn Độ cổ đại: bộ binh, kỵ binh, voi chiến, và xe chiến.</p>
      
      <h2>Sự phát triển qua các thời kỳ</h2>
      <p>Từ Ấn Độ, cờ vua lan truyền sang Ba Tư, nơi nó được gọi là Shatranj. Người Ả Rập đã học chơi cờ vua từ người Ba Tư và mang nó đến châu Âu trong thời kỳ xâm lược của họ. Ở châu Âu, cờ vua đã trải qua nhiều thay đổi về luật chơi và cách di chuyển của các quân cờ.</p>
      
      <h2>Cờ vua hiện đại</h2>
      <p>Vào thế kỷ 15, cờ vua đã phát triển thành hình thức gần giống với cờ vua hiện đại mà chúng ta biết ngày nay. Hậu và Tượng trở nên mạnh mẽ hơn, và luật nhập thành được thêm vào để bảo vệ vua tốt hơn.</p>
      
      <h2>Tầm quan trọng của cờ vua</h2>
      <p>Ngày nay, cờ vua không chỉ là một trò chơi giải trí mà còn là một môn thể thao trí tuệ được công nhận trên toàn thế giới. Nó giúp phát triển tư duy chiến lược, khả năng tập trung, và kỹ năng giải quyết vấn đề.</p>
    `,
    author: 'Chess Master',
    date: '2024-01-15',
    category: 'Lịch sử',
    image: 'history',
    readTime: '5 phút',
  },
  {
    id: 2,
    title: '10 Chiến thuật cờ vua cơ bản cho người mới bắt đầu',
    excerpt:
      'Học các chiến thuật cờ vua cơ bản là bước đầu tiên để trở thành một kỳ thủ giỏi. Bài viết này sẽ giới thiệu 10 chiến thuật quan trọng nhất mà mọi người chơi nên biết.',
    content: `
      <h2>1. Fork (Đâm xiên)</h2>
      <p>Fork là một chiến thuật trong đó một quân cờ tấn công hai hoặc nhiều quân cờ của đối phương cùng lúc. Quân cờ phổ biến nhất để fork là Mã, vì nó có thể nhảy qua các quân cờ khác.</p>
      
      <h2>2. Pin (Ghim)</h2>
      <p>Pin xảy ra khi một quân cờ không thể di chuyển vì sẽ để lộ một quân cờ quan trọng hơn (thường là Vua) cho đối phương tấn công.</p>
      
      <h2>3. Skewer (Xiên)</h2>
      <p>Skewer tương tự như Pin, nhưng trong trường hợp này, quân cờ quan trọng hơn bị tấn công trước, buộc phải di chuyển và để lộ quân cờ phía sau.</p>
      
      <h2>4. Discovered Attack (Tấn công ẩn)</h2>
      <p>Khi một quân cờ di chuyển, nó mở đường cho một quân cờ khác tấn công. Đây là một chiến thuật rất mạnh mẽ.</p>
      
      <h2>5. Double Attack (Tấn công kép)</h2>
      <p>Một quân cờ tấn công hai mục tiêu cùng lúc, buộc đối phương chỉ có thể bảo vệ một trong hai.</p>
      
      <h2>6. Back Rank Mate</h2>
      <p>Chiếu bí bằng cách tấn công vua ở hàng cuối cùng, thường xảy ra khi vua bị chặn bởi các quân cờ của chính mình.</p>
      
      <h2>7. Castling (Nhập thành)</h2>
      <p>Một nước đi phòng thủ quan trọng, giúp bảo vệ vua và phát triển xe.</p>
      
      <h2>8. En Passant</h2>
      <p>Một quy tắc đặc biệt cho phép tốt bắt tốt đối phương trong một số trường hợp cụ thể.</p>
      
      <h2>9. Promotion (Phong tốt)</h2>
      <p>Khi tốt đến cuối bàn cờ, nó có thể được phong thành bất kỳ quân cờ nào (trừ vua), thường là hậu.</p>
      
      <h2>10. Zugzwang</h2>
      <p>Một tình huống trong đó bất kỳ nước đi nào cũng làm xấu đi vị trí của người chơi.</p>
    `,
    author: 'Tactics Expert',
    date: '2024-01-20',
    category: 'Kỹ thuật',
    image: 'tactics',
    readTime: '8 phút',
  },
  {
    id: 3,
    title: 'Giải đấu cờ vua lớn nhất thế giới năm 2024',
    excerpt:
      'Tổng hợp các giải đấu cờ vua quốc tế lớn nhất trong năm 2024, từ World Chess Championship đến các giải Grand Prix.',
    content: `
      <h2>World Chess Championship 2024</h2>
      <p>Giải vô địch cờ vua thế giới là sự kiện quan trọng nhất trong năm. Năm 2024, giải đấu sẽ diễn ra tại một trong những thành phố lớn nhất thế giới, quy tụ các kỳ thủ hàng đầu.</p>
      
      <h2>Candidates Tournament</h2>
      <p>Giải đấu Candidates quyết định ai sẽ là đối thủ của nhà vô địch thế giới. Đây là một trong những giải đấu căng thẳng và kịch tính nhất.</p>
      
      <h2>Grand Prix Series</h2>
      <p>Chuỗi giải đấu Grand Prix diễn ra suốt năm, với các kỳ thủ cạnh tranh để giành điểm số và cơ hội tham gia các giải đấu lớn hơn.</p>
      
      <h2>Rapid & Blitz Championships</h2>
      <p>Các giải đấu cờ nhanh và cờ chớp nhoáng luôn thu hút sự chú ý với nhịp độ nhanh và kịch tính.</p>
      
      <h2>Olympiad 2024</h2>
      <p>Giải đấu đồng đội lớn nhất thế giới, quy tụ hàng trăm đội từ các quốc gia khác nhau.</p>
    `,
    author: 'Tournament Reporter',
    date: '2024-01-25',
    category: 'Giải đấu',
    image: 'tournament',
    readTime: '6 phút',
  },
  {
    id: 4,
    title: 'Cách cải thiện kỹ năng cờ vua của bạn',
    excerpt:
      'Những lời khuyên thực tế từ các chuyên gia để giúp bạn cải thiện trình độ cờ vua, từ việc học lý thuyết đến thực hành.',
    content: `
      <h2>1. Học lý thuyết cơ bản</h2>
      <p>Bắt đầu với các nguyên tắc cơ bản: kiểm soát trung tâm, phát triển quân cờ, và an toàn cho vua. Đây là nền tảng của mọi chiến lược cờ vua.</p>
      
      <h2>2. Luyện tập thường xuyên</h2>
      <p>Chơi cờ thường xuyên là cách tốt nhất để cải thiện. Hãy chơi ít nhất vài ván mỗi ngày, dù là với bạn bè hay online.</p>
      
      <h2>3. Phân tích các ván cờ</h2>
      <p>Sau mỗi ván cờ, hãy xem lại và phân tích các nước đi của bạn. Tìm ra những sai lầm và học hỏi từ chúng.</p>
      
      <h2>4. Học từ các ván cờ kinh điển</h2>
      <p>Nghiên cứu các ván cờ của các đại kiện tướng như Kasparov, Fischer, và Carlsen. Bạn sẽ học được nhiều chiến thuật và chiến lược hay.</p>
      
      <h2>5. Giải puzzle cờ vua</h2>
      <p>Giải các puzzle cờ vua giúp cải thiện khả năng nhận biết các cơ hội chiến thuật và tính toán các biến thể.</p>
      
      <h2>6. Sử dụng công cụ phân tích</h2>
      <p>Các công cụ như Stockfish có thể giúp bạn phân tích các ván cờ và tìm ra những nước đi tốt hơn.</p>
      
      <h2>7. Tham gia câu lạc bộ cờ vua</h2>
      <p>Tham gia một câu lạc bộ cờ vua địa phương để gặp gỡ các kỳ thủ khác, học hỏi và cải thiện kỹ năng của bạn.</p>
    `,
    author: 'Chess Coach',
    date: '2024-02-01',
    category: 'Học tập',
    image: 'improvement',
    readTime: '7 phút',
  },
  {
    id: 5,
    title: 'Những kỳ thủ vĩ đại nhất mọi thời đại',
    excerpt:
      'Khám phá cuộc đời và sự nghiệp của những kỳ thủ vĩ đại nhất trong lịch sử cờ vua, từ Morphy đến Carlsen.',
    content: `
      <h2>Garry Kasparov</h2>
      <p>Kasparov được coi là một trong những kỳ thủ vĩ đại nhất mọi thời đại. Ông giữ kỷ lục là nhà vô địch thế giới lâu nhất (1985-2000) và có rating cao nhất trong lịch sử.</p>
      
      <h2>Bobby Fischer</h2>
      <p>Fischer là kỳ thủ Mỹ duy nhất từng giành chức vô địch thế giới. Trận đấu của ông với Spassky năm 1972 được coi là "Trận đấu của thế kỷ".</p>
      
      <h2>Magnus Carlsen</h2>
      <p>Carlsen là nhà vô địch thế giới hiện tại và được nhiều người coi là kỳ thủ mạnh nhất trong lịch sử. Ông nổi tiếng với phong cách chơi linh hoạt và khả năng chơi cờ nhanh xuất sắc.</p>
      
      <h2>Anatoly Karpov</h2>
      <p>Karpov là nhà vô địch thế giới từ 1975-1985 và được biết đến với phong cách chơi vị trí cực kỳ chính xác.</p>
      
      <h2>José Capablanca</h2>
      <p>Capablanca được mệnh danh là "Máy chơi cờ vua" vì khả năng chơi cờ gần như không mắc lỗi. Ông là nhà vô địch thế giới từ 1921-1927.</p>
    `,
    author: 'Chess Historian',
    date: '2024-02-05',
    category: 'Nhân vật',
    image: 'legends',
    readTime: '10 phút',
  },
  {
    id: 6,
    title: 'Cờ vua và lợi ích cho sức khỏe tinh thần',
    excerpt:
      'Nghiên cứu khoa học cho thấy chơi cờ vua có nhiều lợi ích cho sức khỏe tinh thần, từ cải thiện trí nhớ đến giảm stress.',
    content: `
      <h2>Cải thiện trí nhớ</h2>
      <p>Chơi cờ vua thường xuyên giúp cải thiện trí nhớ ngắn hạn và dài hạn. Bạn phải nhớ các nước đi, các biến thể, và các chiến thuật.</p>
      
      <h2>Tăng cường khả năng tập trung</h2>
      <p>Cờ vua đòi hỏi sự tập trung cao độ. Việc luyện tập này giúp cải thiện khả năng tập trung trong các hoạt động khác của cuộc sống.</p>
      
      <h2>Phát triển tư duy chiến lược</h2>
      <p>Chơi cờ vua giúp phát triển khả năng suy nghĩ chiến lược, lập kế hoạch dài hạn, và dự đoán hậu quả của các hành động.</p>
      
      <h2>Giảm stress và lo âu</h2>
      <p>Nghiên cứu cho thấy chơi cờ vua có thể giúp giảm mức độ stress và lo âu bằng cách giúp tâm trí tập trung vào một hoạt động thú vị.</p>
      
      <h2>Cải thiện kỹ năng giải quyết vấn đề</h2>
      <p>Mỗi ván cờ là một bài toán cần giải quyết. Điều này giúp phát triển kỹ năng giải quyết vấn đề trong cuộc sống thực tế.</p>
      
      <h2>Tăng cường sự tự tin</h2>
      <p>Khi bạn cải thiện kỹ năng cờ vua và thắng các ván cờ, điều này giúp tăng cường sự tự tin và lòng tự trọng.</p>
    `,
    author: 'Health Expert',
    date: '2024-02-10',
    category: 'Sức khỏe',
    image: 'health',
    readTime: '6 phút',
  },
]

function News() {
  const navigate = useNavigate()
  const [selectedArticle, setSelectedArticle] = useState(null)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Lịch sử': 'primary',
      'Kỹ thuật': 'success',
      'Giải đấu': 'warning',
      'Học tập': 'info',
      'Nhân vật': 'error',
      'Sức khỏe': 'secondary',
    }
    return colors[category] || 'default'
  }

  if (selectedArticle) {
    const article = articles.find((a) => a.id === selectedArticle)
    if (!article) {
      setSelectedArticle(null)
      return null
    }

    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="static" elevation={0} sx={{ bgcolor: '#1a1a1a' }}>
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              ♟️ Chess Lover
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button color="inherit" onClick={() => setSelectedArticle(null)}>
                Back to News
              </Button>
              <Button color="inherit" startIcon={<HomeIcon />} onClick={() => navigate('/')}>
                Home
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ py: 4 }}>
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
                setSelectedArticle(null)
              }}
              sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
            >
              <ArticleIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              News
            </Link>
            <Typography color="text.primary">{article.title}</Typography>
          </Breadcrumbs>

          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Chip
              label={article.category}
              color={getCategoryColor(article.category)}
              sx={{ mb: 2 }}
            />
            <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
              {article.title}
            </Typography>
            <Stack direction="row" spacing={3} sx={{ mb: 3, flexWrap: 'wrap' }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <PersonIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {article.author}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CalendarTodayIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {formatDate(article.date)}
                </Typography>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {article.readTime} đọc
              </Typography>
            </Stack>
            <Divider sx={{ my: 3 }} />
            <Box
              sx={{
                '& h2': {
                  mt: 4,
                  mb: 2,
                  fontSize: '1.75rem',
                  fontWeight: 600,
                },
                '& p': {
                  mb: 2,
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                },
              }}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </Paper>

          <Button
            variant="outlined"
            onClick={() => setSelectedArticle(null)}
            sx={{ mb: 4 }}
          >
            ← Quay lại danh sách bài viết
          </Button>
        </Container>
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#1a1a1a' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            ♟️ Chess Lover
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
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <ArticleIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            Tin Tức Cờ Vua
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Khám phá thế giới cờ vua qua các bài viết chuyên sâu
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {articles.map((article) => (
            <Grid item xs={12} md={6} key={article.id}>
              <Card
                elevation={3}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
                onClick={() => setSelectedArticle(article.id)}
              >
                <Box
                  sx={{
                    height: 200,
                    bgcolor: 'primary.light',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Chessboard
                    position="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
                    boardWidth={200}
                    boardOrientation="white"
                    customBoardStyle={{
                      borderRadius: '4px',
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Chip
                      label={article.category}
                      color={getCategoryColor(article.category)}
                      size="small"
                    />
                    <Chip
                      label={article.readTime}
                      size="small"
                      variant="outlined"
                    />
                  </Stack>
                  <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {article.excerpt}
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{ mt: 'auto' }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main' }}>
                        <PersonIcon fontSize="small" />
                      </Avatar>
                      <Typography variant="caption" color="text.secondary">
                        {article.author}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <CalendarTodayIcon fontSize="small" color="action" />
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(article.date)}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default News
