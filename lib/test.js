var fs = require('fs')
var Inflector = require('inflected')
var tpl = require('tpl_apply')
var moment = require('moment')
var debug = require('../lib/debug')
var mkdirp = require('mkdirp')

// movies_controller
function g(o) {
  this.created_at = moment().format('MMMM Do YYYY, h:mm:ss a')
  this.entity = Inflector.camelize(o.model.entity)
  this.attrs = JSON.stringify(o.model.attr)
    // debug(o)
  this.model  = o.model.entity
  this.models = Inflector.pluralize(o.model.entity)
  this.out_file_name = o.test_path  +'/'+ this.model + '/' + this.models + "_api.js"
  this.source_file = o.root_path + '/tpl/' + o.framework + '/test/movies.js'
  
  console.log(this.out_file_name )
  // debug(this)
  var isExist = fs.existsSync(this.source_file)
  
  mkdirp.sync(o.test_path  +'/'+ this.model)
  
  if (isExist) {
    var source = this.source_file
    var dest = this.out_file_name

    tpl.tpl_apply(source, this, dest)
  }
}

module.exports = g