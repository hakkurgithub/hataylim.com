const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin, isEditor } = require('../middleware/auth');

// Admin ana sayfası - Dashboard
router.get('/', isAuthenticated, (req, res) => {
  res.render('admin/dashboard', {
    title: 'Admin Panel - Hataylım Gazetesi',
    user: req.user
  });
});

// Login sayfası
router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/admin');
  }
  res.render('admin/login', {
    title: 'Admin Girişi - Hataylım Gazetesi',
    error: null
  });
});

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/');
  });
});

// Yeni haber ekleme sayfası
router.get('/articles/new', isAuthenticated, (req, res) => {
  res.render('admin/add-article', {
    title: 'Yeni Haber Ekle - Hataylım Gazetesi',
    user: req.user
  });
});

// Haber ekleme işlemi
router.post('/articles', isAuthenticated, async (req, res) => {
  try {
    const multer = require('multer');
    const path = require('path');
    const Article = require('../models/Article');
    
    // Multer konfigürasyonu
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'news-' + uniqueSuffix + path.extname(file.originalname));
      }
    });
    
    const upload = multer({
      storage: storage,
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
          cb(null, true);
        } else {
          cb(new Error('Sadece resim dosyaları yüklenebilir'), false);
        }
      }
    }).single('image');
    
    upload(req, res, async function(err) {
      if (err) {
        return res.status(400).render('admin/add-article', {
          title: 'Yeni Haber Ekle - Hataylım Gazetesi',
          user: req.user,
          error: err.message
        });
      }
      
      try {
        // Form verilerini al
        const { title, category, summary, content, author, tags, published, featured } = req.body;
        
        // Tags'i array'e çevir
        const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];
        
        // Article oluştur
        const articleData = {
          title,
          category,
          summary,
          content,
          author: author || req.user.fullName || 'Hataylım Gazetesi',
          tags: tagsArray,
          published: published === 'on',
          featured: featured === 'on',
          imageUrl: req.file ? `/uploads/${req.file.filename}` : '/uploads/default-news.jpg'
        };
        
        const article = await Article.create(articleData);
        
        res.redirect('/admin/articles?success=Haber başarıyla eklendi');
      } catch (error) {
        console.error('Article creation error:', error);
        res.status(400).render('admin/add-article', {
          title: 'Yeni Haber Ekle - Hataylım Gazetesi',
          user: req.user,
          error: 'Haber eklenirken bir hata oluştu: ' + error.message
        });
      }
    });
  } catch (error) {
    console.error('Admin article post error:', error);
    res.status(500).render('admin/add-article', {
      title: 'Yeni Haber Ekle - Hataylım Gazetesi',
      user: req.user,
      error: 'Sunucu hatası: ' + error.message
    });
  }
});

// Haber listesi sayfası (geçici - basit versiyon)
router.get('/articles', isAuthenticated, async (req, res) => {
  try {
    const Article = require('../models/Article');
    const articles = await Article.find().sort({ createdAt: -1 }).limit(20);
    
    res.render('admin/articles', {
      title: 'Haberler - Hataylım Gazetesi',
      user: req.user,
      articles,
      success: req.query.success || null
    });
  } catch (error) {
    console.error('Articles list error:', error);
    res.status(500).send('Haberler yüklenirken hata oluştu');
  }
});

// Kategoriler sayfası (placeholder)
router.get('/categories', isAuthenticated, (req, res) => {
  res.send('Kategoriler sayfası - Yakında eklenecek');
});

// Kullanıcılar sayfası (sadece admin)
router.get('/users', isAdmin, (req, res) => {
  res.send('Kullanıcılar sayfası - Yakında eklenecek');
});

// Ayarlar sayfası (sadece admin)
router.get('/settings', isAdmin, (req, res) => {
  res.send('Ayarlar sayfası - Yakında eklenecek');
});

module.exports = router;
