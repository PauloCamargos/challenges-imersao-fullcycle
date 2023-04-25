import { app, sequelize } from '../express';
import request from 'supertest';

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          street: "Street",
          number: 123,
          zip: "12345",
          city: "City"
        }
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John");
    expect(response.body.address.street).toBe("Street");
    expect(response.body.address.number).toBe(123);
    expect(response.body.address.zip).toBe("12345");
    expect(response.body.address.city).toBe("City");

  });

  it("should not create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({ name: "John" });

    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
    const response1 = await request(app)
      .post("/customer")
      .send({
        name: "John",
        address: {
          street: "Street",
          number: 123,
          zip: "12345",
          city: "City"
        }
      });
    expect(response1.status).toBe(200);

    const response2 = await request(app)
      .post("/customer")
      .send({
        name: "Sarah",
        address: {
          street: "Street 2",
          number: 321,
          zip: "54321",
          city: "City 2"
        }
      });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/customer").send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);

    const customer1 = listResponse.body.customers[0];
    expect(customer1.name).toBe("John");
    expect(customer1.address.street).toBe("Street");
    expect(customer1.address.number).toBe(123);
    expect(customer1.address.zip).toBe("12345");
    expect(customer1.address.city).toBe("City");

    const customer2 = listResponse.body.customers[1];
    expect(customer2.name).toBe("Sarah");
    expect(customer2.address.street).toBe("Street 2");
    expect(customer2.address.number).toBe(321);
    expect(customer2.address.zip).toBe("54321");
    expect(customer2.address.city).toBe("City 2");

    const listResponseXML = await request(app)
      .get("/customer")
      .set("Accept", "application/xml")
      .send();
    expect(listResponse.status).toBe(200);
    // expect(listResponse.headers).te
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseXML.text).toContain(`<customers>`);
    expect(listResponseXML.text).toContain(`<customer>`);
    expect(listResponseXML.text).toContain(`<name>John</name>`);
    expect(listResponseXML.text).toContain(`<address>`);
    expect(listResponseXML.text).toContain(`<street>Street</street>`);
    expect(listResponseXML.text).toContain(`<number>123</number>`);
    expect(listResponseXML.text).toContain(`<zip>12345</zip>`);
    expect(listResponseXML.text).toContain(`<city>City</city>`);
    expect(listResponseXML.text).toContain(`</address>`);
    expect(listResponseXML.text).toContain(`<name>Sarah</name>`);
    expect(listResponseXML.text).toContain(`<address>`);
    expect(listResponseXML.text).toContain(`<street>Street 2</street>`);
    expect(listResponseXML.text).toContain(`<number>321</number>`);
    expect(listResponseXML.text).toContain(`<zip>54321</zip>`);
    expect(listResponseXML.text).toContain(`<city>City 2</city>`);
    expect(listResponseXML.text).toContain(`</address>`);
    expect(listResponseXML.text).toContain(`</customer>`);
    expect(listResponseXML.text).toContain(`</customers>`);



  });

});