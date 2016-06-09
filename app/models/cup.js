"use strict";

/**
 * Created by alfred on June 9th 2016, 11:44:03 am.
 */

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var MongooseDao = require('mongoosedao');

var cupSchema = new Schema(
    {"name":"String","password":"String"}
);

var Cup = mongoose.model('Cup', cupSchema);
var CupDao = new MongooseDao(Cup);
 
module.exports = CupDao;