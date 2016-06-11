"use strict";

/**
 * Created by Moajs on June 12th 2016, 4:01:58 am.
 */
 
var $models = require('mount-models')(__dirname);

var User = $models.user;

exports.list = function *(ctx, next) {
  console.log(ctx.method + ' /users => list, query: ' + JSON.stringify(ctx.query));
  
  let users = yield User.getAllAsync();
  
  yield ctx.render('users/index', {
    users : users
  })
};

exports.new = function *(ctx, next) {
  console.log(ctx.method + ' /users/new => new, query: ' + JSON.stringify(ctx.query));

  yield ctx.render('users/new', {
    user : {
      "_action" : "new"
    }
  });
};

exports.show = function *(ctx, next) {
  console.log(ctx.method + ' /users/:id => show, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));
  let id = ctx.params.id;
  let user = yield User.getByIdAsync(id);
  
  console.log(user);
  
  yield ctx.render('users/show', {
    user : user
  });
};

exports.edit = function *(ctx, next) {
  console.log(ctx.method + ' /users/:id/edit => edit, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));

  let id = ctx.params.id;

  let user = yield User.getByIdAsync(id);
  
  console.log(user);
  user._action = 'edit';

  yield ctx.render('users/edit', {
    user : user
  });
};

exports.create = function *(ctx, next) {
  console.log(ctx.method + ' /users => create, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

  let user = yield User.createAsync({username: ctx.request.body.username,password: ctx.request.body.password,avatar: ctx.request.body.avatar,phone_number: ctx.request.body.phone_number,address: ctx.request.body.address});
  
  console.log(user);
  yield ctx.render('users/show', {
    user : user
  });
};

exports.update = function *(ctx, next) {
  console.log(ctx.method + ' /users/:id => update, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

  let id = ctx.params.id;

  let user = yield User.updateByIdAsync(id,{username: ctx.request.body.username,password: ctx.request.body.password,avatar: ctx.request.body.avatar,phone_number: ctx.request.body.phone_number,address: ctx.request.body.address});
  
  yield ctx.body = ({
    data:{
      redirect : '/users/' + id
    },
    status:{
      code : 0,
      msg  : 'delete success!'
    }
  });
};

exports.destroy = function *(ctx, next) {
  console.log(ctx.method + ' /users/:id => destroy, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));
  let id = ctx.params.id;
  
  yield User.deleteByIdAsync(id);
  
  yield ctx.body= ({
    data:{},
    status:{
      code : 0,
      msg  : 'delete success!'
    }
  });
};

// -- custom

// -- custom api
exports.api = {
  list: function *(ctx, next) {
    let user_id = ctx.api_user._id;

    let users = yield User.queryAsync({});
    
    yield ctx.api({
      users : users
    })
  },
  show: function *(ctx, next) {
    let user_id = ctx.api_user._id;
    let id = ctx.params.user_id;

    let user = yield User.getByIdAsync(id);
    
    yield ctx.api({
      user : user
    });
  },
  create: function *(ctx, next) {
    let user_id = ctx.api_user._id;

    let user = yield User.createAsync({username: ctx.request.body.username,password: ctx.request.body.password,avatar: ctx.request.body.avatar,phone_number: ctx.request.body.phone_number,address: ctx.request.body.address});
    
    yield ctx.body = ({
      user : user
    });
  },
  update: function *(ctx, next) {
    let user_id = ctx.api_user._id;
    let id = ctx.params.user_id;
    
    let user = yield User.updateByIdAsync(id, {username: ctx.request.body.username,password: ctx.request.body.password,avatar: ctx.request.body.avatar,phone_number: ctx.request.body.phone_number,address: ctx.request.body.address});
    
    yield ctx.api({
      user : user,
      redirect : '/users/' + id
    });
  },
  delete: function *(ctx, next) {
    let user_id = ctx.api_user._id;
    let id = ctx.params.user_id;

    yield User.deleteByIdAsync(id);
    
    yield ctx.api({id: id});
  }
}
