/**
 * Created by Moajs on May 22nd 2016, 8:24:49 am.
 */

var $models = require('mount-models')(__dirname);

var User = $models.user;

exports.list = function (req, res, next) {
  console.log(req.method + ' /users => list, query: ' + JSON.stringify(req.query));
  
  User.getAll(function(err, users){
    console.log(users);
    res.render('users/index', {
      users : users
    })
  });
};

exports.new = function (req, res, next) {
  console.log(req.method + ' /users/new => new, query: ' + JSON.stringify(req.query));
  
  res.render('users/new', {
    user : {
      "_action" : "new"
    }
  })
};

exports.show = function (req, res, next) {
  console.log(req.method + ' /users/:id => show, query: ' + JSON.stringify(req.query) + 
    ', params: ' + JSON.stringify(req.params));
  var id = req.params.id;
  
  User.getById(id, function(err, user) {
    console.log(user);
    res.render('users/show', {
      user : user
    })
  });
};

exports.edit = function (req, res, next) {
  console.log(req.method + ' /users/:id/edit => edit, query: ' + JSON.stringify(req.query) + 
    ', params: ' + JSON.stringify(req.params));
    
  var id = req.params.id; 
  
  User.getById(id, function (err, user) {
    console.log(user);
    user._action = 'edit';
    
    res.render('users/edit', {
      user : user
    })
  });
};

exports.create = function (req, res, next) {
  console.log(req.method + ' /users => create, query: ' + JSON.stringify(req.query) + 
    ', params: ' + JSON.stringify(req.params) + ', body: ' + JSON.stringify(req.body));
  
  User.create({name: req.body.name,password: req.body.password,uid: req.body.uid}, function (err, user) {
    console.log(user);
    res.render('users/show', {
      user : user
    })
  });
};

exports.update = function (req, res, next) {
  console.log(req.method + ' /users/:id => update, query: ' + JSON.stringify(req.query) + 
    ', params: ' + JSON.stringify(req.params) + ', body: ' + JSON.stringify(req.body));
    
  var id = req.params.id; 

  User.updateById(id,{name: req.body.name,password: req.body.password,uid: req.body.uid}, function (err, user) {
    console.log(user);
  
    res.json({
      data: {
        redirect : '/users/' + id
      },
      status: {
        code : 0,
        msg  : 'delete success!'
      }
    });
  });
};

exports.destroy = function (req, res, next) {
  var id = req.params.id;
  User.deleteById(id, function (err) {
    if (err) {
      throw new Error(err);
    }
    
    res.json({
      data: {},
      status: {
        code : 0,
        msg  : 'delete success!'
      }
    });
  });
};

// -- custom api

exports.api = {
  list: function (req, res, next) {
    var user_id = req.api_user._id;
    
    User.query({}, function (err, users) {
      if (err) {
        return res.api_error(err);
      }
      
      res.api({
        users : users
      })
    });
  },
  show: function (req, res, next) {
    var user_id = req.api_user._id;
    var id = req.params.user_id;
    
    User.getById(id, function (err, user) {
      if (err) {
        return res.api_error(err);
      }
      
      res.api({
        user : user
      });
    }); 
  },
  create: function (req, res, next) {
    var user_id = req.api_user._id;
  
    User.create({name: req.body.name,password: req.body.password,uid: req.body.uid}, function (err, user) {
      if (err) {
        return res.api_error(err);
      }
      
      res.json({
        user : user
      })
    });
  },
  update: function (req, res, next) {
    var user_id = req.api_user._id;
    var id = req.params.user_id; 
    User.updateById(id, {name: req.body.name,password: req.body.password,uid: req.body.uid}, function (err, user) {
      if (err) {
        return res.api_error(err);
      }
  
      res.api({
        user : user,
        redirect : '/users/' + id
      })
    });
  },
  delete: function (req, res, next) {
    var user_id = req.api_user._id;
    var id = req.params.user_id; 
    
    User.deleteById(id, function (err) {
      if (err) {
        return res.api_error(err);
      }
    
      res.api({id: id})
    });
  }
}
