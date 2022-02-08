const request = require('supertest');
const app = require('../app');
//const bcrypt = require('bcrypt');

describe("Unit test for User", () => {

  test("POST Register", () => {
    return request(app)
      .post('/users/register')
      .send({
        id: 1,
        full_name: 'john',
        email: 'didik@gmail.com',
        usernamae: 'didik123',
        password: 'john123',
        profile_image_url: 'www.image.com',
        age: 20,
        phone_number: '082999871234'
      })
      .set('Content-Type', 'application/json')
      .expect(201)
      .then(data => {
        //expect(data.body.status).toBe('success')
        //expect(data.body.message).toBe('register success')
        expect(data.body.data).not.toBeNull()
      })

  })

})