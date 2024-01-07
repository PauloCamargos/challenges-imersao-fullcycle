import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateway/payment.gateway";
import { ProcessPyamentOutputDTO, ProcessPyamenInputtDTO } from "./process-payment.dto";

export default class ProcessPaymentUseCase implements UseCaseInterface {
     constructor(
          private transactionRepository: PaymentGateway,
     ) { }

     async execute(input: ProcessPyamenInputtDTO): Promise<ProcessPyamentOutputDTO> {
          const transcationProps = {
               orderId: input.orderId,
               amount: input.amount,
          };

          const transaction = new Transaction(
               transcationProps
          );
          transaction.process();
          const persistedTransaction = await this.transactionRepository.save(transaction);

          return {
               transactionId: persistedTransaction.id.id,
               orderId: persistedTransaction.orderId,
               amount: persistedTransaction.amount,
               status: persistedTransaction.status,
               createdAt: persistedTransaction.createdAt,
               updatedAt: persistedTransaction.updatedAt,
          };
     }

}
