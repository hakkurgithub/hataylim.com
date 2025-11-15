const mongoose = require('mongoose');
const slugify = require('slugify');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Haber başlığı zorunludur'],
    trim: true,
    maxlength: [200, 'Başlık en fazla 200 karakter olabilir']
  },
  
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  
  content: {
    type: String,
    required: [true, 'Haber içeriği zorunludur']
  },
  
  summary: {
    type: String,
    required: [true, 'Haber özeti zorunludur'],
    maxlength: [300, 'Özet en fazla 300 karakter olabilir']
  },
  
  category: {
    type: String,
    required: [true, 'Kategori zorunludur'],
    enum: {
      values: ['siyaset', 'spor', 'sanat', 'genel', 'ozel-haber', 'video-haber', 'basarili-hataylilar', 'eleman-is-arayan', 'yazi-yorum'],
      message: '{VALUE} geçerli bir kategori değil'
    }
  },
  
  imageUrl: {
    type: String,
    default: '/uploads/default-news.jpg'
  },
  
  author: {
    type: String,
    default: 'Hataylım Gazetesi'
  },
  
  featured: {
    type: Boolean,
    default: false
  },
  
  published: {
    type: Boolean,
    default: false
  },
  
  views: {
    type: Number,
    default: 0
  },
  
  tags: [{
    type: String,
    trim: true
  }],
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Slug otomatik oluşturma
ArticleSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      locale: 'tr'
    }) + '-' + Date.now();
  }
  this.updatedAt = Date.now();
  next();
});

// Sanal alan: Tarih formatı
ArticleSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Kategori adlarını Türkçe gösterme
ArticleSchema.virtual('categoryName').get(function() {
  const categoryMap = {
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
  return categoryMap[this.category] || this.category;
});

// JSON çıktısında virtual alanları dahil et
ArticleSchema.set('toJSON', { virtuals: true });
ArticleSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Article', ArticleSchema);
