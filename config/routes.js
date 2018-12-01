/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

 'get /': 'AppController.index',
 
 'post /users': 'UsuariosController.create',
 'put /users/:id': 'UsuariosController.update',
 'delete /users': 'UsuariosController.delete',
 'get /users': 'UsuariosController.get',
 'get /users/:id': 'UsuariosController.find',

 'post /user-type': 'TipoUsuarioController.create',
 'get /user-type': 'TipoUsuarioController.get',

 'post /academy': 'AcademiaController.create',
 'put /academy': 'AcademiaController.update',
 'delete /academy': 'AcademiaController.delete',
 'get /academy': 'AcademiaController.get',
 'get /academy/:id': 'AcademiaController.find',

 'post /tags': 'TagsController.create',
 'get /tags': 'TagsController.get',

 'post /status': 'StatusController.create',

 'post /projects': 'ProyectosController.create',
 'put /projects': 'ProyectosController.update',
 'delete /projects': 'ProyectosController.delete',
 'get /projects': 'ProyectosController.get',
 'get /projects/:id': 'ProyectosController.find',

 'post /career': 'ProgramaEducativoController.create',
 'put /career': 'ProgramaEducativoController.update',
 'delete /career': 'ProgramaEducativoController.delete',
 'get /career': 'ProgramaEducativoController.get',
 'get /career/:id': 'ProgramaEducativoController.find',

 'post /login': 'AppController.login',
  
};
