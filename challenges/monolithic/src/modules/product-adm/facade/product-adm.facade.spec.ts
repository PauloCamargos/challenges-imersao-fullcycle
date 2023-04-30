import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usercase/add-product/add-product.usecase";
import ProductAdmFacade from "./product-adm.facade";

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
    const productRepostitory = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(productRepostitory);
    const productFacade = new ProductAdmFacade({
      addUseCase: addProductUseCase,
      checkStockUseCase: undefined,
    });

    const input = {
      id: "1",
      name: "product 1",
      description: "product description 1",
      purchasePrice: 100,
      stock: 10,
    };
    await productFacade.addProduct(input);
    const foundProduct = await ProductModel.findOne({
      where: {
        id: input.id,
      }
    });

    expect(foundProduct).toBeDefined();
    expect(foundProduct.id).toBe(input.id);
    expect(foundProduct.name).toBe(input.name);
    expect(foundProduct.description).toBe(input.description);
    expect(foundProduct.purchasePrice).toBe(input.purchasePrice);
    expect(foundProduct.stock).toBe(input.stock);

  });
});