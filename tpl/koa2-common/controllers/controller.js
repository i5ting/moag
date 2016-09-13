"use strict";

/**
 * Created by Moajs on {{created_at}}.
 */

var {{entity}} = $models.{{model}};


exports.list = (ctx, next) => {
  console.log(ctx.method + ' /{{models}} => list, query: ' + JSON.stringify(ctx.query));

  return {{entity}}.getAllAsync().then(( {{models}})=>{
    return ctx.render('{{models}}/index', {
      {{models}} : {{models}}
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.new = (ctx, next) => {
  console.log(ctx.method + ' /{{models}}/new => new, query: ' + JSON.stringify(ctx.query));

  return ctx.render('{{models}}/new', {
    {{model}} : {
      "_action" : "new"
    }
  })
};

exports.show = (ctx, next) => {
  console.log(ctx.method + ' /{{models}}/:id => show, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));
  var id = ctx.params.id;

  return {{entity}}.getByIdAsync(id).then( {{model}} => {
    console.log({{model}});
    return ctx.render('{{models}}/show', {
      {{model}} : {{model}}
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.edit = (ctx, next) => {
  console.log(ctx.method + ' /{{models}}/:id/edit => edit, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));

  var id = ctx.params.id;

  return {{entity}}.getByIdAsync(id).then( {{model}} => {
    console.log({{model}});
    {{model}}._action = 'edit';

    return ctx.render('{{models}}/edit', {
      {{model}} : {{model}}
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.create = (ctx, next) => {
  console.log(ctx.method + ' /{{models}} => create, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

  return {{entity}}.createAsync({{keypair}}).then( {{model}} => {
    console.log({{model}});
    return ctx.render('{{models}}/show', {
      {{model}} : {{model}}
    })
  }).catch((err)=>{
      return ctx.api_error(err);
  });
};

exports.update = (ctx, next) => {
  console.log(ctx.method + ' /{{models}}/:id => update, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

    var id = ctx.params.id;

    return {{entity}}.updateById(id,{{keypair}}).then( {{model}} => {
      console.log({{model}});

      return ctx.body = ({
        data:{
          redirect : '/{{models}}/' + id
        },
        status:{
          code : 0,
          msg  : 'delete success!'
        }
      });
    });
};

exports.destroy = (ctx, next) => {
  console.log(ctx.method + ' /{{models}}/:id => destroy, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));
  var id = ctx.params.id;
  return {{entity}}.deleteByIdAsync(id).then( () =>{
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
    var {{model}}_id = ctx.api_{{model}}._id;

    return {{entity}}.queryAsync({}).then(({{models}}) => {
      return ctx.api({
        {{models}} : {{models}}
      })
    }).catch((err)=>{
      return ctx.api_error(err);
    });
  },
  show: (ctx, next) => {
    var {{model}}_id = ctx.api_{{model}}._id;
    var id = ctx.params.{{model}}_id;

    return {{entity}}.getByIdAsync(id).then(({{model}})=>{
      return ctx.api({
        {{model}} : {{model}}
      });
    }).catch((err)=>{
      return ctx.api_error(err);
    });
  },
  create: (ctx, next) => {
    var {{model}}_id = ctx.api_{{model}}._id;

    return {{entity}}.createAsync({{keypair}}).then({{model}}=> {
      return ctx.body = ({
        {{model}} : {{model}}
      })
    }).catch((err)=>{
      return ctx.api_error(err);
    });

  },
  update: (ctx, next) => {
    var {{model}}_id = ctx.api_{{model}}._id;
    var id = ctx.params.{{model}}_id;
    return {{entity}}.updateByIdAsync(id, {{keypair}}).then({{model}}=> {
      return ctx.api({
        {{model}} : {{model}},
        redirect : '/{{models}}/' + id
      })
    }).catch((err)=>{
      return ctx.api_error(err);
    });
  },
  delete: (ctx, next) => {
    var {{model}}_id = ctx.api_{{model}}._id;
    var id = ctx.params.{{model}}_id;

    return {{entity}}.deleteByIdAsync(id).then(function(){
      return ctx.api({id: id})
    }).catch((err)=>{
      return ctx.api_error(err);
    }); 
  }
}
