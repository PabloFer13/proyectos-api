const { KEY, SECRET, BUCKET, REGION } = require('dotenv');
module.exports = {


  friendlyName: 'Upload file',


  description: '',


  inputs: {
    req: {
      type: 'ref',
      description: 'The current incoming request (req).',
      required: true
    },
    sls : {
      type: 'ref',
      description: 'Sails object'
    }
  },


  fn: async function (inputs, exits) {

    const { req, sls } = inputs;
    sls.log('Llega');
    sls.log(process.env.KEY);
    sls.log(process.env.SECRET);
    sls.log(process.env.BUCKET);
    sls.log(process.env.REGION);
    req.file('doc')
      .upload({
        adapter: require('skipper-s3'),
        key: process.env.KEY,
        secret: process.env.SECRET,
        bucket: process.env.BUCKET,
        region: process.env.REGION
      }, function whenDone(err, uploadedFiles) {
        sails.log(uploadedFiles);
        if (err) {
          sls.log(err)
          exits.success({ status: false, err });
        }
        exits.success({ status: true, files: uploadedFiles });
      })
  }
};


