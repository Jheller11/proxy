var request = require('supertest'),
  app = require('../index')

// root url should redirect to admin login
describe('Root', () => {
  it('redirects to admin', done => {
    request(app)
      .get('/')
      .expect(302)
      .expect('Location', /\/admin/, done)
  })
})

// admin page should display home.pug
describe('Admin', () => {
  it('responds with 200 and display page', done => {
    request(app)
      .get('/admin')
      .expect(200)
      .expect(/Passcode is required for access to dashboard/, done)
  })
  it('rejects incorrect password and refreshes page with error', done => {
    request(app)
      .post('/admin/dashboard')
      .type('form')
      .send({ username: 'admin', password: '012345' })
      .expect(302)
      .expect('Location', /\/denied/, done)
  })
  it('accepts correct password and displays dashboard', done => {
    request(app)
      .post('/admin/dashboard')
      .type('form')
      .send({ username: 'admin', password: process.env.ADMIN_PASSCODE })
      .expect(200)
      .expect(/Total requests:/, done)
  })
})
