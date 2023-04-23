import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/sequelize/model/product.model";
import ProductRepository from "../../../infrastructure/product/sequelize/repository/product.repository";


describe("Unit Test find a product use case", () => {
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

  it("should find a product", async () => {
    const repository = new ProductRepository();
    const useCase = new FindProductUseCase(repository);

    const product = ProductFactory.create(Product, "Product 1", 10.99);
    await repository.create(<Product>product);

    const input = {
      id: product.id,
    };

    const expectedOutput = {
      id: product.id,
      name: product.name,
      price: product.price,
    };

    const output = await useCase.execute(input);

    expect(output).toEqual(expectedOutput);
  });

  it("should should not find a customer", async () => {
    const productRepository = new ProductRepository();
    const useCase = new FindProductUseCase(productRepository);

    const product = ProductFactory.create(Product, "Product 1", 10.99);
    await productRepository.create(<Product>product);

    const input = {
      id: "foo",
    };

    expect(async () => await useCase.execute(input)).rejects.toThrow(Error);

  });
});