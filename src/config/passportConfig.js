const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const users = [
  { id: 1, email: 'adminCoder@coder.com', passwordHash: '', role: 'admin' }
  // Agregar más usuarios si es necesario
];

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  const user = users.find(u => u.email === email);

  if (!user) {
    return done(null, false, { message: 'Usuario no encontrado' });
  }

  if (user.passwordHash === '') {
    return done(null, false, { message: 'Debes registrarte con GitHub' });
  }

  try {
    const match = await bcrypt.compare(password, user.passwordHash);

    if (match) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Contraseña incorrecta' });
    }
  } catch (error) {
    return done(error);
  }
}));

module.exports = passport;
