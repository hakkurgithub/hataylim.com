const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

// MongoDB'ye bağlan
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB bağlantısı başarılı'))
  .catch(err => {
    console.error('❌ MongoDB bağlantı hatası:', err);
    process.exit(1);
  });

// İlk admin kullanıcısını oluştur
const createInitialAdmin = async () => {
  try {
    // Admin kullanıcı var mı kontrol et
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (adminExists) {
      console.log('⚠️  Admin kullanıcı zaten mevcut:', adminExists.username);
      process.exit(0);
    }
    
    // Yeni admin oluştur
    const admin = await User.create({
      username: 'admin',
      email: 'admin@hataylim.com',
      password: 'admin123', // İlk kurulumda değiştirilmeli!
      fullName: 'Hataylım Admin',
      role: 'admin',
      isActive: true
    });
    
    console.log('\n✅ İlk admin kullanıcı başarıyla oluşturuldu!');
    console.log('\n📋 Giriş Bilgileri:');
    console.log('   Kullanıcı Adı: admin');
    console.log('   Şifre: admin123');
    console.log('   E-posta:', admin.email);
    console.log('\n⚠️  GÜVENLİK UYARISI: Giriş yaptıktan sonra şifrenizi mutlaka değiştirin!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Admin oluşturulurken hata:', error.message);
    process.exit(1);
  }
};

createInitialAdmin();
