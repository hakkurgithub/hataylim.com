require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./config/passport');
const connectDB = require('./config/database');

// Express uygulamasını başlat
const app = express();

// MongoDB'ye bağlan
connectDB();

// Middleware'ler
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'hataylim-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    touchAfter: 24 * 3600 // 24 saatte bir güncelle
  }),
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 gün
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// View engine setup (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const articleRoutes = require('./routes/articles');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

app.use('/api/articles', articleRoutes);
app.use('/api/auth', authRoutes);
app.use('/admin', adminRoutes);

// Ana sayfa route
app.get('/', async (req, res) => {
  try {
    const Article = require('./models/Article');
    
    // Son haberler
    const latestNews = await Article.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(10);
    
    // Öne çıkan haberler
    const featuredNews = await Article.find({ published: true, featured: true })
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.render('index', {
      title: 'Hataylım Gazetesi - Bağımsız Türk Basını',
      latestNews,
      featuredNews
    });
  } catch (error) {
    res.status(500).send('Sunucu hatası: ' + error.message);
  }
});

// Kategori sayfaları
app.get('/kategori/:category', async (req, res) => {
  try {
    const Article = require('./models/Article');
    const { category } = req.params;
    
    const articles = await Article.find({ category, published: true })
      .sort({ createdAt: -1 })
      .limit(20);
    
    const categoryNames = {
      'siyaset': 'Siyaset',
      'spor': 'Spor',
      'sanat': 'Sanat',
      'genel': 'Genel',
      'ozel-haber': 'Özel Haber',
      'video-haber': 'Video Haber',
      'basarili-hataylilar': 'Başarılı Hataylılar',
      'eleman-is-arayan': 'Eleman ve İş Arayanlar',
      'yazi-yorum': 'Yazı Yorum'
    };
    
    res.render('category', {
      title: `${categoryNames[category]} - Hataylım Gazetesi`,
      category,
      categoryName: categoryNames[category],
      articles
    });
  } catch (error) {
    res.status(500).send('Sunucu hatası: ' + error.message);
  }
});

// Haber detay sayfası
app.get('/haber/:slug', async (req, res) => {
  try {
    const Article = require('./models/Article');
    const article = await Article.findOne({ slug: req.params.slug, published: true });
    
    if (!article) {
      return res.status(404).send('Haber bulunamadı');
    }
    
    // Görüntülenme sayısını artır
    article.views += 1;
    await article.save();
    
    // İlgili haberler
    const relatedNews = await Article.find({
      category: article.category,
      published: true,
      _id: { $ne: article._id }
    })
      .sort({ createdAt: -1 })
      .limit(4);
    
    res.render('article', {
      title: `${article.title} - Hataylım Gazetesi`,
      article,
      relatedNews
    });
  } catch (error) {
    res.status(500).send('Sunucu hatası: ' + error.message);
  }
});

// Admin paneli (Passport authentication ile)
const { isAuthenticated, isAdmin } = require('./middleware/auth');

app.get('/admin', isAuthenticated, (req, res) => {
  res.render('admin/dashboard', {
    title: 'Admin Panel - Hataylım Gazetesi',
    user: req.user
  });
});

app.get('/admin/login', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/admin');
  }
  res.render('admin/login', {
    title: 'Admin Girişi - Hataylım Gazetesi'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Sayfa Bulunamadı - Hataylım Gazetesi'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Bir şeyler ters gitti!');
});

// Server'ı başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║        🗞️  HATAYLIM GAZETESİ BACKEND SUNUCUSU  🗞️         ║
║                                                           ║
║  📡 Server: http://localhost:${PORT}                        ║
║  📊 API: http://localhost:${PORT}/api/articles              ║
║  🔐 Admin: http://localhost:${PORT}/admin                   ║
║                                                           ║
║  ✅ Node.js + Express + MongoDB                           ║
║  ✅ Mongoose ORM                                          ║
║  ✅ Multer (Resim Yükleme)                                ║
║  ✅ EJS Template Engine                                   ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
