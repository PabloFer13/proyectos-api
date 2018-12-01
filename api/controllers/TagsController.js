/**
 * TagsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create(req, res){
    const { etiqueta } = req.allParams();

    if(!etiqueta){
      const err = {
        status: 400,
        err: {
          message: 'No string for tag',
          error: 'Bad Request'
        }
      };
      throw err;
    }

    const tag = await Tags.create({ etiqueta }).fetch();

    res.created({ tag });
  },
  async get(req, res){
    const { etiqueta } = req.allParams();

    if(!etiqueta){
      const err = {
        status: 400,
        err: {
          message: 'No string for tag',
          error: 'Bad Request'
        }
      };
      throw err;
    }

    const tag = await Tags.find({
      etiqueta: {
        like: `%${etiqueta}%`
      }
    });

    res.success({ tag });
  }
};
