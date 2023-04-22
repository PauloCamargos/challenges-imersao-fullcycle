import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "John 1",
  new Address("street 1", 1, "zip 1", "city 1")
);
const customer2 = CustomerFactory.createWithAddress(
  "John 2",
  new Address("street 2", 2, "zip 2", "city 2")
);

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue([customer1, customer2]),
  };
};

describe("Unit Test list customer use case", () => {
  it("should return all customers", async () => {
    const mockRepository = MockRepository();
    const useCase = new ListCustomerUseCase(mockRepository);
    const output = await useCase.execute({});

    expect(output.customers.length).toBe(2);
    expect(output).toEqual({
      customers: [
        {
          id: customer1.id,
          name: customer1.name,
          address: {
            street: customer1.address.street,
            number: customer1.address.number,
            zip: customer1.address.zipcode,
            city: customer1.address.city
          },
        },
        {
          id: customer2.id,
          name: customer2.name,
          address: {
            street: customer2.address.street,
            number: customer2.address.number,
            zip: customer2.address.zipcode,
            city: customer2.address.city
          },
        },
      ]
    }
    );
  });
});