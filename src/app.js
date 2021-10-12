const express = require('express');
const json = require('express');
const morgan = require('morgan');

// Inicialización
const app = express();

// middleware
app.use(express.json({ extended: false }));
app.use(morgan("dev"));
app.use(json());


// Importar rutas
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const walletRoutes = require('./routes/wallet')


// Rutas
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);



module.exports = app;