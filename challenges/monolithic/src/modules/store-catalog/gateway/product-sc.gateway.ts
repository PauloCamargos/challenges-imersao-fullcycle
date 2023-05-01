import ProductSC from "../domain/product-sc.entity";

export default interface ProductSCGateway {
  findAll(): Promise<ProductSC[]>;
  find(id: string): Promise<ProductSC>;
}