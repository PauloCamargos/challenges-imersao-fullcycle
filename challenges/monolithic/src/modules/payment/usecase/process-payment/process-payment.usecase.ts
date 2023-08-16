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
          await this.transactionRepository.save(transaction);

          return {
               transactionID: transaction.id.id,
               orderId: transaction.orderId,
               amount: transaction.amount,
               status: transaction.status,
               createdAt: transaction.createdAt,
               updatedAt: transaction.updatedAt,
          };
     }

}