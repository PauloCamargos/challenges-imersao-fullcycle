import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductsUseCase from "./list.product.usecase";

const product1 = ProductFactory.create(Product, "Product 1", 10.99);
const product2 = ProductFactory.create(Product, "Product 2", 20.99);

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue([product1, product2]),
  };
};

describe("Unit Test list products use case", () => {
  it("should return all products", async () => {
    const mockRepository = MockRepository();
    const useCase = new ListProductsUseCase(mockRepository);

    const output = await useCase.execute({});

    expect(output.products.length).toBe(2);

    const expectedOutput = {
      products: [
        {
          id: product1.id,
          name: product1.name,
          price: product1.price,
        },
        {
          id: product2.id,
          name: product2.name,
          price: product2.price,
        },
      ]
    };

    expect(output).toEqual(expectedOutput);
  });
});