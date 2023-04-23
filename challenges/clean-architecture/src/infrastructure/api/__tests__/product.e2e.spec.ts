import request from "supertest";
import {app, sequelize } from "../express";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
    .post("/product")
    .send({
      name: "Product 1",
      price: 1.99,
    })
    expect(response.status).toBe(200)
    expect(response.body.name).toBe("Product 1")
    expect(response.body.price).toBe(1.99)
  });

  it("should not create a product when empty name", async () => {
    const response = await request(app)
    .post("/product")
    .send({
      name: "",
      price: 1.0,
    })

    expect(response.status).toBe(500)
  })

  it("should list all products", async () => {
    const response1 = await request(app)
    .post("/product")
    .send({
      name: "Product 1",
      price: 1.99,
    })
    expect(response1.status).toBe(200)

    const response2 = await request(app)
    .post("/product")
    .send({
      name: "Product 2",
      price: 2.99,
    })
    expect(response2.status).toBe(200)

    const listProductsResponse = await request(app)
    .get("/product")
    .send()

    expect(listProductsResponse.status).toBe(200)
    const products = listProductsResponse.body.products
    expect(products.length).toBe(2)
    const product1 = products[0]
    expect(product1.id).toBeDefined();
    expect(product1.name).toBe("Product 1")
    expect(product1.price).toBe(1.99)
    
    const product2 = products[1]
    expect(product2.id).toBeDefined();
    expect(product2.name).toBe("Product 2")
    expect(product2.price).toBe(2.99)
    

  });
});