import CreateProductUseCase from "./create.product.usecase";

const input = {
  name: "Product 1",
  price: 10.90,
};

const MockRepository = () => {
  return {
    create: jest.fn(),  // create returns void, nothing to return
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Unit Test create product use case", () => {
  it("should should create a product", async () => {
    const mockRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(mockRepository);

    const output = await productCreateUseCase.execute(input);

    const expectedOutput = {
      id: expect.any(String),
      name: "Product 1",
      price: 10.90
    };

    expect(output).toEqual(expectedOutput);
  });

  it("should throw error when name is empty", async () => {
    const mockRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(mockRepository);

    const input = {
      name: "",
      price: 10.90,
    };

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Name is required."
    );
  });

  it("should throw error when price is negative", async () => {
    const mockRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(mockRepository);

    const input = {
      name: "Product 1",
      price: -10.90,
    };

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Price must be greated than 0."
    );
  });
});