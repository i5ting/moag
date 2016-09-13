"use strict";

const co = require('co');

var router = koa_router()

// core controller
const $ = $controllers.{{models}}_controller;

/**
 * Auto generate RESTful url routes.
 *
 * URL routes:
 *
 *  GET    /{{models}}[/]        => {{model}}.list()
 *  GET    /{{models}}/new       => {{model}}.new()
 *  GET    /{{models}}/:id       => {{model}}.show()
 *  GET    /{{models}}/:id/edit  => {{model}}.edit()
 *  POST   /{{models}}[/]        => {{model}}.create()
 *  PATCH  /{{models}}/:id       => {{model}}.update()
 *  DELETE /{{models}}/:id       => {{model}}.destroy()
 *
 */

router.get('/new', (ctx, next) => {
  return co.wrap($.new)(ctx, next).catch(err => {
    return ctx.api_error(err);
  })
}); 
 
router.get('/:id/edit', (ctx, next) => {
  return co.wrap($.edit)(ctx, next).catch(err => {
    return ctx.api_error(err);
  })
}); 

router.get('/',  (ctx, next) => {
  return co.wrap($.list)(ctx, next).catch(err => {
    return ctx.api_error(err);
  })
}); 

router.post('/', (ctx, next) => {
  return co.wrap($.create)(ctx, next).catch(err => {
    return ctx.api_error(err);
  })
});

router.get('/:id', (ctx, next) => {
  return co.wrap($.show)(ctx, next).catch(err => {
    return ctx.api_error(err);
  })
});

router.patch('/:id', (ctx, next) => {
  return co.wrap($.update)(ctx, next).catch(err => {
    return ctx.api_error(err);
  })
});

router.delete('/:id', (ctx, next) => {
  return co.wrap($.destroy)(ctx, next).catch(err => {
    return ctx.api_error(err);
  })
});

// -- custom routes




module.exports = router;