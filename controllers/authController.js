const passport = require('passport');
const User = require('../models/User');

// Kullanıcı girişi
exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Giriş sırasında bir hata oluştu',
        error: err.message
      });
    }
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: info.message || 'Kullanıcı adı veya şifre hatalı'
      });
    }
    
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Giriş yapılırken bir hata oluştu',
          error: err.message
        });
      }
      
      return res.status(200).json({
        success: true,
        message: 'Giriş başarılı',
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          fullName: user.fullName
        }
      });
    });
  })(req, res, next);
};

// Kullanıcı kaydı (Manuel - sadece admin kullanabilir)
exports.register = async (req, res) => {
  try {
    const { username, email, password, fullName, role } = req.body;
    
    // Kullanıcı adı kontrolü
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }] 
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Bu kullanıcı adı veya e-posta zaten kayıtlı'
      });
    }
    
    // Yeni kullanıcı oluştur
    const user = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
      fullName,
      role: role || 'author'
    });
    
    res.status(201).json({
      success: true,
      message: 'Kullanıcı başarıyla oluşturuldu',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        fullName: user.fullName
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Kullanıcı oluşturulurken hata oluştu',
      error: error.message
    });
  }
};

// Kullanıcı çıkışı
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Çıkış yapılırken hata oluştu',
        error: err.message
      });
    }
    
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Session sonlandırılırken hata oluştu',
          error: err.message
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Çıkış başarılı'
      });
    });
  });
};

// Mevcut kullanıcı bilgisi
exports.getCurrentUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Giriş yapılmamış'
    });
  }
  
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role,
      fullName: req.user.fullName,
      lastLogin: req.user.lastLogin
    }
  });
};

// Kullanıcı listesi (sadece admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Kullanıcılar getirilirken hata oluştu',
      error: error.message
    });
  }
};

// Kullanıcı güncelleme (sadece admin veya kendi kendini)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, role, isActive } = req.body;
    
    // Sadece admin başkasını güncelleyebilir
    if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
      return res.status(403).json({
        success: false,
        message: 'Bu işlem için yetkiniz yok'
      });
    }
    
    // Admin değilse role ve isActive güncelleyemez
    const updateData = { fullName, email };
    if (req.user.role === 'admin') {
      updateData.role = role;
      updateData.isActive = isActive;
    }
    
    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Kullanıcı bulunamadı'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Kullanıcı güncellendi',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Kullanıcı güncellenirken hata oluştu',
      error: error.message
    });
  }
};

// Şifre değiştirme
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.user._id);
    
    // Mevcut şifreyi doğrula
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Mevcut şifre hatalı'
      });
    }
    
    // Yeni şifreyi kaydet (pre-save hook otomatik hashleyecek)
    user.password = newPassword;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Şifre başarıyla değiştirildi'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Şifre değiştirilirken hata oluştu',
      error: error.message
    });
  }
};
