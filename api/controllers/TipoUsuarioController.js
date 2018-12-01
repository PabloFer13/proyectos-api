/**
 * TipoUsuarioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create(req, res){
    try {
      const { nombre, display, permisos } = req.allParams();
      
      let errorString = 'Missing fields';
      let reqErr = false;

      if(!permisos){
        errorString = `${errorString} permisos`;
        reqErr = true;
      }

      if(!nombre || nombre == ''){
        errorString = `${errorString} nombre`;
        reqErr = true;
      }

      if(!display || display == ''){
        errorString = `${errorString} display`;
        reqErr = true;
      }

      if(reqErr){
        const err = {
          status: 400,
          err: {
            message: errorString,
            error: 'Bad Request'
          }
        };
        throw err;
      }
      const tipo = await TipoUsuario.create({
        nombre,
        display,
        permisos
      }).fetch();
      res.created({ tipo });

    } catch (err) {
      res.handle(err);
    }
  },
  async get(req, res){
    const tipos = await TipoUsuario.find();
    res.success(tipos);
  }
};

