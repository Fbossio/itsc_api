const Usuario = require('../src/models/users');

// Los roles deben ser agregados como un array

module.exports = function hasRole(roles) {
    return async function(req, res, next) {
      const user = await Usuario.findOne({ where: { id: req.user.id } });
      if (!user || !roles.includes(user.rol)) {
        return res.status(403).send({error: { status:403, message:'Acceso denegado.'}});
      }
      next();
    }
  }

  