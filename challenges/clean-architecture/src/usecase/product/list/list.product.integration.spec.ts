import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/sequelize/model/product.model";
import ListProductsUseCase from "./list.product.usecase";
import ProductRepository from "../../../infrastructure/product/sequelize/repository/product.repository";

describe("Unit Test list products use case", () => {
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

  it("should return all products", async () => {
    const repository = new ProductRepository();
    const product1 = ProductFactory.create(Product, "Product 1", 10.99);
    const product2 = ProductFactory.create(Product, "Product 2", 20.99);
    await repository.create(<Product>product1);
    await repository.create(<Product>product2);


    const useCase = new ListProductsUseCase(repository);

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