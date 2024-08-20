require('../models')

const request = require("supertest")
const app = require("../app");

let genreId

const genre = {
    name: "masculino"
}

const BASE_URL = '/api/v1/genres'

test("Post '/genres should return status code 201 and res.body.name = genre.name", async () => {
    
    const res = await request(app)
        .post(BASE_URL)
        .send(genre)

    genreId = res.body.id
    
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})

test("Get '/genres' should return a statusCode 200", async () => {

    const res = await request(app)
      .get(BASE_URL)
  
    console.log(res.body);
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

  })

  test("PUT => BASE_URL/genreId/, should return statusCode 200, and res.body.firstName === genreUpdate.firstName", async()=> {
    const genreUpdate = {
        name: 'anto',
    }

    const res = await request(app)
    .put(`${BASE_URL}/${genreId}`)
    .send(genreUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genreUpdate.name)
});

test("DELETE = BASE_URL/genreId/, should return statusCode 204", async()=> {
    const res = await request(app)
    .delete(`${BASE_URL}/${genreId}`)
    expect(res.statusCode).toBe(204)
});

