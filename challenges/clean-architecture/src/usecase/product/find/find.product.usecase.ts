import ProductRepositoryInterface from "../../../domain/product/respository/product_repository.interface";
import { InputFindProductDTO, OutputFindProductDTO } from "./find.product.dto";

export default class FindProductUseCase {
  private repository: ProductRepositoryInterface;

  constructor(repository: ProductRepositoryInterface) {
    this.repository = repository
  }

  async execute(input: InputFindProductDTO): Promise<OutputFindProductDTO> {
    const product = await this.repository.find(input.id)

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    }

  }
}