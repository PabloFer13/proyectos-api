/**
 * Usuarios.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    id: {
      type: 'number',
      unique: true,
      autoIncrement: true,
      columnName: 'id_usuario'
    },
    nombre: {
      type: 'string'
    },
    apellidoPaterno: {
      type: 'string',
      columnName: 'apellido_paterno'
    },
    apellidoMaterno: {
      type: 'string',
      columnName: 'apellido_materno'
    },
    email: {
      type: 'string'
    },
    foto: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    tipo: {
      model: 'tipoUsuario'
    },
    celular: {
      type: 'string'
    },
    status: {
      model: 'status'
    },
    carrera: {
      model: 'programaEducativo'
    },
    academia: {
      model: 'academia'
    },
    proyectos: {
      collection: 'proyectos',
      via: 'autores'
    },
    asesorados: {
      collection: 'proyectos',
      via: 'asesor'
    }
  },

};

