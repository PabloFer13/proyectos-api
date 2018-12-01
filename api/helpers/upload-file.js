module.exports = {


  friendlyName: 'Upload file',


  description: '',


  inputs: {
    req: {
      type: 'ref',
      description: 'The current incoming request (req).',
      required: true
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    const { req } = inputs;
    req.file('documentFile')
      .upload({
        adapter: require('skipper-s3'),
        // key
        // secret
        // bucket
        // region
        // endpoint: 'telematicaucaribe.s3.us-east-2.amazonaws.com'
        // Optional
        // token: 'temporary_sts_creds'
      }, function whenDone(err, uploadedFiles) {
        sails.log(uploadedFiles);
        if (err) {
          return exits.success({ status: false, err });
        }
        return exits.success({ status: true, files: uploadedFiles });
        // return res.ok({
        //   files: uploadedFiles,
        //   textParams: req.allParams()
        // });
      })
  }
};


