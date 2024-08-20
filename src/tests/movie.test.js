require('../models')

const request = require("supertest")
const app = require("../app");
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');

let movieId

const movie = {
    name: "la monja",
    image: "moja.jpg",
    synopsis: "la monja",
    releaseYear: "2024"
}

const BASE_URL = '/api/v1/movies'

test("Post '/movies should return status code 201 and res.body.name = movie.name", async () => {
    
    const res = await request(app)
        .post(BASE_URL)
        .send(movie)

    movieId = res.body.id
    
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test("Get '/movies' should return a statusCode 200", async () => {

    const res = await request(app)
      .get(BASE_URL)
  
    console.log(res.body);
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

  })

  test("PUT => BASE_URL/movieId/, should return statusCode 200, and res.body.firstName === movieUpdate.firstName", async()=> {
    const movieUpdate = {
        name: 'anto',
    }

    const res = await request(app)
    .put(`${BASE_URL}/${movieId}`)
    .send(movieUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movieUpdate.name)
});


//      /movies/:id/actors

test("POST -> /BASE_URL/:id/actors, should return code 200, and res.body.length ===1", async () => {

    const actor = {
        firstName: "ana",
        lastName: "alanya",
        nationality: "peru",
        image: "image.jpg",
        birthday: "2024-10-24"
    }

    const createActors = await Actor.create(actor)
    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/actors`)
        .send([createActors.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()  
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].id).toBe(createActors.id)
    await createActors.destroy()
})

//      /movies/:id/directors
test("POST -> /BASE_URL/:id/directors, should return code 200, and res.body.length ===1", async () => {

    const director = {
        firstName: "Diana",
        lastName: "alanya",
        nationality: "peru",
        image: "image.jpg",
        birthday: "2024-10-24"
    }

    const createDirectors = await Director.create(director)
    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/directors`)
        .send([createDirectors.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()  
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].id).toBe(createDirectors.id)
    await createDirectors.destroy()
})

//   movies/:id/genres

test("POST -> /BASE_URL/:id/genres, should return code 200, and res.body.length ===1", async () => {

    const genre = {
        name: "masculino"
    }

    const createGenres = await Genre.create(genre)
    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/genres`)
        .send([createGenres.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()  
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].id).toBe(createGenres.id)
    await createGenres.destroy()
})

test("DELETE = BASE_URL/movieId/, should return statusCode 204", async()=> {
    const res = await request(app)
    .delete(`${BASE_URL}/${movieId}`)
    expect(res.statusCode).toBe(204)
});

