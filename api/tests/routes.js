
const request = require('supertest');
const app = require('../server.js')
const email = 'test@test.com';
const User = require('../models/User');
const chai = require('chai');

const should = chai.should()

let token

describe('Test routes', () => {

  it('should return 404 for invalid URL', (done) => {
    request(app)
      .get('/nothing-to-see-here')
      .expect(404, done)
  })

  it('should register a user', (done) => {
    request(app)
      .post('/auth/register')
      .send({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'test@test.com',
        password: 'edison123'
      })
      .expect(200, done)
  })

  it('should log a user in', (done) => {
    request(app)
      .post('/auth')
      .send({
        email: 'test@test.com',
        password: 'edison123'
      })
      .expect(200)
      .then((response) => {
        token = response.body.token
        done()
      })
  })

  it('should require correct credentials', (done) => {
    request(app)
      .post('/auth')
      .send({
        email: 'bloop@bloop.com',
        password: 'edison123'
      })
      .expect(401, done)
  })

  it('should require a token to view products', (done) => {
    request(app)
      .get('/products')
      .expect(401, done)
  })

  it('should display products to token bearers', (done) => {
    request(app)
      .get('/products')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .then((response) => {
        response.body.should.be.an('array')
        done()
      })
  })

  it('should not let a random through to /admin', (done) => {
    request(app)
      .get('/admin')
      .expect(401, done)
  })

  after(() => {
    User.remove({ email: email }).then(() => {
      console.log('Cleaned up the DB!');
    })
  })

})