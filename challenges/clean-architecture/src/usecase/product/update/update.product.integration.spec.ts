import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/sequelize/model/product.model";
import ProductRepository from "../../../infrastructure/product/sequelize/repository/product.repository";

describe("Unit Test product update use case", () => {
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
  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = ProductFactory.create(Product, "Product 1", 10.99)
    productRepository.create(<Product>product)

    const input = {
      id: product.id,
      name: "Product Updated",
      price: 0.01
    }

    const useCase = new UpdateProductUseCase(productRepository)

    const output = await useCase.execute(input);

    expect(output).toEqual(input);
  });
})