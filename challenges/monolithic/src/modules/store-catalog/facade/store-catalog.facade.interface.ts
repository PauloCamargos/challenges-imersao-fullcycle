export interface FindStoreCatalogFacadeInputDTO {
  id: string
}
export interface FindStoreCatalogFacadeOutputDTO {
  id: string,
  name: string,
  description: string,
  salesPrice: number
}

export interface FindAllStoreCatalogFacadeOutputDTO {
  products: FindStoreCatalogFacadeOutputDTO[]
}

export default interface StoreCatalogFacadeInterface {
  find(id: FindStoreCatalogFacadeInputDTO): Promise<FindStoreCatalogFacadeOutputDTO>;
  findlAll(): Promise<FindAllStoreCatalogFacadeOutputDTO>;
}
