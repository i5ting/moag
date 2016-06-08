"use strict";

/**
 * Created by Moajs on {{created_at}}.
 */
 
var $models = require('mount-models')(__dirname);

var {{entity}} = $models.{{model}};

exports.list = async (ctx, next) => {
  console.log(ctx.method + ' /{{models}} => list, query: ' + JSON.stringify(ctx.query));
  
  let {{models}} = await {{entity}}.getAllAsync();
  
  await ctx.render('{{models}}/index', {
    {{models}} : {{models}}
  })
};

exports.new = async (ctx, next) => {
  console.log(ctx.method + ' /{{models}}/new => new, query: ' + JSON.stringify(ctx.query));

  await ctx.render('{{models}}/new', {
    {{model}} : {
      "_action" : "new"
    }
  });
};

exports.show = async (ctx, next) => {
  console.log(ctx.method + ' /{{models}}/:id => show, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));
  let id = ctx.params.id;
  let {{model}} = await {{entity}}.getByIdAsync(id);
  
  console.log({{model}});
  
  await ctx.render('{{models}}/show', {
    {{model}} : {{model}}
  });
};

exports.edit = async (ctx, next) => {
  console.log(ctx.method + ' /{{models}}/:id/edit => edit, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params));

  let id = ctx.params.id;

  let {{model}} = await {{entity}}.getByIdAsync(id);
  
  console.log({{model}});
  {{model}}._action = 'edit';

  await ctx.render('{{models}}/edit', {
    {{model}} : {{model}}
  });
};

exports.create = async (ctx, next) => {
  console.log(ctx.method + ' /{{models}} => create, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

  let {{model}} = await {{entity}}.createAsync({{keypair}});
  
  console.log({{model}});
  await ctx.render('{{models}}/show', {
    {{model}} : {{model}}
  });
};

exports.update = async (ctx, next) => {
  console.log(ctx.method + ' /{{models}}/:id => update, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));

  let id = ctx.params.id;

  let {{model}} = await {{entity}}.updateByIdAsync(id,{{keypair}});
  
  ctx.body = ({
    data:{
      redirect : '/{{models}}/' + id
    },
    status:{
      code : 0,
      msg  : 'delete success!'
    }
  });
};

exports.destroy = async (ctx, next) => {
  console.log(ctx.method + ' /{{models}}/:id => destroy, query: ' + JSON.stringify(ctx.query) +
    ', params: ' + JSON.stringify(ctx.params) + ', body: ' + JSON.stringify(ctx.request.body));
  let id = ctx.params.id;
  
  await {{entity}}.deleteByIdAsync(id);
  
  ctx.body = ({
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
  list: async (ctx, next) => {
    let {{model}}_id = ctx.api_{{model}}._id;

    let {{models}} = await {{entity}}.queryAsync({});
    
    await ctx.api({
      {{models}} : {{models}}
    })
  },
  show: async (ctx, next) => {
    let {{model}}_id = ctx.api_{{model}}._id;
    let id = ctx.params.{{model}}_id;

    let {{model}} = await {{entity}}.getByIdAsync(id);
    
    await ctx.api({
      {{model}} : {{model}}
    });
  },
  create: async (ctx, next) => {
    let {{model}}_id = ctx.api_{{model}}._id;

    let {{model}} = await {{entity}}.createAsync({{keypair}});
    
    ctx.body = ({
      {{model}} : {{model}}
    });
  },
  update: async (ctx, next) => {
    let {{model}}_id = ctx.api_{{model}}._id;
    let id = ctx.params.{{model}}_id;
    
    let {{model}} = await {{entity}}.updateByIdAsync(id, {{keypair}});
    
    await ctx.api({
      {{model}} : {{model}},
      redirect : '/{{models}}/' + id
    });
  },
  delete: async (ctx, next) => {
    let {{model}}_id = ctx.api_{{model}}._id;
    let id = ctx.params.{{model}}_id;

    await {{entity}}.deleteByIdAsync(id);
    
    await ctx.api({id: id});
  }
}
