import Id from "../../../@shared/domain/enitty/value-object/id.value-object";
import ProductSC from "../../domain/product-sc.entity";
import FindAllProductsSCUseCase from "../find-all-products-sc/find-all-products-sc.usecase";
import FindProductSCUseCase from "./find-product-sc.usecase";

const product = new ProductSC({
  id: new Id("1"),
  name: "product 1",
  description: "product 1 description",
  salePrice: 10,
});

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(product),
    findAll: jest.fn(),
  };
};

describe("Find product sc use case test", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const findProductUseCase = new FindProductSCUseCase(productRepository);

    const input = {
      id: product.id.id
    };

    const output = await findProductUseCase.execute(input);

    expect(productRepository.find).toHaveBeenCalled();
    expect(output.id).toBe(product.id.id);
    expect(output.name).toBe(product.name);
    expect(output.description).toBe(product.description);
    expect(output.salePrice).toBe(product.salePrice);

  });
});