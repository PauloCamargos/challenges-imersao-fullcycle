import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/enitty/value-object/id.value-object";
import ProductRepository from "./product.repository";

describe("ProductRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productProps = {
      id: new Id("1"),
      name: "product 1",
      description: "product description 1",
      purchasePrice: 100,
      stock: 10,
    };
    const product = new Product(productProps);
    const productRepository = new ProductRepository();
    await productRepository.add(product);

    const productDb = await ProductModel.findOne({
      where: {
        id: productProps.id.id,
      }
    });
    expect(productDb.id).toBe(productProps.id.id);
    expect(productDb.name).toBe(productProps.name);
    expect(productDb.description).toBe(productProps.description);
    expect(productDb.purchasePrice).toBe(productProps.purchasePrice);
    expect(productDb.stock).toBe(productProps.stock);
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const expectedProduct = await ProductModel.create({
      id: "1",
      name: "product 1",
      description: "product description 1",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });


    const foundProduct = await productRepository.find(expectedProduct.id);
    expect(foundProduct).toBeDefined();
    expect(foundProduct.name).toBe(expectedProduct.name);
    expect(foundProduct.description).toBe(expectedProduct.description);
    expect(foundProduct.purchasePrice).toBe(expectedProduct.purchasePrice);
    expect(foundProduct.stock).toBe(expectedProduct.stock);
  });

});