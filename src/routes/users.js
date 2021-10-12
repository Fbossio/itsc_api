const Router = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');
const User = require('../models/users');


const router = Router();

// @route       POST api/user
// @desc        Register a user
// @access      Public


router.post('/', [
    body('username', 'Por favor ingresar un nombre').not().isEmpty(),
    body('email', 'Por favor ingresar un email válido').isEmail(),
    body(
        'password',
        'Por favor ingresar una contraseña con 7 o más caracteres'
      ).isLength({ min: 7 }),
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errores: errors.array()})
    }
    let {username, email, password} = req.body;

    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
          }

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        const newUser = await User.create(
            {
                username: username,
                email: email,
                password: password
            }
        )

                
        const payload = {
            user: {
                id: newUser.id
            }
        }

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