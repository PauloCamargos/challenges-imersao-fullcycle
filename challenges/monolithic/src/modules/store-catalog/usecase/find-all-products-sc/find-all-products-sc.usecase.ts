import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ProductSCGateway from "../../gateway/product-sc.gateway";
import { FindAllProductsSCDTO } from "./find-all-products-sc.dto";

export default class FindAllProductsSCUseCase implements UseCaseInterface {
  private _productRepository: ProductSCGateway;

  constructor(productRepository: ProductSCGateway) {
    this._productRepository = productRepository;
  }
  async execute(input: any): Promise<FindAllProductsSCDTO> {
    const products = await this._productRepository.findAll();

    return {
      products: products.map(
        product => (
          {
            id: product.id.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
          }
        )
      )
    };
  }

}
