const express = require('express');
const router = express.Router();

// Rutas
const authRoutes = require('./auth');
const userRoutes = require('./usuarios');
const casoRoutes = require('./casos');
const diligenciaRoutes = require('./diligencias');

router.use('/auth', authRoutes);
router.use('/usuarios', userRoutes);
router.use('/casos', casoRoutes);
router.use('/diligencias', diligenciaRoutes);

module.exports = router;
