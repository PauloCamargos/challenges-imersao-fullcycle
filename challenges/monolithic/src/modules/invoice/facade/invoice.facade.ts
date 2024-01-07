import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import InvoiceFacadeInterface, { FindInvoiceInputDTO, FindInvoiceOutputDTO, GenerateInvoiceInputDto, GenerateInvoiceOutputDto } from "./invoice.facade.interface";


export default class InvoiceFacade implements InvoiceFacadeInterface {
     private _generateInvoiceUseCase: UseCaseInterface;
     private _findInvoiceUseCase: UseCaseInterface;

     constructor(
          generateInvoiceUseCase: UseCaseInterface,
          findInvoiceUseCase: UseCaseInterface,
     ) {
          this._generateInvoiceUseCase = generateInvoiceUseCase;
          this._findInvoiceUseCase = findInvoiceUseCase;
     }

     async generate(input: GenerateInvoiceInputDto): Promise<GenerateInvoiceOutputDto> {
          return await this._generateInvoiceUseCase.execute(input);
     }

     async find(input: FindInvoiceInputDTO): Promise<FindInvoiceOutputDTO> {
          return await this._findInvoiceUseCase.execute(input);
     }

}
