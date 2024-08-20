require('../models')

const request = require("supertest")
const app = require("../app");

let directorId

const director = {
    firstName: "Ari",
    lastName: "alanya",
    nationality: "peru",
    image: "image.jpg",
    birthday: "2024-10-24"
}

const BASE_URL = '/api/v1/directors'

test("Post '/directors should return status code 201 and res.body.name = director.name", async () => {
    
    const res = await request(app)
        .post(BASE_URL)
        .send(director)

    directorId = res.body.id
    
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})

test("Get '/directors' should return a statusCode 200", async () => {

    const res = await request(app)
      .get(BASE_URL)
  
    console.log(res.body);
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

  })

  test("PUT => BASE_URL/directorId/, should return statusCode 200, and res.body.firstName === directorUpdate.firstName", async()=> {
    const directorUpdate = {
        firstName: 'anto',
    }

    const res = await request(app)
    .put(`${BASE_URL}/${directorId}`)
    .send(directorUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(directorUpdate.firstName)
});

test("DELETE = BASE_URL/directorId/, should return statusCode 204", async()=> {
    const res = await request(app)
    .delete(`${BASE_URL}/${directorId}`)
    expect(res.statusCode).toBe(204)
});

