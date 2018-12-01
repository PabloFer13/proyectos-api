/**
 * UsuariosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const moment = require('moment');

module.exports = {
  async create(req, res) {
    try {
      const {
        email,
        name: nombre,
        type: tipo,
        apellidoPaterno,
        apellidoMaterno = '',
        password: passString
      } = req.allParams();
      let errorString = 'Missing fields:';
      let reqErr = false;
      if(!nombre || nombre === ''){
        errorString = `${errorString} name`;
        reqErr = true;
      }
      if(!tipo || tipo === 0){
        errorString = `${errorString} type`;
        reqErr = true;
      }
      if(!apellidoPaterno || apellidoPaterno === ''){
        errorString = `${errorString} apellidoPaterno`;
        reqErr = true;
      }
      // if(!apellidoMaterno || apellidoMaterno === ''){
      //   errorString = `${errorString} apellidoMaterno`;
      //   reqErr = true;
      // }
      if(!email || email === ''){
        errorString = `${errorString} email`;
        reqErr = true;
      }
      if(!passString || passString === ''){
        errorString = `${errorString} password`;
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
      sails.log('Llega al encrypt');
      const password = sails.helpers.encryptPassword(passString);
      sails.log('Llega al create')
      const { id } = await Usuarios.create({
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        tipo,
        email,
        password,
        status: 1
      }).fetch();
      sails.log('Id: ', id);
      const user = await Usuarios.findOne({ id }).populate('status').populate('tipo');
      sails.log('Llega al token');
      const token = sails.helpers.generateToken.with({
        id: user.id,
        email: user.email,
        login: moment().format(),
        key: sails.config.session.secret
      });
      delete user.password;
      res.created({ user, token });
    } catch (err) {
      res.handle(err);
    }
  },
  async update(req, res){
    try {
      const {
        id,
        email,
        name: nombre,
        type: tipo,
        status,
        apellidoPaterno,
        apellidoMaterno,
        password: passString
      } = req.allParams();

      let params = {
        email,
        nombre,
        tipo,
        apellidoPaterno,
        apellidoMaterno,
        status,
        password: ''
      }

      let par = 7;

      if(!email || email === ''){
        delete params.email;
        par = par - 1;
      }
      if(!nombre || nombre === ''){
        delete params.nombre;
        par = par - 1;
      }
      if(!tipo || tipo < 1){
        delete params.tipo;
        par = par - 1;
      }
      if(!apellidoPaterno || apellidoPaterno === ''){
        delete params.apellidoPaterno;
        par = par - 1;
      }
      if(!apellidoMaterno || apellidoMaterno === ''){
        delete params.apellidoMaterno;
        par = par - 1;
      }
      if(!status || status < 1){
        delete params.status;
        par = par - 1;
      }
      if(!passString || passString === ''){
        delete params.password;
        par = par - 1;
      }else{
        params.password = sails.helpers.encryptPassword(passString)
      }

      if(par < 1){
        const error = {
          code: 400,
          message: 'Bad Request, nothing to update'
        }
        throw error;
      }

      await Usuarios.update({ id }).set({ ...params });
      const user = await Usuarios.find({ id })
        .populate('tipo')
        .populate('status')
        .populate('proyectos')
        .populate('carrera')
        .populate('academia')
        .populate('asesorados');

      res.success({ user });

    } catch (err) {
      res.handle(err);
    }
  },
  async delete(req, res){
    try {
      const { id } = req.allParams();

      const { id: status } = await Status.findOne({ nombre: 'deleted' });
      
      await Usuarios.update({ id }).set({ status });

      res.ok();

    } catch (err) {
      res.handle(err);
    }
  },
  async find(req, res){
    try {
      const { id } = req.allParams();
      const user = await Usuarios.findOne({ id })
        .populate('proyectos')
        .populate('carrera')
        .populate('status')
        .populate('asesorados')
        .populate('academia');
      res.success(user);
    } catch (err) {
      res.handle(err);
    }
  },
  async get(req, res) {
    try {
      const {
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        status,
        email,
        tipo,
        carrera,
        academia
      } = req.allParams();
      
      let params = {};

      if(nombre){
        params.nombre = {
          like: `%${nombre}%`
        };
      }

      if(apellidoPaterno){
        params.apellidoPaterno = {
          like: `%${apellidoPaterno}%`
        };
      }

      if(apellidoMaterno){
        params.apellidoMaterno = {
          like: `%${apellidoMaterno}%`
        };
      }

      if(status){
        params.status = status;
      }

      if(email){
        params.email = {
          like: `%${email}%`
        };
      }

      const ors = Object.keys(params).map(item => {
        return { [item]: params[item] }
      })

      sails.log(ors)

      const rawUsers = await Usuarios.find(Object.keys(params).length === 0 ? {} : {
        or: ors });
      const users = rawUsers.map(item => {
        delete item.password;
        return { ...item };
      })

      res.success(users);

    } catch (err) {
      res.handle(err)
    }
  }
};

