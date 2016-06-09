require('shelljs/global');

var util = require("util");
var mkdirp = require('mkdirp');
var Inflector = require('inflected');
var tpl = require('tpl_apply');
var debug = require('./lib/debug');
// util.inherits(MyStream, events.EventEmitter);

// var file_path = __dirname;
// var current_path = process.cwd();
function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

var cache_path = getUserHome() + '/.express-g/';

mkdirp(cache_path, function (err) {
    if (err) console.error(err)
    else debug('pow! create cache_path')
});

var _default_options = function (base_path){
  return {
    controller_path : base_path + '/app/controllers',
    model_path      : base_path + '/app/models',
    view_path       : base_path + '/app/views',
    route_path      : base_path + '/app/routes',
    test_path       : base_path + '/test' 
  }
}

function _cp(des, src) {
  if (!des) {
    des = {};
  }
  if (src) {
    for (var i in src) {
      des[i] = src[i];
    }
  }
  return des;
}

function g (obj, opts) {
  this.model = obj;
  
  this.root_path = __dirname;
  this.base_path = obj.base_path;
  this.framework = opts.framework ? opts.framework :'express';
  
  this.option = _default_options(this.base_path);
  
  _cp(this.option, opts);
  _cp(this, this.option);
  
  _mkdir(this);
}

function _mkdir(t){
  mkdirp(t.controller_path, function (err) {
      if (err) console.error(err)
      else debug('pow! create controller_path')
  });
  
  mkdirp(t.model_path, function (err) {
      if (err) console.error(err)
      else debug('pow! create model_path')
  });
  
  mkdirp(t.view_path, function (err) {
      if (err) console.error(err)
      else debug('pow! create view_path')
  });
  
  mkdirp(t.route_path, function (err) {
      if (err) console.error(err)
      else debug('pow! create route_path')
  });
  
  mkdirp(t.route_path + '/api', function (err) {
      if (err) console.error(err)
      else debug('pow! create route_api_path')
  });
}


g.prototype.generate_controller = function () {
  require('./lib/controller')(this)
}

g.prototype.generate_test = function () {
  require('./lib/test')(this)
}

g.prototype.generate_model = function () {
  require('./lib/model')(this)
}

g.prototype.generate_view = function () {
  require('./lib/view')(this)
}

g.prototype.generate_route = function () {
  require('./lib/route')(this)
}

g.prototype.generate_route_api = function () {
  require('./lib/route_api')(this)
}

g.prototype.start = g.prototype.all = function () {
  this.generate_controller();
  this.generate_test();
  this.generate_model();
  this.generate_view();
  this.generate_route();
  this.generate_route_api();
}

g.prototype.destroy = function () {
  var entity = this.model.entity;
  var cache_path = getUserHome() +'/.express-g/' + Date.now();
  
  mkdirp(cache_path, function (err) {
    if (err) console.error(err)
    else debug('pow! create controller_path')
  });
  
  var c = this.controller_path  +'/'+ Inflector.pluralize(entity) + "_controller.js";
  var t = this.controller_path  +'/'+ Inflector.pluralize(entity) + "_controller.js";
  var m = this.model_path  +'/'+ entity + ".js";
  var v = this.view_path  +'/'+ Inflector.pluralize(entity) + "/";
  var r = this.route_path  +'/'+ Inflector.pluralize(entity) + ".js";
  var a = this.route_path  +'/api/'+ Inflector.pluralize(entity) + ".js";
  
  [c, t, m, v, r, a].forEach(function(file){
    mv('-f', file, cache_path + '/');
  });
}

module.exports = g;