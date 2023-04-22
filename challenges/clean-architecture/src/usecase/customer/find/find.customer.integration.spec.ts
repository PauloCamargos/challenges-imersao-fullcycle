import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/sequelize/model/customer.model";
import CustomerRepository from "../../../infrastructure/customer/sequelize/repository/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usercase";

describe("Test find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const useCase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer("123", "John");
    const address = new Address("street", 123, "zip", "city");
    customer.changeAddress(address);
    customer.activate()

    await customerRepository.create(customer);

    const input = {
      id: "123"
    };

    const output = {
      id: "123",
      name: "John",
      address: {
        street: "street",
        city: "city",
        number: 123,
        zip: "zip"
      }
    };
    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });
});