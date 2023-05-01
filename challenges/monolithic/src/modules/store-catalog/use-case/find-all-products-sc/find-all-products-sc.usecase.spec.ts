import Id from "../../../@shared/domain/enitty/value-object/id.value-object";
import ProductSC from "../../domain/product-sc.entity";
import FindAllProductsSCUseCase from "./find-all-products-sc.usecase";

const product1 = new ProductSC({
  id: new Id("1"),
  name: "product 1",
  description: "product description 1",
  salesPrice: 10,
});

const product2 = new ProductSC({
  id: new Id("2"),
  name: "product 2",
  description: "product description 2",
  salesPrice: 20,
});

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2,]))
  };
};

describe("Find all products stock catalog unit test", () => {
  it("should find all products from stock catalog use case", async () => {
    const productSCRepository = MockRepository();
    const findAllProdcutsSCUseCase = new FindAllProductsSCUseCase(productSCRepository);

    const output = await findAllProdcutsSCUseCase.execute({});

    expect(productSCRepository.findAll).toBeCalled();
    expect(output.products.length).toBe(2);

    const outputProduct1 = output.products[0];
    expect(outputProduct1.id).toBe(product1.id.id);
    expect(outputProduct1.name).toBe(product1.name);
    expect(outputProduct1.description).toBe(product1.description);
    expect(outputProduct1.salePrice).toBe(product1.salePrice);

    const outputProduct2 = output.products[1];
    expect(outputProduct2.id).toBe(product2.id.id);
    expect(outputProduct2.name).toBe(product2.name);
    expect(outputProduct2.description).toBe(product2.description);
    expect(outputProduct2.salePrice).toBe(product2.salePrice);




  });
}); 