const Article = require('../models/Article');

// Tüm haberleri getir
exports.getAllArticles = async (req, res) => {
  try {
    const { category, published, featured, limit = 20, page = 1 } = req.query;
    
    const query = {};
    if (category) query.category = category;
    if (published !== undefined) query.published = published === 'true';
    if (featured !== undefined) query.featured = featured === 'true';
    
    const articles = await Article.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    const total = await Article.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: articles.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: articles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Haberler getirilirken hata oluştu',
      message: error.message
    });
  }
};

// Tek bir haber getir (ID ile)
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Haber bulunamadı'
      });
    }
    
    // Görüntülenme sayısını artır
    article.views += 1;
    await article.save();
    
    res.status(200).json({
      success: true,
      data: article
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Haber getirilirken hata oluştu',
      message: error.message
    });
  }
};

// Tek bir haber getir (Slug ile)
exports.getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    
    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Haber bulunamadı'
      });
    }
    
    // Görüntülenme sayısını artır
    article.views += 1;
    await article.save();
    
    res.status(200).json({
      success: true,
      data: article
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Haber getirilirken hata oluştu',
      message: error.message
    });
  }
};

// Yeni haber oluştur
exports.createArticle = async (req, res) => {
  try {
    // Eğer dosya yüklendiyse, imageUrl'i ayarla
    if (req.file) {
      req.body.imageUrl = `/uploads/${req.file.filename}`;
    }
    
    const article = await Article.create(req.body);
    
    res.status(201).json({
      success: true,
      data: article
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Haber oluşturulurken hata oluştu',
      message: error.message
    });
  }
};

// Haber güncelle
exports.updateArticle = async (req, res) => {
  try {
    // Eğer yeni dosya yüklendiyse, imageUrl'i güncelle
    if (req.file) {
      req.body.imageUrl = `/uploads/${req.file.filename}`;
    }
    
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Haber bulunamadı'
      });
    }
    
    res.status(200).json({
      success: true,
      data: article
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Haber güncellenirken hata oluştu',
      message: error.message
    });
  }
};

// Haber sil
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        error: 'Haber bulunamadı'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {},
      message: 'Haber başarıyla silindi'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Haber silinirken hata oluştu',
      message: error.message
    });
  }
};

// Kategoriye göre haberleri getir
exports.getArticlesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 20, page = 1, published = true } = req.query;
    
    const query = { category };
    if (published !== undefined) query.published = published === 'true';
    
    const articles = await Article.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    const total = await Article.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: articles.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      category,
      data: articles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Haberler getirilirken hata oluştu',
      message: error.message
    });
  }
};
