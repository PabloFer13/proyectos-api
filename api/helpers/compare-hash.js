const bcrypt = require('bcrypt');
module.exports = {


  friendlyName: 'Compare Hash',


  description: 'compares a raw string and a hashed string',


  inputs: {
    raw: {
      type: 'string',
      example: 'password123!',
      description: 'raw string',
      required: true
    },
    encrypted: {
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
    },

    missmatchValues: {
      description: 'The values do not match.'
    }
  },

  sync: true,

  fn: function ({ raw, encrypted }, exits) {
    if(bcrypt.compareSync(raw, encrypted)){
      return exits.success(true)
    }
    // All done.
    return exits.success(false);

  }


};

