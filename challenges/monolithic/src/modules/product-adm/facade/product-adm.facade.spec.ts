import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import ProductAdmFacadeFactory from "../factory/product-adm.facade.factory";

describe("Product adm facade unit test", () => {
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

  it("should add a product", async () => {
    const productFacade = ProductAdmFacadeFactory.create();

    const productInput = {
      id: "1",
      name: "product 1",
      description: "product description 1",
      purchasePrice: 100,
      stock: 10,
    };
    await productFacade.addProduct(productInput);
    const foundProduct = await ProductModel.findOne({
      where: {
        id: productInput.id,
      }
    });

    expect(foundProduct).toBeDefined();
    expect(foundProduct.id).toBe(productInput.id);
    expect(foundProduct.name).toBe(productInput.name);
    expect(foundProduct.description).toBe(productInput.description);
    expect(foundProduct.purchasePrice).toBe(productInput.purchasePrice);
    expect(foundProduct.stock).toBe(productInput.stock);

  });

  it("should check the stock of a product", async () => {
    const productFacade = ProductAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "product 1",
      description: "product description 1",
      purchasePrice: 100,
      stock: 10,
    };
    await productFacade.addProduct(input);

    const foundStock = await productFacade.checkStock({ productId: input.id });

    expect(foundStock.productId).toBe(input.id);
    expect(foundStock.stock).toBe(input.stock);
  });
});