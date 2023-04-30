import ProductModel from "../repository/product.model";
import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../repository/product.repository";
import ProductAdmFacade from "./productadm.facace";
import AddProductUseCase from "../usercase/add-product/add-product.usecase";


describe("Unit Test productadm facade", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    });
    sequelize.addModels([ProductModel]);
    sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(productRepository);
    const productFacade = new ProductAdmFacade({
      addUseCase: addProductUseCase,
      stockUsecase: undefined,
    });

    const input = {
      id: "1",
      name: "product 1",
      description: "product 1 description",
      purchasePrice: 100,
      stock: 10,
    };

    productFacade.addProduct(input);

    const product = await ProductModel.findOne({ where: { id: input.id } });

    expect(product).toBeDefined();
    expect(product.id).toBe(input.id);
    expect(product.name).toBe(input.name);
    expect(product.description).toBe(input.description);
    expect(product.purchasePrice).toBe(input.purchasePrice);
    expect(product.stock).toBe(input.stock);

  });
});