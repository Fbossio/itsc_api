const Router = require('express');
const config = require('config');
const Users = require('../models/users');
const auth = require('../../middleware/auth');
const hasRoles = require('../../middleware/hasRoles');

const router = Router();

// @route       GET api/admin
// @desc        Obtener todos los usuarios
// @access      ruta privada

router.get('/', auth, hasRoles(['admin']), async (req, res) => {
    const usuarios = await Users.findAll();
     if(usuarios) {
        return res.status(200).json({data: usuarios})
     }
})

module.exports = router;