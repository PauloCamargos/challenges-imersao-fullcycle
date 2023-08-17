import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import PaymentFacadeInterface, { PaymentInputDTO, PaymentOutputDTO } from "./payment.facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
     constructor(private processPaymentUseCase: UseCaseInterface) {
          this.processPaymentUseCase = processPaymentUseCase;
     }

     process(input: PaymentInputDTO): Promise<PaymentOutputDTO> {
          return this.processPaymentUseCase.execute(input);
     }
}