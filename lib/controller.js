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
  this.out_file_name = o.controller_path  +'/'+ Inflector.pluralize(o.model.entity) + "_controller.js";
  this.source_file = o.root_path + '/tpl/' + o.framework + '/controllers/controller.js'
  
  // console.log(o)
  // debug(this);
  
  var source = this.source_file;
  var dest = this.out_file_name;

  var keypair = [];
  for(var k in o.model.attr){
    if (o.framework == 'koa2-common' || o.framework == 'koa2-async' || o.framework == 'koa2-generator') {
      keypair.push( k + ": ctx.request.body." + k );
    } else{
      keypair.push( k + ": req.body." + k );  
    }
    
  }
  
    // console.log(source)
  
  
  this.keypair = '{'+ keypair.join(',') + '}'

    console.log(this.keypair)
  tpl.tpl_apply(source, this, dest);
}

module.exports = g;