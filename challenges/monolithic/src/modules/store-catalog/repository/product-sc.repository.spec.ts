import { Sequelize } from "sequelize-typescript";
import ProductSCModel from "./product-sc.model";
import ProductSCRepository from "./product-sc.repository";

describe("Produc SC repository tests", () => {
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

  it("should find all product", async () => {
    const product1 = await ProductSCModel.create({
      id: "1",
      name: "product 1",
      description: "product description 1",
      salePrice: 10,
    })
    const product2 = await ProductSCModel.create({
      id: "2",
      name: "product 2",
      description: "product description 2",
      salePrice: 20,
    })
  
    const productRepository = new ProductSCRepository();
    const outputProducts = await productRepository.findAll()

    expect(outputProducts.length).toBe(2)
    expect(outputProducts[0].id.id).toBe(product1.id)
    expect(outputProducts[0].name).toBe(product1.name)
    expect(outputProducts[0].description).toBe(product1.description)
    expect(outputProducts[0].salePrice).toBe(product1.salePrice)

    expect(outputProducts[1].id.id).toBe(product2.id)
    expect(outputProducts[1].name).toBe(product2.name)
    expect(outputProducts[1].description).toBe(product2.description)
    expect(outputProducts[1].salePrice).toBe(product2.salePrice)
  });


  it("should find a product", async () => {

    const product1 = await ProductSCModel.create({
      id: "1",
      name: "product 1",
      description: "product description 1",
      salePrice: 10,
    })
    const product2 = await ProductSCModel.create({
      id: "2",
      name: "product 2",
      description: "product description 2",
      salePrice: 20,
    })
  
    const productRepository = new ProductSCRepository();
    const outputProduct = await productRepository.find(product2.id);


    expect(outputProduct.id.id).toBe(product2.id)
    expect(outputProduct.name).toBe(product2.name)
    expect(outputProduct.description).toBe(product2.description)
    expect(outputProduct.salePrice).toBe(product2.salePrice)
    
  });
})