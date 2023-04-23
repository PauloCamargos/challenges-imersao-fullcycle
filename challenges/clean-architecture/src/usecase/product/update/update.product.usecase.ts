import ProductRepositoryInterfae from "../../../domain/product/respository/product_repository.interface";
import { InputUpdateProductDTO, OutputUpdateProductDTO } from "./update.product.dto";

export default class UpdateProductUseCase {
  private repository: ProductRepositoryInterfae;

  constructor(repository: ProductRepositoryInterfae) {
    this.repository = repository
  }

  async execute(input: InputUpdateProductDTO): Promise<OutputUpdateProductDTO> {
    const product = await this.repository.find(input.id)

    product.changeName(input.name)
    product.changePrice(input.price)

    await this.repository.update(product)

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    }
  }
}