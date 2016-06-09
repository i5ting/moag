"use strict";

var router = require('koa-router')();
const co = require('co');

var $middlewares  = require('mount-middlewares')(__dirname);

// core controller
var $ = require('mount-controllers')(__dirname).student2s_controller;

/**
 * Auto generate RESTful url routes.
 *
 * URL routes:
 *
 *  GET    /student2s[/]        => student2.list()
 *  GET    /student2s/new       => student2.new()
 *  GET    /student2s/:id       => student2.show()
 *  GET    /student2s/:id/edit  => student2.edit()
 *  POST   /student2s[/]        => student2.create()
 *  PATCH  /student2s/:id       => student2.update()
 *  DELETE /student2s/:id       => student2.destroy()
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