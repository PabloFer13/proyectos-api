const moment = require('moment');
const jwt = require('jsonwebtoken');
const { secret } = sails.config;
module.exports = {


  friendlyName: 'Generate Token',


  description: 'Generates an acccess Token',


  inputs: {
    id: {
      type: 'number',
      example: 1,
      description: 'raw number',
      required: true
    },
    email: {
      type: 'string',
      example: 'hello@example.com',
      description: 'User email',
      required: true
    },
    login: {
      type: 'string',
      example: moment().format(),
      description: 'Login time',
      required: true
    },
    key: {
      type: 'string',
      example: ';12a3kab12s4udb123!',
      description: 'Encrypted string',
      required: true
    }
  },

  exits: {
    success: {
      outputFriendlyName: 'Encrypt Compare String',
      outputDescription: 'Compares a raw and an encrypted string.'
    }
  },

  sync: true,

  fn: function ({ id, email, login, key }, exits) {
    return exits.success(jwt.sign({ id, email, login }, key));

  }


};

