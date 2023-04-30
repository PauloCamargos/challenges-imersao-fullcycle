import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import ProdcutAdmFacadeInterface, { AddProductFacadeInputDTO, CheckStockFacadeInputDTO, CheckStockFacadeOutputDTO } from "./productadm.facade.interface";

export interface UseCaseProps {
  addUseCase: UseCaseInterface;
  stockUsecase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProdcutAdmFacadeInterface {
  private _addUsecase: UseCaseInterface;
  private _checkStockUsecase: UseCaseInterface;

  constructor(useCasesProps: UseCaseProps) {
    this._addUsecase = useCasesProps.addUseCase;
    this._checkStockUsecase = useCasesProps.stockUsecase;
  }

  addProduct(input: AddProductFacadeInputDTO): Promise<void> {
    // if usecase and facade dtos were different, we'd to convert one to
    // the other
    throw this._addUsecase.execute(input);
  }
  checkStok(input: CheckStockFacadeInputDTO): Promise<CheckStockFacadeOutputDTO> {
    // if usecase and facade dtos were different, we'd to convert one to
    // the other
     return this._checkStockUsecase.execute(input)
  }

}