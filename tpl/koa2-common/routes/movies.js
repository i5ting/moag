"use strict";

var router = require('koa-router')();
const co = require('co');

var $middlewares  = require('mount-middlewares')(__dirname);

// core controller
var $ = require('mount-controllers')(__dirname).{{models}}_controller;

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

router.get('/new', $.new); 
 
router.get('/:id/edit', $.edit);

router.get('/', $.list);

router.post('/', $.create);

router.get('/:id', $.show);

router.patch('/:id', $.update);

router.delete('/:id', $.destroy);

// -- custom routes




module.exports = router;