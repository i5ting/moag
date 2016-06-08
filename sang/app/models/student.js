"use strict";

/**
 * Created by alfred on June 8th 2016, 10:45:22 am.
 */

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var MongooseDao = require('mongoosedao');

var studentSchema = new Schema(
    {"name":"String","password":"String"}
);

var Student = mongoose.model('Student', studentSchema);
var StudentDao = new MongooseDao(Student);
 
module.exports = StudentDao;