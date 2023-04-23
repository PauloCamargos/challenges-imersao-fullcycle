import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterfae from "../../../domain/product/respository/product_repository.interface";
import { InputCreateProductDTO, OutputCreateProducDTO } from "./create.product.dto";

export default class CreateProductUseCase {
  private repository: ProductRepositoryInterfae;

  constructor(repository: ProductRepositoryInterfae) {
    this.repository = repository;
  }

  async execute(input: InputCreateProductDTO): Promise<OutputCreateProducDTO> {
    const product = ProductFactory.create(
      Product,
      input.name,
      input.price,
    );

    this.repository.create(<Product>product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    }
  }
}