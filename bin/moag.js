#!/usr/bin/env node

var debug = require('../lib/debug');
var child_process = require('child_process');
var program = require('commander');

program
  .version('0.0.1')
  .option('-k, --koa', 'generat code with koa')
  .option('-e, --express', 'generat code with express')
  .parse(process.argv);

var opts = {
  framework: 'express'
}

if (program.koa) {
  opts.framework = 'koa2-common';
}

if (program.express) {
  opts.framework = 'express';
}

var argv = process.argv;
argv.shift();

// var file_path = __dirname;
var current_path = process.cwd();

var model = {
  base_path : current_path + '/app',
  entity:'entity',
  attr:{}
}

if(argv.length < 2){
  return debug('Usages: moag -k user name:string password:string');
}

model.entity = argv[1];

argv.shift();

debug(argv)
for(var i in argv){
  var _attr = argv[i];
  
  if(argv[i].match(/:/g)){
    debug('it is a attr' + argv[i]);
    var _attr_arr = argv[i].split(':');
    var k = _attr_arr[0];
    var v = _attr_arr[1];
    model.attr[k] = v
  }
}

// main
var Generator = require('../index');
var g = new Generator(model, opts);

g.start();