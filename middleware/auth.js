// Kullanıcının giriş yapıp yapmadığını kontrol et
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  
  // API isteği mi yoksa sayfa isteği mi kontrol et
  if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') > -1)) {
    return res.status(401).json({
      success: false,
      message: 'Giriş yapmanız gerekiyor'
    });
  }
  
  res.redirect('/auth/login');
};

// Kullanıcının admin olup olmadığını kontrol et
const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    return next();
  }
  
  if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') > -1)) {
    return res.status(403).json({
      success: false,
      message: 'Bu işlem için yetkiniz yok'
    });
  }
  
  res.status(403).send('Bu sayfaya erişim yetkiniz yok');
};

// Kullanıcının en az editor rolü olup olmadığını kontrol et
const isEditor = (req, res, next) => {
  if (req.isAuthenticated() && (req.user.role === 'admin' || req.user.role === 'editor')) {
    return next();
  }
  
  if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') > -1)) {
    return res.status(403).json({
      success: false,
      message: 'Bu işlem için yetkiniz yok'
    });
  }
  
  res.status(403).send('Bu sayfaya erişim yetkiniz yok');
};

// Giriş yapmamış kullanıcıları kontrol et (login/register sayfaları için)
const isNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/admin');
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isEditor,
  isNotAuthenticated
};
