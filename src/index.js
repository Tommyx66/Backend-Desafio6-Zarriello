const express = require('express');
const session = require('express-session');
const passport = require('./config/passportConfig');  // Importamos Passport
const app = express();
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');
const authController = require('./controllers/authController');
const path = require('path');

const PORT = 8080;

app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());  // Inicializamos Passport
app.use(passport.session());     // Habilitamos la sesión de Passport

app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi e-commerce backend!');
});

app.get('/api/products/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));  // Ruta para la vista de login
});

app.post('/api/products/login', authController.login);

app.get('/api/products/logout', authController.logout);

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
