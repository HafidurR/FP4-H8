const request = require('supertest');
const app = require('../app');
const { User } = require('../models');

let token_test;

beforeAll(async () => {
  await User.sequelize.truncate({ cascade: true, restartIdentity: true })
  await request(app)
    .post('/users/register')
    .send({
      email: "hafid1@gmail.com",
      full_name: "M. Hafidurrohman",
      username: "Hafid123",
      password: "hafid123",
      profile_image_url: "https://www.images.com",
      age: 20,
      phone_number: "082987123765"
    })
    .set('Accept', 'application/json')

  const login = await request(app)
    .post('/users/login')
    .send({
      email: 'hafid1@gmail.com',
      password: 'hafid123'
    })
    .set('Accept', 'application/json')
  token_test = login.body.token
})


describe("Testing for Socialmedia", () => {
  test("Post socialmedia ", async () => {
    const response = await request(app)
      .post('/socialmedias')
      .send({
        name: 'UNUJA',
        social_media_url: 'https://www.unuja.ac.id/'
      })
      .set('token', token_test)

    expect(response.status).toBe(201)
    expect(typeof response).toBe("object")
    expect(response.body).toHaveProperty('social_media')
    expect(response.body.social_media).toHaveProperty('id')
    expect(response.body.social_media).toHaveProperty('name')
    expect(response.body.social_media).toHaveProperty('social_media_url')
    expect(response.body.social_media).toHaveProperty('UserId')
  })

  test("Get socialmedia", async () => {

    const response = await request(app)
      .get('/socialmedias')
      .set('token', token_test)

    expect(response.status).toBe(200)
    expect(typeof response).toBe("object")
    expect(response.body).toHaveProperty('social_media')
    expect(response.body.social_media[0]).toHaveProperty('id')
    expect(response.body.social_media[0]).toHaveProperty('name')
    expect(response.body.social_media[0]).toHaveProperty('social_media_url')
    expect(response.body.social_media[0]).toHaveProperty('UserId')
  });

  test("Update socialmedia", async () => {
    const response = await request(app)
      .put('/socialmedias/1')
      .send({
        name: 'UNUJA',
        social_media_url: 'https://www.unuja.ac.id/'
      })
      .set('token', token_test)

    expect(response.status).toBe(200)
    expect(typeof response).toBe("object")
    expect(response.body).toHaveProperty('social_media')
    expect(response.body.social_media).toHaveProperty('id')
    expect(response.body.social_media).toHaveProperty('name')
    expect(response.body.social_media).toHaveProperty('social_media_url')
    expect(response.body.social_media).toHaveProperty('UserId')
  })


  test("Delete socialmedia", async () => {

    const response = await request(app)
      .delete('/socialmedias/1')
      .set('token', token_test)

    expect(response.status).toBe(200)
    expect(typeof response).toBe("object")
    expect(response.body).toHaveProperty("message")
    expect(response.body.message).toContain('Your social media has been successfully deleted.')
    expect(response.body.message).toBe('Your social media has been successfully deleted.')

  });
})

afterAll(async () => {
  await User.sequelize.truncate({ cascade: true, restartIdentity: true })
})