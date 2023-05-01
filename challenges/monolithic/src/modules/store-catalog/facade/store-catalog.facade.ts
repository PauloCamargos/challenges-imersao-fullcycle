import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import StoreCatalogFacadeInterface, { FindAllStoreCatalogFacadeOutputDTO, FindStoreCatalogFacadeInputDTO, FindStoreCatalogFacadeOutputDTO } from "./store-catalog.facade.interface";

type StoreCatalogProps = {
  findUseCase: UseCaseInterface,
  findAllUseCase: UseCaseInterface,
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface{
  private _findUseCase: UseCaseInterface
  private _findAllUseCase: UseCaseInterface

  constructor(props: StoreCatalogProps) {
    this._findUseCase = props.findUseCase
    this._findAllUseCase = props.findAllUseCase
  }
  async find(id: FindStoreCatalogFacadeInputDTO): Promise<FindStoreCatalogFacadeOutputDTO> {
    return await this._findUseCase.execute(id)
  }
  async findlAll(): Promise<FindAllStoreCatalogFacadeOutputDTO> {
    return await this._findAllUseCase.execute({})
  }

}