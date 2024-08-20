require('../models')

const request = require("supertest")
const app = require("../app");

let actorId

const actor = {
    firstName: "jhon",
    lastName: "alanya",
    nationality: "peru",
    image: "image.jpg",
    birthday: "2024-10-24"
}

const BASE_URL = '/api/v1/actors'

test("Post '/actors should return status code 201 and res.body.name = actor.name", async () => {
    
    const res = await request(app)
        .post(BASE_URL)
        .send(actor)

    actorId = res.body.id
    
    expect(res.body).toBeDefined()
    expect(res.body.firsName).toBe(actor.firsName)
})

test("Get '/actors' should return a statusCode 200", async () => {

    const res = await request(app)
      .get(BASE_URL)
  
    console.log(res.body);
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

  })

  test("PUT => BASE_URL/actorId/, should return statusCode 200, and res.body.firstName === actorUpdate.firstName", async()=> {
    const actorUpdate = {
        firstName: 'anto',
    }

    const res = await request(app)
    .put(`${BASE_URL}/${actorId}`)
    .send(actorUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actorUpdate.firstName)
});

test("DELETE = BASE_URL/actorId/, should return statusCode 204", async()=> {
    const res = await request(app)
    .delete(`${BASE_URL}/${actorId}`)
    expect(res.statusCode).toBe(204)
});

