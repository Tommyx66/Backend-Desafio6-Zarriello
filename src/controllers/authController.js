const bcrypt = require('bcrypt');
const passport = require('../config/passportConfig');

const users = [
  { id: 1, email: 'adminCoder@coder.com', passwordHash: '', role: 'admin' }
  // Agregar más usuarios si es necesario
];

function login(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/api/products/welcome',
    failureRedirect: '/api/products/login',
    failureFlash: true
  })(req, res, next);
}

function logout(req, res) {
  req.logout();
  res.redirect('/api/products/login');
}

module.exports = {
  login,
  logout,
};
