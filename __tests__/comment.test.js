const request = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')
const { User, Photo } = require("../models")

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

dataPhoto = {
    
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
    
    await Photo.create({
        poster_image_url: "https://cdn.vox-cdn.com/thumbor/EUufQk5os51t53YCPtfQO89ruM4=/104x0:3104x2000/1400x1050/filters:focal(104x0:3104x2000):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/45660742/spiderman.0.0.jpg",
        title: "Amazing spiderman - Testing",
        caption: "Caption photo nya",
        UserId : auth.current_user_id
    })
    
  })


describe("Testing for endpoint /comments", () => {

    test("POST /comments -  post / create comment", (done) => {
        jwt.verify(auth.token, 'secretkey', (err, decoded) => {
            return new Promise((resolve, reject) => {
                if (err) reject(err)
                resolve(decoded)
            })
        })
            .then((result) => {
                request(app)
                    .post(`/comments`)
                    .set('token', auth.token)
                    .send({
                        comment: "comment here",
                        PhotoId: 1
                    })
                    .end((err, res) => {
                        if (err) {
                            console.log(err)
                            return done()
                        } else {
                            expect(res.statusCode).toBe(201)
                            expect(res.body).toHaveProperty("comment")
                            expect(res.body.comment).toHaveProperty("id")
                            expect(res.body.comment).toHaveProperty("comment")
                            expect(res.body.comment).toHaveProperty("UserId")
                            expect(res.body.comment).toHaveProperty("PhotoId")
                            return done()
                        }
                    })
            })
            .catch(error => {
                return done(error)
            })
    })

    test("GET /Comments -  list Comment", async () => {

        const response = await request(app)
          .get('/comments')
          .set('token', auth.token)
                expect(response.statusCode).toBe(200)
                expect(typeof response).toBe("object")
                expect(response.body).toHaveProperty('comments')
                expect(response.body.comments[0]).toHaveProperty('id')
                expect(response.body.comments[0]).toHaveProperty('UserId')
                expect(response.body.comments[0]).toHaveProperty('PhotoId')
                expect(response.body.comments[0]).toHaveProperty('comment')
                expect(response.body.comments[0]).toHaveProperty('updatedAt')
                expect(response.body.comments[0]).toHaveProperty('createdAt')
                expect(response.body.comments[0].Photo.title).toBe('Amazing spiderman - Testing')
                expect(response.body.comments[0].Photo.caption).toBe('Caption photo nya')
               
    })

    test("PUT /comments/:commentId -  Edit Comment", async () => {
        const response = await request(app)
          .put('/comments/1')
          .set('token', auth.token)
          .send({
            comment: 'komntar telah di edit',
          })
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('comment')
            expect(response.body.comment).toHaveProperty('comment')
            expect(response.body.comment).toHaveProperty('id')
            expect(response.body.comment).toHaveProperty('UserId')
            expect(response.body.comment).toHaveProperty('createdAt')
            expect(response.body.comment).toHaveProperty('updatedAt')
    })


    test("DELETE/comments/:commentId -  delete Comment", async () => {
        const response = await request(app)
          .delete('/comments/1')
          .set('token', auth.token)
    
        expect(response.status).toBe(200)
        expect(typeof response).toBe("object")
        expect(response.body).toHaveProperty("message")
        expect(response.body.message).toContain('Your comment has been successfully deleted.')
        expect(response.body.message).toBe('Your comment has been successfully deleted.')
    
      })


})


afterAll(async () => {
    await User.sequelize.truncate({ cascade: true, restartIdentity: true })
})



