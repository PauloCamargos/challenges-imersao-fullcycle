import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/respository/product_repository.interface";
import { InputListProductsDTO, OutputListProductsDTO } from "./list.product.dto";


export default class ListProductsUseCase {
  private repository: ProductRepositoryInterface;

  constructor(repository: ProductRepositoryInterface) {
    this.repository = repository;
  }

  async execute(input: InputListProductsDTO): Promise<OutputListProductsDTO> {
    const products = await this.repository.findAll();

    return OutputProductsMapper.toOutput(products)
  }
}

class OutputProductsMapper {
  static toOutput(products: ProductInterface[]): OutputListProductsDTO {
    return {
      products: products.map(
        product => (
          {
            id: product.id,
            name: product.name,
            price: product.price,
          }
        )
      )
    };
  }
}