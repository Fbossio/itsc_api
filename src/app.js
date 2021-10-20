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
const adminRoutes = require('./routes/admin');


// Rutas
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes)




module.exports = app;