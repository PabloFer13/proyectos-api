const moment = require('moment');
/**
 * PeriodosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create(req, res){
    try {
      const {
        year,
        season,
      } = req.allParams();

      let errorString = 'Missing fields:';
      let reqErr = false;
      
      if(!year || year === '' || year < 2000){
        errorString = `${errorString} year`;
        reqErr = true;
      }

      if(!season || season === ''){
        errorString = `${errorString} season`;
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

      const periodo = await Periodos.create({
        year: `${year}`,
        season,
      }).fetch()

      res.created({ periodo });

    } catch (err) {
      res.handle(err);
    }
  },
  async get(req, res){
    const periodos = await Periodos.find({});

    res.success({ periodos });
  }

};

