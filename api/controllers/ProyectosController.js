/**
 * ProyectosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create(req, res){
    sails.log('Llega');
    try {
      const {
        nombre,
        fecha,
        asesor,
        autores,
        url,
        tags,
        description,
        createTags,
        carreras
      } = req.allParams();

      sails.log(req.allParams());
      return res.ok();

      sails.log('Validadores');
      let errorString = 'Missing fields:';
      let reqErr = false;
      
      if(!nombre || nombre === ''){
        errorString = `${errorString} nombre`;
        reqErr = true;
      }
      if(!description || description === ''){
        errorString = `${errorString} description`;
        reqErr = true;
      }
      if(!fecha || fecha === ''){
        errorString = `${errorString} fecha`;
        reqErr = true;
      }
      if(!asesor || asesor < 1){
        errorString = `${errorString} asesor`;
        reqErr = true;
      }
      if(!autores || autores.length === 0){
        errorString = `${errorString} autores`;
        reqErr = true;
      }
      if(!url || url === ''){
        errorString = `${errorString} url`;
        reqErr = true;
      }
      /* if(!tags || tags.length === 0){
        errorString = `${errorString} tags`;
        reqErr = true;
      }
      if(!carreras || carreras.length === 0){
        errorString = `${errorString} carreras`;
        reqErr = true;
      } */
      
      if(reqErr){
        const err = {
          status: 400,
          err: {
            message: errorString,
            error: 'Bad Request'
          }
        };
        throw err;
      }

      /* sails.log('Crea tags');

      const rawNewTags = typeof createTags === 'string' ? JSON.parse(createTags) : createTags;

      sails.log(rawNewTags)
      sails.log(typeof createTags)
      sails.log(typeof createTags === 'string')
      sails.log(typeof rawNewTags)

      const newTags = await Tags.createEach(rawNewTags).fetch();

      sails.log('Sale del create')

      const newTagsId = newTags.map(({ id }) => id);

      const rawTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
      const finalTags = [...rawTags, ...newTagsId]; */

      sails.log('Crea el proyecto')
      const { id } = await Proyectos.create({
        nombre,
        fecha,
        asesor,
        description,
        url,
        status: 1
      }).fetch();

      /* sails.log('Agrega Tags: ', id)
      await Proyectos.addToCollection(id, 'keywords')
      .members(finalTags).catch(err=> { sails.log(err)}); */

      sails.log('Agrega autores')
      const rawAutores = typeof autores === 'string' ? JSON.parse(autores) : autores;
      await Proyectos.addToCollection(id, 'autores')
      .members(rawAutores);

      // sails.log('Agrega carreras')
      // const rawCarrers = typeof carreras === 'string' ? JSON.parse(carreras) : carreras;
      // await Proyectos.addToCollection(id, 'carreras')
      // .members(rawCarrers);

      sails.log('Obtiene el proyecto creado')
      const proyecto =  await Proyectos.findOne({ id })
        // .populate('keywords')
        .populate('autores')
        .populate('asesor')
        // .populate('carreras');

      res.created({ proyecto });

    } catch (err) {
      res.handle(err);
    }
  },
  async update(req, res){
    const {
      id,
      description,
      fecha,
      removeTags,
      addTags,
      createTags,
      status,
      url
    } = req.allParams();

    const params = {
      description,
      fecha,
      status,
      url
    };

    let parLen = 4;

    if(!description){
      delete params.description;
      parLen = parLen - 1;
    }
    if(!fecha){
      delete params.fecha;
      parLen = parLen - 1;
    }
    if(!status){
      delete params.status;
      parLen = parLen - 1;
    }
    if(!url){
      delete params.url;
      parLen = parLen - 1;
    }

    parLen > 0 && await Proyectos.update({ id }).set({ ...params });

    /* let tagsIds = [...addTags];

    const finalTags = createTags.reduce(async (acc, etiqueta) => {
      const { id } = await Tags.create({ etiqueta }).fetch();
      acc.push(id);
      return acc;
    })

    if(removeTags.length > 0){
      await Proyectos.removeFromCollection(id, 'tags')
      .members(removeTags);
    }

    if(finalTags.length > 0){
      await Proyectos.addToCollection(id, 'tags')
      .members(finalTags);
    } */

    const updatedProject = await Proyectos.findOne({ id })
      .populate('tags')
      .populate('autores')
      .populate('asesor')
      .populate('carreras');

    res.success(updatedProject);
  },
  async delete(req, res){
    try {
      const { id } = req.allParams();

      const { id: status } = await Status.findOne({ nombre: 'deleted' });
      
      await Proyecto.update({ id }).set({ status });

      res.ok();

    } catch (err) {
      res.handle(err);
    }
  },

  async find(req, res){
    try {
      const { id } = req.allParams();
      const project = await Proyectos.findOne({ id })
        .populate('autores')
        .populate('asesor')
        .populate('status')
        .populate('carreras')
        .populate('keywords');;
      res.success(project);
    } catch (err) {
      res.handle(err);
    }
  },
  async get(req, res) {
    try {
      const {
        nombre,
        fecha,
        asesor,
        description,
        tags,
        autores,
        carreras
      } = req.allParams();

      let params = {};
      const len = 0;

      if(nombre){
        params.nombre = {
          like: `%${nombre}%`
        };
      }

      if(fecha){
        params.fecha = fecha;
      }

      if(asesor){
        params.asesor = asesor;
      }

      if(description){
        params.description = {
            like: `%${description}%`
        };
      }

      sails.log('Llega a tags')
      if(tags){
        params.keywords = {
          contains: typeof tags === 'string' ? JSON.parse(tags) : tags 
        };
      }
      sails.log('Sale de tags')

      if(carreras){
        params.carreras = {
          'in': carreras
        };
      }

      if(autores){
        params.autores = {
          'in': autores 
        };
      }

      const projects = await Proyectos.find(params)
        .populate('autores')
        .populate('asesor')
        .populate('status')
        .populate('carreras')
        .populate('keywords');

      res.success(projects);

    } catch (err) {
      res.handle(err)
    }
  },
};
