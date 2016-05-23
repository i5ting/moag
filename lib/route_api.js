var Inflector = require('inflected');
var tpl = require('tpl_apply');
var moment = require('moment');
var debug = require('../lib/debug');

// movies_controller
function g(o) {
  this.created_at = moment().format('MMMM Do YYYY, h:mm:ss a');
  this.entity = Inflector.camelize(o.model.entity);
  this.attrs = JSON.stringify(o.model.attr);
    // debug(o);
  this.model  = o.model.entity;
  this.models = Inflector.pluralize(o.model.entity);
  this.out_file_name = o.route_path  +'/api/'+ this.models + ".js";
  this.source_file = o.root_path + '/tpl/' + o.framework + '/routes/api/movie.js'
  
  // debug(this);
  
  var source = this.source_file;
  var dest = this.out_file_name;

  tpl.tpl_apply(source, this, dest);
}

module.exports = g;