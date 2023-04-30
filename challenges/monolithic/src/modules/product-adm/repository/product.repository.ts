import Id from "../../@shared/domain/enitty/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import { ProductModel } from "./product.model";

export default class ProductRepository implements ProductGateway {
  async add(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  async find(id: string): Promise<Product> {
    const productDb = await ProductModel.findOne({
      where: { id: id }
    });

    if (productDb === null) {
      throw `Product with id ${id} not found`;
    }

    return new Product({
      id: new Id(productDb.id),
      name: productDb.name,
      description: productDb.description,
      purchasePrice: productDb.purchasePrice,
      stock: productDb.stock,
      createdAt: productDb.createdAt,
      updatedAt: productDb.updatedAt,
    });
  }

}