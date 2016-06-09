"use strict";

var router = require('koa-router')();
const co = require('co');

// var res_api       = require('res.api');
var $ = require('mount-controllers')(__dirname).student2s_controller;

var $middlewares  = require('mount-middlewares')(__dirname);

// route define
router.get('/', $middlewares.check_api_token, $.api.list);

router.post('/', $middlewares.check_api_token, $.api.create);

router.get('/:student2_id', $middlewares.check_api_token, $.api.show);

router.patch('/:student2_id', $middlewares.check_api_token, $.api.update);

router.delete('/:student2_id', $middlewares.check_api_token, $.api.delete);


module.exports = router;
