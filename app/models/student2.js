"use strict";

/**
 * Created by alfred on June 9th 2016, 5:05:06 pm.
 */

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var MongooseDao = require('mongoosedao');

var student2Schema = new Schema(
    {"name":"String","password":"String"}
);

var Student2 = mongoose.model('Student2', student2Schema);
var Student2Dao = new MongooseDao(Student2);
 
module.exports = Student2Dao;