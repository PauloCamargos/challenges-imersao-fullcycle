import { Sequelize } from "sequelize-typescript";
import ProductSCModel from "../repository/product-sc.model";
import Product from "../../product-adm/domain/product.entity";
import StoreCatalogFacadeFactory from "../factory/store-catalog.facade.factory";

describe("Store catalog facade tests", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([ProductSCModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    const product = await ProductSCModel.create({
      id: "1",
      name: "product 1",
      description: "description 1",
      salesPrice: 100,
    });

    const storeCatalogFacade = StoreCatalogFacadeFactory.create();

    const input = { id: product.id };
    const output = await storeCatalogFacade.find(input);

    expect(output.id).toBe(product.id);
    expect(output.name).toBe(product.name);
    expect(output.description).toBe(product.description);
    expect(output.salesPrice).toBe(product.salesPrice);
  });

  it("should find all products", async () => {
    const product1 = await ProductSCModel.create({
      id: "1",
      name: "product 1",
      description: "description 1",
      salesPrice: 100,
    });
    const product2 = await ProductSCModel.create({
      id: "2",
      name: "product 2",
      description: "description 2",
      salesPrice: 200,
    });

    const storeCatalogFacade = StoreCatalogFacadeFactory.create();

    const input = { id: product1.id };
    const output = await storeCatalogFacade.findlAll();

    expect(output.products.length).toBe(2);

    const outputProduct1 = output.products[0];
    expect(outputProduct1.id).toBe(product1.id);
    expect(outputProduct1.name).toBe(product1.name);
    expect(outputProduct1.description).toBe(product1.description);
    expect(outputProduct1.salesPrice).toBe(product1.salesPrice);

    const outputProduct2 = output.products[1];
    expect(outputProduct2.id).toBe(product2.id);
    expect(outputProduct2.name).toBe(product2.name);
    expect(outputProduct2.description).toBe(product2.description);
    expect(outputProduct2.salesPrice).toBe(product2.salesPrice);

  });
});
