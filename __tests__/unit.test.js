const request = require('supertest');
const app = require('../app');
//const bcrypt = require('bcrypt');

const userRegistrationData = {
    email: "admin1@tester.com",
    full_name: "Admin Tester",
    username: "admin_tester1",
    password: "testtest",
    profile_image_url: "https://www.google.com",
    age: 22,
    phone_number: "085999887285",
}



describe("POST users/register", () => {
    test("Register Success", (done) => {
        request(app)
            .post('/users/register')
            .send(userRegistrationData)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty('user')

                expect(res.body.user).toHaveProperty('email')
                expect(res.body.user.email).toBe(userRegistrationData.email)
                
                expect(res.body.user).toHaveProperty('full_name')
                expect(res.body.user.full_name).toBe(userRegistrationData.full_name)
                
                expect(res.body.user).toHaveProperty('username')
                // expect(res.body.user.username).toBe(userRegistrationData.username)
                
                expect(res.body.user).toHaveProperty('profile_image_url')
                expect(res.body.user.profile_image_url).toBe(userRegistrationData.profile_image_url)
                
                expect(res.body.user).toHaveProperty('age')
                expect(res.body.user.age).toBe(userRegistrationData.age)
                
                expect(res.body.user).toHaveProperty('phone_number')
                expect(res.body.user.phone_number).toBe(userRegistrationData.phone_number)
                
                return done()
            })
    })
})
