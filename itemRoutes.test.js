process.env.NODE_ENV = "test";
const app = require("./app");
const request = require("supertest");

const ITEMS = []

let items = [{"name": "popsicle", "price": 1.45},
{"name": "cheerios", "price": 3.40}]

beforeEach(function(){
    ITEMS.push(items)
})

afterEach(() =>{
    ITEMS.length = 0
})

describe('GET /items', () =>{
    test("Get all items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ items: items })
      })

    test("Get item by name", async() => {
        const res = await request(app).get("/items/popsicle");
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ item: {"name": "popsicle", "price": 1.45} })
    })

    test("Responds with 404 for invalid name", async () => {
        const res = await request(app).get("/items/qaswfdegrhtjyukl");
        expect(res.statusCode).toBe(404)
      })
})

describe("POST /items", () => {
    test("Creating an item", async () => {
      const res = await request(app).post("/items").send({ name: "test" });
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({ item: { "name": "test", "price": 0 } });
    })
    
    test("Responds with 400 if name is missing", async () => {
        const res = await request(app).post("/items").send();
        expect(res.statusCode).toBe(400);
      })
  })


  describe("PATCH /items/:name", () => {
    test("Updating an item's name", async () => {
        const res = await request(app).patch("/items/popsicle").send({ name: "patchtest" });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ updated: { item: {name:"patchtest", price:1.45} } });
    })

    test("Updating an item's price", async () => {
        const res = await request(app).patch("/items/patchtest").send({ price: 500 });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ updated: { item: {name:"patchtest", price:500} } });
    })

    test("Updating an item's price AND name", async () => {
        const res = await request(app).patch("/items/patchtest").send({ price: 500, name: "popsicle" });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ updated: { item: {name:"popsicle", price:500} } });
    })

    test("Responds with 404 for invalid name", async () => {
      const res = await request(app).patch("/items/fsdfdsfsdf").send({ name: "test" });
      expect(res.statusCode).toBe(404);
    })
  })


  describe("DELETE /items/:name", () => {
    test("Deleting an item", async () => {
      const res = await request(app).delete("/items/popsicle");
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: 'Deleted' })
    })
    test("Responds with 404 for deleting invalid cat", async () => {
      const res = await request(app).delete("/items/asedrfhtgjykul");
      expect(res.statusCode).toBe(404);
    })
  })