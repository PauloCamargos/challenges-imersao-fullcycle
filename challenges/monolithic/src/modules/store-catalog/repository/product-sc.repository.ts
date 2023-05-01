import Id from "../../@shared/domain/enitty/value-object/id.value-object";
import { ProductModel } from "../../product-adm/repository/product.model";
import ProductSC from "../domain/product-sc.entity";
import ProductSCGateway from "../gateway/product-sc.gateway";
import ProductSCModel from "./product-sc.model";

export default class ProductSCRepository implements ProductSCGateway {
  async findAll(): Promise<ProductSC[]> {
    const products = await ProductSCModel.findAll();

    return products.map(product => new ProductSC({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salePrice: product.salePrice,
    }));
  }
  async find(id: string): Promise<ProductSC> {
    const product = await ProductSCModel.findOne({ where: { id: id } });

    if (product === null) {
      throw `ProductSC with id ${id} not found`;
    }

    return new ProductSC({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salePrice: product.salePrice
    });
  }

}