export interface InputListProductsDTO {}

type ProductListItemDTO = {
  id: string,
  name: string,
  price: number,
}

export interface OutputListProductsDTO {
  products: ProductListItemDTO[]
}