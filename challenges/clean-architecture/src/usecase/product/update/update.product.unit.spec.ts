import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create(Product, "Product 1", 10.99)

const input = {
  id: product.id,
  name: "Product Updated",
  price: 0.01
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit Test product update use case", () => {
  it("should update a product", async () => {
    const repository = MockRepository();
    const useCase = new UpdateProductUseCase(repository)

    const output = await useCase.execute(input);

    expect(output).toEqual(input);
  });
})