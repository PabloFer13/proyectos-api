/**
 * ProgramaEducativo.js
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
    display: {
      type: 'string'
    },
    clave: {
      type: 'string'
    },
    status: {
      model: 'status'
    },
    usuarios: {
      collection: 'usuarios',
      via: 'carrera'
    },
    proyectos: {
      collection: 'proyectos',
      via: 'carreras'
    }
  },

};

