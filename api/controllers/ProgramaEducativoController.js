/**
 * ProgramaEducativoController
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

      const carrera = await ProgramaEducativo.create({
        nombre,
        display,
        clave,
        status: 1
      }).fetch();

      res.created({ carrera });

    } catch (err) {
      res.handle(err)
    }
  },
  
  async update(req, res){
    try {
      const {
        id,
        display,
        nombre,
        clave,
        status
      } = req.allParams();
  
      const params = {
        display,
        nombre,
        clave,
        status
      };
  
      if(!display){
        delete params.display;
      }
  
      if(!nombre){
        delete params.nombre;
      }
  
      if(!clave){
        delete params.clave;
      }
  
      if(!status){
        delete params.status;
      }
  
      const updatedCareer = await ProgramaEducativo.update({ id })
      .set({ ...params })
      .fetch();
  
      res.success(updatedCareer);
    } catch (err) {
      res.handle(err)
    }
  },

  async delete(req, res){
    try {
      const { id } = req.allParams();

      const { id: status } = await Status.findOne({ nombre: 'deleted' });
      
      await ProgramaEducativo.update({ id }).set({ status });

      res.ok();

    } catch (err) {
      res.handle(err);
    }
  },

  async find(req, res){
    try {
      const { id } = req.allParams();
      const carrera = await ProgramaEducativo.findOne({ id });
      res.success(carrera);
    } catch (err) {
      res.handle(err);
    }
  },
  async get(req, res) {
    try {
      const {
        search = ''
      } = req.allParams();

      const params = [];
      const len = 0;

      const carreras = await ProgramaEducativo.find({
        or: [
          { nombre: { contains: search } },
          { display: { contains: search } },
          { clave: { contains: search } },
        ]
      });

      res.success(carreras);

    } catch (err) {
      res.handle(err)
    }
  }
};

