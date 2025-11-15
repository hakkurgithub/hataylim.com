const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  getAllArticles,
  getArticleById,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticlesByCategory
} = require('../controllers/articleController');

// Multer storage konfigürasyonu (resim yükleme için)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'news-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Sadece resim dosyalarına izin ver
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Sadece resim dosyaları yüklenebilir'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Routes

// GET /api/articles - Tüm haberleri getir (filtreleme ile)
router.get('/', getAllArticles);

// GET /api/articles/category/:category - Kategoriye göre haberleri getir
router.get('/category/:category', getArticlesByCategory);

// GET /api/articles/slug/:slug - Slug ile haber getir
router.get('/slug/:slug', getArticleBySlug);

// GET /api/articles/:id - ID ile haber getir
router.get('/:id', getArticleById);

// POST /api/articles - Yeni haber oluştur (resim yükleme ile)
router.post('/', upload.single('image'), createArticle);

// PUT /api/articles/:id - Haber güncelle (resim yükleme ile)
router.put('/:id', upload.single('image'), updateArticle);

// DELETE /api/articles/:id - Haber sil
router.delete('/:id', deleteArticle);

module.exports = router;
