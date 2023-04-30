import ProductAdmFacade from "../facade/product-adm.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usercase/add-product/add-product.usecase";

export default class ProductAdmFacadeFactory {
  static create(): ProductAdmFacade {
    const productRepostitory = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(productRepostitory);
    const productFacade = new ProductAdmFacade({
      addUseCase: addProductUseCase,
      checkStockUseCase: undefined,
    });
    return productFacade;
  }
}