import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ProductSCGateway from "../../gateway/product-sc.gateway";
import { FindProductSCInputDTO, FindProductSCOutputDTO } from "./find-product-sc.dto";

export default class FindProductSCUseCase implements UseCaseInterface {
  private _productRepository: ProductSCGateway;

  constructor(productRepository: ProductSCGateway) {
    this._productRepository = productRepository;
  }

  async execute(input: FindProductSCInputDTO): Promise<FindProductSCOutputDTO> {
    const product = await this._productRepository.find(input.id);

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      salePrice: product.salePrice
    };
  }

}