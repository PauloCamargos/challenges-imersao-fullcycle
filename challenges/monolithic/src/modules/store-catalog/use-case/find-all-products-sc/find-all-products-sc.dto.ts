export interface FindAllProductsSCDTO {
  products: {
    id: string;
    name: string;
    description: string;
    salePrice: number;
  }[];
}