/**
 * AcademiaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create(req, res){
    try {
      const {
        nombre,
        display,
        clave
      } = req.allParams();

      let errorString = 'Missing fields:';
      let reqErr = false;
      
      if(!nombre || nombre === ''){
        errorString = `${errorString} nombre`;
        reqErr = true;
      }

      if(!display || display === ''){
        errorString = `${errorString} display`;
        reqErr = true;
      }

      if(!clave || clave === 0){
        errorString = `${errorString} clave`;
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

      const academia = Academia.create({
        nombre,
        display,
        clave,
        status: 1
      });

      res.created({ academia });

    } catch (err) {
      res.handle(err)
    }
  },
  async update(req, res){
    try {
      const {
        id,
        nombre,
        display,
        clave
      } = req.allParams();
  
      const params = {
        nombre,
        display,
        clave,
        status
      };
  
      if(!nombre){
        delete params.nombre;
      }
  
      if(!display){
        delete params.display;
      }
  
      if(!clave){
        delete params.clave;
      }

      if(!status){
        delete params.status;
      }
      
      const updatedAcademy = await Academia.update({ id })
      .set({ ...params })
      .fetch();

      res.success(updatedAcademy);
    } catch (err) {
      res.handle(err);
    }
  },

  async delete(req, res){
    try {
      const { id } = req.allParams();

      const { id: status } = await Status.findOne({ nombre: 'deleted' });
      
      await Academia.update({ id }).set({ status });

      res.ok();

    } catch (err) {
      res.handle(err);
    }
  },
  async find(req, res){
    try {
      const { id } = req.allParams();
      const academia = await Academia.findOne({ id });
      res.success(academia);
    } catch (err) {
      res.handle(err);
    }
  },
  async get(req, res) {
    try {
      const {
        nombre,
        display,
        clave
      } = req.allParams();

      const params = [];
      const len = 0;

      if(nombre){
        len = params.push({ nombre });
      }

      if(display){
        len = params.push({ display });
      }

      if(clave){
        len = params.push({ clave });
      }

      const academias = await Academia.find(
        len === 0
        ? {}
        : { or: params }
      );

      res.success(academias);

    } catch (err) {
      res.handle(err)
    }
  }
};

