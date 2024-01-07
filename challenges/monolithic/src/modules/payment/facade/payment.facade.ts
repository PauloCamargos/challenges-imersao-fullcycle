import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import PaymentFacadeInterface, { PaymentInputDTO, PaymentOutputDTO } from "./payment.facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
     constructor(private processPaymentUseCase: UseCaseInterface) {
          this.processPaymentUseCase = processPaymentUseCase;
     }

     async process(input: PaymentInputDTO): Promise<PaymentOutputDTO> {
          const transaction = await this.processPaymentUseCase.execute(input);
          return {
               transactionID: transaction.transactionId,
               amount: transaction.amount,
               status: transaction.status,
               orderId: transaction.orderId,
               createdAt: transaction.createdAt,
               updatedAt: transaction.updatedAt,
          };
     }
}