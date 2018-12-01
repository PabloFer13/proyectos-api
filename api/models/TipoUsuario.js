/**
 * TipoUsuarios.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'number',
      unique: true,
      autoIncrement: true,
      columnName: 'id_tipo_usuario'
    },
    nombre: {
      type: 'string'
    },
    display: {
      type: 'string'
    },
    permisos: {
      type: 'number'
    },
    creator: {
      model: 'usuarios'
    },
    usuarios: {
      collection: 'usuarios'
    }
  },

};

