#!/usr/bin/env node

var child_process = require('child_process');
var path = require('path');

var argv = process.argv;
argv.shift();

// var file_path = __dirname;
var current_path = process.cwd();

var model = {
  base_path : path.join(current_path , '.'),
  entity:'entity',
  attr:{}
}

if(argv.length < 1){
  return console.log('Usages: moad user');
}

model.entity = argv[1];

// main
var Generator = require('../index');
var g = new Generator(model,{});

g.destroy();
 

  