import { Sequelize } from "sequelize-typescript";
import CreateProductUseCase from "./create.product.usecase";
import ProductModel from "../../../infrastructure/product/sequelize/model/product.model";
import ProductRepository from "../../../infrastructure/product/sequelize/repository/product.repository";

describe("Unit Test create product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
  it("should should create a product", async () => {
    const mockRepository = new ProductRepository();

    const productCreateUseCase = new CreateProductUseCase(mockRepository);

    const input = {
      name: "Product 1",
      price: 10.90,
    };
    const output = await productCreateUseCase.execute(input);

    const expectedOutput = {
      id: expect.any(String),
      name: "Product 1",
      price: 10.90
    };

    expect(output).toEqual(expectedOutput);
  });

  it("should throw error when name is empty", async () => {
    const mockRepository = new ProductRepository();
    const productCreateUseCase = new CreateProductUseCase(mockRepository);

    const input = {
      name: "",
      price: 10.90,
    };

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "product: name is required"
    );
  });

  it("should throw error when price is negative", async () => {
    const mockRepository = new ProductRepository();
    const productCreateUseCase = new CreateProductUseCase(mockRepository);

    const input = {
      name: "Product 1",
      price: -10.90,
    };

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "product: price must be greater than 0"
    );
  });
});