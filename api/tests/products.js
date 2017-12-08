const request = require('supertest');
const app = require('../server.js')
const User = require('../models/User');
const product = require('../models/Product');

const chai = require('chai');
const should = chai.should();

const email = 'test@test.com';

let token

describe('Test products CRUD', () => {

  before((done) => {
    request(app)
      .post('/auth/register')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email: email,
        password: 'edison123',
        role: 'user'
      })
    .then((response) => {
      token = response.body.token
      console.log(token)
      done()
    })
  })

  it('should be able to create a product if user has a valid Bearer token', (done) => {
    request(app)
      .post('/products/new')
      .set('Authorization', `Bearer ${token}`)
      .send({
        brandName: 'Apple',
        name: 'Mac Mini'
      })
      .expect(200)
      .then((response) => {
        response.body.should.be.an('object')
        done()
      })
  })

  it('should be able to read a product if user has a valid Bearer token', (done) => {
    request(app)
      .get('/products')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        response.body.should.be.an('array')
        done()
      })
  })

  after(() => {
    product.remove({ name: 'Mac Mini' }).then(() => {
      console.log('Cleaned up test product!');
    })
    User.remove({ email: email }).then(() => {
      console.log('Cleaned up test user!');
    })
  })

})