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
      salePrice: 100,
    });

    const storeCatalogFacade = StoreCatalogFacadeFactory.create();

    const input = { id: product.id };
    const output = await storeCatalogFacade.find(input);

    expect(output.id).toBe(product.id);
    expect(output.name).toBe(product.name);
    expect(output.description).toBe(product.description);
    expect(output.salePrice).toBe(product.salePrice);
  });
});