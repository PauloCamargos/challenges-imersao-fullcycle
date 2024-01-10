export interface FindAllProductsSCDTO {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}
