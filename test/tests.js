const request = require('supertest'),
  app = require('../index'),
  Request = require('../models/Request')

console.log('Initializing tests.js')

// pull all requests from test db
console.log('Pulling Requests')
let requests = Request.find({})
console.log(requests.length)

describe('Index.js', () => {
  // root url should redirect to admin login
  it('redirects to admin', done => {
    request(app)
      .get('/')
      .expect(302)
      .expect('Location', /\/admin/, done)
  })
  // 404 congifured for unknown routes
  it('displays 404.pug on unknown route', done => {
    request(app)
      .get('/abd123')
      .expect(404)
      .expect(/404/, done)
  })
})

describe('Admin Controller', () => {
  // admin page should display home.pug
  it('responds with 200 and display page', done => {
    request(app)
      .get('/admin')
      .expect(200)
      .expect(/Passcode is required for access to dashboard/, done)
  })
  // checkPassword should reject incorrect passwords
  it('rejects incorrect password and refreshes page with error', done => {
    request(app)
      .post('/admin/dashboard')
      .type('form')
      .send({ username: 'admin', password: 'abc123' })
      .expect(302)
      .expect('Location', /\/denied/, done)
  })
  // checkPassword should validate correct password
  it('accepts correct password and displays dashboard', done => {
    request(app)
      .post('/admin/dashboard')
      .type('form')
      .send({ username: 'admin', password: process.env.ADMIN_PASSCODE })
      .expect(200)
      .expect(/Total requests:/, done)
  })
})

// pages controller endpoints should only return status 200
// confirming hit (no data)
describe('Pages Controller', () => {
  it('responds with 200 on pyramids endpoint', done => {
    request(app)
      .get('/pages/pyramids')
      .expect(200, done)
  })
  it('responds with 200 on rentcheck endpoint', done => {
    request(app)
      .get('/pages/rentcheck')
      .expect(200, done)
  })
  it('responds with 200 on liverpool endpoint', done => {
    request(app)
      .get('/pages/liverpool')
      .expect(200, done)
  })
})
