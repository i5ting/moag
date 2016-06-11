import test from 'ava'
import superkoa from 'superkoa'

var model = '{{models}}'

var {{model}}

var mock{{entity}} = {
  // '{{model}}name': 'alfred',
  // 'password': '000000'
}

test.before(function * (t) {
  var res = yield superkoa('../../app.js')
    .post('/api/' + model)
    .send(mock{{entity}})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  {{model}} = res.body.{{model}}

  t.is(200, res.status)
})

/**
 * Auto generate RESTful url routes.
 *
 * URL routes:
 *
 *  GET    /{{models}}[/]        => {{model}}.list()
 *  GET    /{{models}}/new       => {{model}}.new()
 *  GET    /{{models}}/:id       => {{model}}.show()
 *  GET    /{{models}}/:id/edit  => {{model}}.edit()
 *  POST   /{{models}}[/]        => {{model}}.create()
 *  PATCH  /{{models}}/:id       => {{model}}.update()
 *  DELETE /{{models}}/:id       => {{model}}.destroy()
 *
 */

// *  GET    /{{models}}[/]        => {{model}}.list()
test('GET /' + model, function * (t) {
  var res = yield superkoa('../../app.js')
    .get('/' + model)

  t.is(200, res.status)
  t.regex(res.text, /table/g)
})

// *  GET    /{{models}}/new       => {{model}}.new()
test('GET /' + model + '/new', function * (t) {
  var res = yield superkoa('../../app.js')
    .get('/' + model + '/new')

  t.is(200, res.status)
  t.regex(res.text, /New\s{{model}}/)
})

// *  GET    /{{models}}/:id       => {{model}}.show()
test('GET /' + model + '/:id show', function * (t) {
  var res1 = yield superkoa('../../app.js')
    .post('/api/' + model)
    .send(mock{{entity}})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  {{model}} = res1.body.{{model}}

  var res = yield superkoa('../../app.js')
    .get('/' + model + '/' + {{model}}._id)

  t.is(200, res.status)
  t.regex(res.text, /Edit/)
})

// *  GET    /{{models}}/:id/edit  => {{model}}.edit()
test('GET /' + model + '/:id/edit', function * (t) {
  var res1 = yield superkoa('../../app.js')
    .post('/api/' + model)
    .send(mock{{entity}})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  {{model}} = res1.body.{{model}}

  var res = yield superkoa('../../app.js')
    .get('/' + model + '/' + {{model}}._id + '/edit')

  t.is(200, res.status)
  t.regex(res.text, /Editing\s{{model}}/)
})

// *  POST   /{{models}}[/]        => {{model}}.create()
test('POST /' + model, function * (t) {
  var res = yield superkoa('../../app.js')
    .post('/' + model)
    .send(mock{{entity}})

  t.is(200, res.status)
  t.regex(res.text, /Edit/)
})

// *  PATCH  /{{models}}/:id       => {{model}}.update()
test('PATCH /' + model + '/:id update', function * (t) {
  var res = yield superkoa('../../app.js')
    .patch('/' + model + '/' + {{model}}._id)
    .send({
      '{{model}}name': 'alfred',
      'password': '111111'
    })
  // console.log(res)
  t.is(200, res.status)
  t.is(res.body.status.code, 0)
})

// *  DELETE /{{models}}/:id       => {{model}}.destroy()
test('DELETE /' + model + '/:id destroy', function * (t) {
  var res1 = yield superkoa('../../app.js')
    .post('/api/' + model)
    .send(mock{{entity}})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  {{model}} = res1.body.{{model}}

  var res = yield superkoa('../../app.js')
    .del('/' + model + '/' + {{model}}._id)

  t.is(200, res.status)
  t.is(res.body.status.code, 0)
})

// api
test('API GET /api/' + model, function * (t) {
  var res = yield superkoa('../../app.js')
    .get('/api/' + model)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})

test('API POST /api/' + model, function * (t) {
  var res = yield superkoa('../../app.js')
    .post('/api/' + model)
    .field('{{model}}name', 'my awesome avatar')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})

test('API GET /api/' + model + '/:{{model}}_id', function * (t) {
  var res = yield superkoa('../../app.js')
    .get('/api/' + model + '/:{{model}}_id')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})

test('API PATCH /api/' + model + '/:{{model}}_id', function * (t) {
  var res = yield superkoa('../../app.js')
    .patch('/api/' + model + '/:{{model}}_id')
    .field('{{model}}name', 'my awesome avatar')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})

test('API GET /api/' + model + '/:{{model}}_id', function * (t) {
  var res = yield superkoa('../../app.js')
    .delete('/api/' + model + '/:{{model}}_id')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)

  t.is(200, res.status)
})
