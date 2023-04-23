import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.create(Product, "Product 1", 10.99)

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
  }
}

describe("Unit Test find a product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository()
    const useCase = new FindProductUseCase(productRepository)

    const input = {
      id: product.id,
    }

    const expectedOutput = {
      id: product.id,
      name: product.name,
      price: product.price,
    }

    const output = await useCase.execute(input)

    expect(output).toEqual(expectedOutput)
  });

  it("should should not find a product", async () => {
    const productRepository = MockRepository()
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found.")
    })
    const useCase = new FindProductUseCase(productRepository)

    const input = {
      id: product.id,
    }

    expect(async () => await useCase.execute(input)).rejects.toThrow("Product not found.")
  });
});