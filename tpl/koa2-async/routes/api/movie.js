"use strict";

var router = koa_router()

// core controller
const $ = $controllers.{{models}}_controller;

// route define
router.get('/', $middlewares.check_api_token, $.api.list);

router.post('/', $middlewares.check_api_token, $.api.create);

router.get('/:{{model}}_id', $middlewares.check_api_token, $.api.show);

router.patch('/:{{model}}_id', $middlewares.check_api_token, $.api.update);

router.delete('/:{{model}}_id', $middlewares.check_api_token, $.api.delete);


module.exports = router;
