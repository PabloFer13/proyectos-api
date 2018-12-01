const moment = require('moment');
const name = 'Reserva Laboratorios API';
const version = '0.0.1';
module.exports = {
  index(req, res){
    res.ok({ name, version });
  },
  async login (req, res) {
    // TODO: Log In Controller
    try {
      const { email, password } = req.allParams();
      const user = await Usuarios.findOne({ email }).populate('status').populate('tipo')

      if(!user){
        const err = {
          err: {
            message: 'User not found'
          },
          status: 404
        }
        throw err;
      }
      const match = sails.helpers.compareHash.with({ raw: password, encrypted: user.password})
      if(!match){
        const matchErr = {
          err: {
            message: 'Values do not match'
          },
          status: 501
        }
        throw matchErr;
      }
      
      const token = sails.helpers.generateToken.with({
        id: user.id,
        email: user.email,
        login: moment().format(),
        key: sails.config.session.secret
      });

      delete user.password;
      res.success({ token, user });
    } catch (er) {
      sails.log(er);
      const { err: e, status } = er;
      res.handle({ err: e, status });
    }
  }
}