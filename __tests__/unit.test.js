const request = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken');
let token_test;

describe("Testing for User", () => {

    test("Register User", (done) => {
        request(app)
            .post('/users/register')
            .send({
                email: "hafid1@gmail.com",
                full_name: "M. Hafidurrohman",
                username: "Hafid123",
                password: "Hafid123",
                profile_image_url: "https://www.images.com",
                age: 20,
                phone_number: "082987123765",
            })
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    return done();
                }
                expect(res.body).toHaveProperty('user')
                expect(res.body.user).not.toBeNull();
                expect(res.body.user).toHaveProperty('email')
                expect(res.body.user).toHaveProperty('full_name')
                expect(res.body.user).toHaveProperty('username')
                expect(res.body.user).toHaveProperty('profile_image_url')
                expect(res.body.user).toHaveProperty('age')
                expect(res.body.user).toHaveProperty('phone_number')
                expect(res.statusCode).toBe(201);
                return done()
            })
    })

    test("Login User", (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: "hafid1@gmail.com",
                password: "Hafid123"
            })
            .end((err, res) => {
                if (err) {
                    console.log(err);
                    return done()
                } else {
                    expect(res.body).toHaveProperty("token");
                    expect(res.body.token).not.toBeUndefined();
                    expect(res.body.token).not.toBeNull();
                    expect(res.body.token).not.toHaveLength(0);
                    expect(res.body.token.length).toBeGreaterThan(0)
                    expect(res.statusCode).toBe(200);
                    token_test = res.body.token
                    return done()
                }
            })
    })

    test("Update User", (done) => {
        jwt.verify(token_test, 'secretkey', (err, decoded) => {
            return new Promise((resolve, reject) => {
                if (err) reject(err)
                resolve(decoded)
            })
        })
            .then((result) => {
                request(app)
                    .put(`/users/${result.id}`)
                    .send({
                        email: "hafid1@gmail.com",
                        full_name: "M. Hafidurrohman Ajalah",
                        username: "Hafid123 Aja",
                        profile_image_url: "https://www.images.com",
                        age: 20,
                        phone_number: "082987123765",
                    })
                    .set('token', token_test)
                    .end((err, res) => {
                        if (err) {
                            console.log(err);
                            return done()
                        } else {
                            expect(res.body).toHaveProperty('user')
                            expect(res.body.user).not.toBeNull();
                            expect(res.body.user).toHaveProperty('email')
                            expect(res.body.user).toHaveProperty('full_name')
                            expect(res.body.user).toHaveProperty('username')
                            expect(res.body.user).toHaveProperty('profile_image_url')
                            expect(res.body.user).toHaveProperty('age')
                            expect(res.body.user).toHaveProperty('phone_number')
                            expect(res.statusCode).toBe(200);
                            return done()
                        }
                    })
            })
            .catch(error => {
                return done(error)
            })
    })

    test("Delete User", () => {
        jwt.verify(token_test, 'secretKey', (err, decode) => {
            return new Promise((resolve, reject) => {
                if (err) reject(err)
                resolve(decode)
            })
        })
            .then((result) => {
                request(app)
                    .delete(`/users/${result.id}`)
                    .set('token', token_test)
                    .end((err, res) => {
                        if (err) {
                            console.log(err);
                            return done()
                        }
                        expect(typeof res).toBe('object')
                        expect(res.body).toHaveProperty('message')
                        expect(res.body.message).toHaveProperty('Your account has been successfully deleted.')
                        expect(200)
                    })
            })
    })

})


