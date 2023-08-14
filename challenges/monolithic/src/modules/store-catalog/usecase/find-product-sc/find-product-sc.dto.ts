export interface FindProductSCInputDTO {
  id: string;
}

export interface FindProductSCOutputDTO {
  id: string,
  name: string,
  description: string,
  salePrice: number,
}