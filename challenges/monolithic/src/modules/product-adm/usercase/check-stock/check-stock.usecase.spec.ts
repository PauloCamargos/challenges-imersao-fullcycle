import Id from "../../../@shared/domain/enitty/value-object/id.value-object";
import Product from "../../domain/product.entity";
import CheckStockUseCase from "./check-stock.usecase";

const product = new Product({
  id: new Id(),
  name: "product 1",
  description: "product description 1",
  purchasePrice: 100,
  stock: 10,
});

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product))
  };
};

describe("Check stock use case", () => {
  it("should get the stock of a product", async () => {
    const productRepository = MockRepository();
    const checkStockUseCase = new CheckStockUseCase(productRepository);
    const input = {
      productId: product.id.id
    };
    const result = await checkStockUseCase.execute(input);

    expect(productRepository.find).toHaveBeenCalled();
    expect(result.productId).toBe(input.productId);
    expect(result.stock).toBe(product.stock);
  });
}); 