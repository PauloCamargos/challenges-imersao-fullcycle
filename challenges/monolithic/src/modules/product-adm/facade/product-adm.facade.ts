import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import ProductAdmFacadeInterface, { AddProductFacadeInputDTO, CheckStockFacadeInputDTO, CheckStockFacadeOutputDTO } from "./product-adm.facade.interface";

export interface UseCaseProps {
  addUseCase: UseCaseInterface;
  checkStockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addUseCase: UseCaseInterface;
  private _checkStockUseCase: UseCaseInterface;

  constructor(props: UseCaseProps) {
    this._addUseCase = props.addUseCase;
    this._checkStockUseCase = props.checkStockUseCase;
  }
  async addProduct(input: AddProductFacadeInputDTO): Promise<void> {
    this._addUseCase.execute(input);
  }
  async checkStock(input: CheckStockFacadeInputDTO): Promise<CheckStockFacadeOutputDTO> {
    return this._checkStockUseCase.execute(input);
  }

}