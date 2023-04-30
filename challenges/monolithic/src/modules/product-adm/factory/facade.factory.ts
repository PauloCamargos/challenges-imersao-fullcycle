import ProductAdmFacade from "../facade/product-adm.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usercase/add-product/add-product.usecase";
import CheckStockUseCase from "../usercase/check-stock/check-stock.usecase";

export default class ProductAdmFacadeFactory {
  static create(): ProductAdmFacade {
    const productRepostitory = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(productRepostitory);
    const checkProductUseCase = new CheckStockUseCase(productRepostitory);
    const productFacade = new ProductAdmFacade({
      addUseCase: addProductUseCase,
      checkStockUseCase: checkProductUseCase,
    });
    return productFacade;
  }
}