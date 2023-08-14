import ProductRepository from "../../product-adm/repository/product.repository";
import StoreCatalogFacade from "../facade/store-catalog.facade";
import ProductSCRepository from "../repository/product-sc.repository";
import FindAllProductsSCUseCase from "../usecase/find-all-products-sc/find-all-products-sc.usecase";
import FindProductSCUseCase from "../usecase/find-product-sc/find-product-sc.usecase";

export default class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacade {
    const productSCRepository = new ProductSCRepository();

    const findProductSCUseCase = new FindProductSCUseCase(productSCRepository);
    const findAllProductSCUseCase = new FindAllProductsSCUseCase(productSCRepository);

    return new StoreCatalogFacade({
      findUseCase: findProductSCUseCase,
      findAllUseCase: findAllProductSCUseCase
    });
  }
}