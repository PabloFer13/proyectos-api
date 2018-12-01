/**
 * Proyectos.js
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
    fecha: {
      type: 'string'
    },
    asesor: {
      model: 'usuarios'
    },
    url: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    keywords: {
      collection: 'tags',
      via: 'projects'
    },
    autores: {
      collection: 'usuarios'
    },
    carreras: {
      collection: 'programaEducativo'
    },
    status: {
      model: 'status'
    }
  },

};

