const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');

const Usuario = require('../models/users');


// @route       GET api/auth
// @desc        Logear un usuario
// @access      ruta privada

router.get('/', auth, async(req, res) => {
    try {
        const { email } = req.body;
        const user = await Usuario.findOne({
            where: {
                email: email
            },
            attributes: {
                exclude: ['password']
            }
        })
        return res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

// @route       POST api/auth
// @desc        Autorizar un usuario y obtener un token
// @access      ruta pública

router.post('/', [
    body('email', 'Por favor ingresar un email válido').isEmail(),
    body('password', 'La contraseña es requerida').exists(),
],
async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await Usuario.findOne({
            where: {
                email: email
            }
        })

        if (!user) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
          }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
          }
        
        const payload = {
            user: {
              id: user.id,
            },
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            
            (err, token) => {
              if (err) throw err;
              return res.json({ token });
            }
          );
        

    } catch (error) {

        console.error(err.message);
        return res.status(500).send('Server Error');
    }
})

module.exports = router;