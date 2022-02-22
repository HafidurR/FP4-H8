const request = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')
const { User } = require("../models")

let auth = {}

dataUser = {
    email: "test@test.com",
    full_name: "testing",
    username: "test",
    password: "test",
    profile_image_url: "https://cdn.vox-cdn.com/thumbor/EUufQk5os51t53YCPtfQO89ruM4=/104x0:3104x2000/1400x1050/filters:focal(104x0:3104x2000):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/45660742/spiderman.0.0.jpg",
    age: 20,
    phone_number: "082116663659"
}


beforeAll(async () => {
    await User.sequelize.truncate({ cascade: true, restartIdentity: true })
    await request(app)
      .post('/users/register')
      .send(dataUser)
      .set('Accept', 'application/json')
  
    const login = await request(app)
      .post('/users/login')
      .send({
        email: dataUser.email,
        password: dataUser.password
      })
      .set('Accept', 'application/json')
    auth.token = login.body.token;
    auth.current_user_id = jwt.decode(auth.token).id;
  })


describe("Testing for endpoint /photos", () => {

  test("requires login", async () => {
    const response = await request(app).get('/photos')
    expect(response.statusCode).toBe(500)
    expect(response.body.message).toBe("jwt must be provided");
  })

    test("POST /photos -  Create Photo", (done) => {
        jwt.verify(auth.token, 'secretkey', (err, decoded) => {
            return new Promise((resolve, reject) => {
                if (err) reject(err)
                resolve(decoded)
            })
        })
            .then((result) => {
                request(app)
                    .post(`/photos`)
                    .set('token', auth.token)
                    .send({
                        poster_image_url: "https://cdn.vox-cdn.com/thumbor/EUufQk5os51t53YCPtfQO89ruM4=/104x0:3104x2000/1400x1050/filters:focal(104x0:3104x2000):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/45660742/spiderman.0.0.jpg",
                        title: "Amazing spiderman - Testing",
                        caption: "Caption photo nya"
                    })
                    .end((err, res) => {
                        if (err) {
                            console.log(err)
                            return done()
                        } else {
                            expect(res.body).toHaveProperty("title")
                            expect(res.body).toHaveProperty('caption')
                            expect(res.body).toHaveProperty('poster_image_url')
                            expect(res.body.poster_image_url).not.toBeNull()
                            expect(res.statusCode).toBe(201)
                            return done()
                        }
                    })
            })
            .catch(error => {
                return done(error)
            })
    })

    test("GET /photos -  list Photos", async () => {

        const response = await request(app)
          .get('/photos')
          .set('token', auth.token)
                expect(response.status).toBe(200)
                expect(typeof response).toBe("object")
                expect(response.body).toHaveProperty('photos')
                expect(response.body.photos[0]).toHaveProperty('poster_image_url')
                expect(response.body.photos[0]).toHaveProperty('title')
                expect(response.body.photos[0]).toHaveProperty('caption')
				        expect(response.body.photos[0].title).toBe('Amazing spiderman - Testing')
                expect(response.body.photos[0].caption).toBe('Caption photo nya')
    })

    test("PUT /photos/:photoId -  Edit Photo", async () => {
        const response = await request(app)
          .put('/photos/1')
          .set('token', auth.token)
          .send({
            title: 'test edit',
            caption: 'photo edited',
            poster_image_url : 'https://google.com'
          })
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('photo')
            expect(response.body.photo).toHaveProperty('title')
            expect(response.body.photo).toHaveProperty('caption')
            expect(response.body.photo).toHaveProperty('poster_image_url')
    })


    test("DELETE /photos/:photoId -  delete Photo", async () => {
        const response = await request(app)
          .delete('/photos/1')
          .set('token', auth.token)
    
        expect(response.status).toBe(200)
        expect(typeof response).toBe("object")
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toContain('Your Photo has been successfully deleted.')
        expect(response.body.message).toBe('Your Photo has been successfully deleted.')
    
      })

})


afterAll(async () => {
    await User.sequelize.truncate({ cascade: true, restartIdentity: true })
})



