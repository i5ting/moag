"use strict";

/**
 * Created by Moajs on June 9th 2016, 5:05:06 pm.
 */
 
var $models = require('mount-models')(__dirname);

var Student2 = $models.student2;


exports.list = (ctx, next) => {
  console.log(ctx.method + ' /student2s => list, query: ' + JSON.stringify(ctx.query));

  return Student2.getAllAsync().then(( student2s)=>{
    return ctx.render('student2s/index', {
      student2s : student2s
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.new = (ctx, next) => {
  console.log(ctx.method + ' /student2s/new => new, query: ' + JSON.stringify(ctx.query));

  return ctx.render('student2s/new', {
    student2 : {
      "_action" : "new"
    }
  })
};

exports.show = (ctx, next) => {
  console.log(ctx.method + ' /student2s/:id => show, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));
  var id = ctx.params.id;

  return Student2.getByIdAsync(id).then( student2 => {
    console.log(student2);
    return ctx.render('student2s/show', {
      student2 : student2
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.edit = (ctx, next) => {
  console.log(ctx.method + ' /student2s/:id/edit => edit, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));

  var id = ctx.params.id;

  return Student2.getByIdAsync(id).then( student2 => {
    console.log(student2);
    student2._action = 'edit';

    return ctx.render('student2s/edit', {
      student2 : student2
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.create = (ctx, next) => {
  console.log(ctx.method + ' /student2s => create, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

  return Student2.createAsync({name: ctx.request.body.name,password: ctx.request.body.password}).then( student2 => {
    console.log(student2);
    return ctx.render('student2s/show', {
      student2 : student2
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.update = (ctx, next) => {
  console.log(ctx.method + ' /student2s/:id => update, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

    var id = ctx.params.id;

    return Student2.updateById(id,{name: ctx.request.body.name,password: ctx.request.body.password}).then( student2 => {
      console.log(student2);

      return ctx.body = ({
        data:{
          redirect : '/student2s/' + id
        },
        status:{
          code : 0,
          msg  : 'delete success!'
        }
      });
    });
};

exports.destroy = (ctx, next) => {
  console.log(ctx.method + ' /student2s/:id => destroy, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));
  var id = ctx.params.id;
  return Student2.deleteByIdAsync(id).then( () =>{
    return ctx.body= ({
      data:{},
      status:{
        code : 0,
        msg  : 'delete success!'
      }
    });
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

// -- custom

// -- custom api
exports.api = {
  list: (ctx, next) => {
    var student2_id = ctx.api_student2._id;

    return Student2.queryAsync({}).then((student2s) => {
      return ctx.api({
        student2s : student2s
      })
    }).catch((err)=>{
      return ctx.api_error(err);
    });
  },
  show: (ctx, next) => {
    var student2_id = ctx.api_student2._id;
    var id = ctx.params.student2_id;

    return Student2.getByIdAsync(id).then((student2)=>{
      return ctx.api({
        student2 : student2
      });
    }).catch((err)=>{
      return ctx.api_error(err);
    });
  },
  create: (ctx, next) => {
    var student2_id = ctx.api_student2._id;

    return Student2.createAsync({name: ctx.request.body.name,password: ctx.request.body.password}).then(student2=> {
      return ctx.body = ({
        student2 : student2
      })
    }).catch((err)=>{
      return ctx.api_error(err);
    });

  },
  update: (ctx, next) => {
    var student2_id = ctx.api_student2._id;
    var id = ctx.params.student2_id;
    return Student2.updateByIdAsync(id, {name: ctx.request.body.name,password: ctx.request.body.password}).then(student2=> {
      return ctx.api({
        student2 : student2,
        redirect : '/student2s/' + id
      })
    }).catch((err)=>{
      return ctx.api_error(err);
    });
  },
  delete: (ctx, next) => {
    var student2_id = ctx.api_student2._id;
    var id = ctx.params.student2_id;

    return Student2.deleteByIdAsync(id).then(function(){
      return ctx.api({id: id})
    }).catch((err)=>{
      return ctx.api_error(err);
    }); 
  }
}
