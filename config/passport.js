const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// Local Strategy - Kullanıcı adı ve şifre ile giriş
passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  async (username, password, done) => {
    try {
      // Kullanıcıyı bul
      const user = await User.findOne({ username: username.toLowerCase() });
      
      if (!user) {
        return done(null, false, { message: 'Kullanıcı adı veya şifre hatalı' });
      }
      
      // Kullanıcı aktif mi kontrol et
      if (!user.isActive) {
        return done(null, false, { message: 'Hesabınız devre dışı bırakılmış' });
      }
      
      // Şifreyi doğrula
      const isMatch = await user.comparePassword(password);
      
      if (!isMatch) {
        return done(null, false, { message: 'Kullanıcı adı veya şifre hatalı' });
      }
      
      // Son giriş zamanını güncelle
      user.lastLogin = new Date();
      await user.save();
      
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Session'a kullanıcı ID'sini serialize et
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Session'dan kullanıcıyı deserialize et
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
