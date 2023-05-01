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
  find(id: FindStoreCatalogFacadeInputDTO): Promise<FindStoreCatalogFacadeOutputDTO> {
    return this._findUseCase.execute(id)
  }
  findlAll(): Promise<FindAllStoreCatalogFacadeOutputDTO> {
    return this._findAllUseCase.execute({})
  }

}