const bcrypt = require('bcrypt');
module.exports = {


  friendlyName: 'Encrypt password',


  description: 'encrypts password to handle in the API',


  inputs: {
    password: {
      type: 'string',
      example: 'password123!',
      description: 'User password',
      required: true
    }
  },

  sync: true,

  fn: function ({ password }, exits) {
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    // All done.
    return exits.success(hashedPassword);

  }


};

