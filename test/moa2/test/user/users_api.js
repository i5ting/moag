import test from 'ava'
import superkoa from 'superkoa'

var model = 'users'

var user

var app = require('path').join(__dirname, '../../app.js')

var mockUser = {
  // 'username': 'alfred',
  // 'password': '000000'
}

test.before(function * (t) {
  var res = yield superkoa(app)
    .post('/api/' + model)
    .send(mockUser)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  user = res.body.user

  t.is(200, res.status)
})

/**
 * Auto generate RESTful url routes.
 *
 * URL routes:
 *
 *  GET    /users[/]        => user.list()
 *  GET    /users/new       => user.new()
 *  GET    /users/:id       => user.show()
 *  GET    /users/:id/edit  => user.edit()
 *  POST   /users[/]        => user.create()
 *  PATCH  /users/:id       => user.update()
 *  DELETE /users/:id       => user.destroy()
 *
 */

// *  GET    /users[/]        => user.list()
test('GET /' + model, function * (t) {
  var res = yield superkoa(app)
    .get('/' + model)

  t.is(200, res.status)
  t.regex(res.text, /table/g)
})

// *  GET    /users/new       => user.new()
test('GET /' + model + '/new', function * (t) {
  var res = yield superkoa(app)
    .get('/' + model + '/new')

  t.is(200, res.status)
  t.regex(res.text, /New\suser/)
})

// *  GET    /users/:id       => user.show()
test('GET /' + model + '/:id show', function * (t) {
  var res1 = yield superkoa(app)
    .post('/api/' + model)
    .send(mockUser)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  user = res1.body.user

  var res = yield superkoa(app)
    .get('/' + model + '/' + user._id)

  t.is(200, res.status)
  t.regex(res.text, /Edit/)
})

// *  GET    /users/:id/edit  => user.edit()
test('GET /' + model + '/:id/edit', function * (t) {
  var res1 = yield superkoa(app)
    .post('/api/' + model)
    .send(mockUser)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  user = res1.body.user

  var res = yield superkoa(app)
    .get('/' + model + '/' + user._id + '/edit')

  t.is(200, res.status)
  t.regex(res.text, /Editing\suser/)
})

// *  POST   /users[/]        => user.create()
test('POST /' + model, function * (t) {
  var res = yield superkoa(app)
    .post('/' + model)
    .send(mockUser)

  t.is(200, res.status)
  t.regex(res.text, /Edit/)
})

// *  PATCH  /users/:id       => user.update()
test('PATCH /' + model + '/:id update', function * (t) {
  var res = yield superkoa(app)
    .patch('/' + model + '/' + user._id)
    .send({
      'username': 'alfred',
      'password': '111111'
    })
  // console.log(res)
  t.is(200, res.status)
  t.is(res.body.status.code, 0)
})

// *  DELETE /users/:id       => user.destroy()
test('DELETE /' + model + '/:id destroy', function * (t) {
  var res1 = yield superkoa(app)
    .post('/api/' + model)
    .send(mockUser)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  user = res1.body.user

  var res = yield superkoa(app)
    .del('/' + model + '/' + user._id)

  t.is(200, res.status)
  t.is(res.body.status.code, 0)
})

// api
test('API GET /api/' + model, function * (t) {
  var res = yield superkoa(app)
    .get('/api/' + model)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})

test('API POST /api/' + model, function * (t) {
  var res = yield superkoa(app)
    .post('/api/' + model)
    .field('username', 'my awesome avatar')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})

test('API GET /api/' + model + '/:user_id', function * (t) {
  var res = yield superkoa(app)
    .get('/api/' + model + '/:user_id')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})

test('API PATCH /api/' + model + '/:user_id', function * (t) {
  var res = yield superkoa(app)
    .patch('/api/' + model + '/:user_id')
    .field('username', 'my awesome avatar')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})

test('API GET /api/' + model + '/:user_id', function * (t) {
  var res = yield superkoa(app)
    .delete('/api/' + model + '/:user_id')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})
