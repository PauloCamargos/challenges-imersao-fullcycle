import Id from "../../../@shared/domain/enitty/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transaction = new Transaction({
     id: new Id("1"),
     amount: 101,
     orderId: "2",
});

const MockRepository = () => {
     return {
          save: jest.fn().mockReturnValue(Promise.resolve(transaction))
     }
};

describe("Process transaction", () => {
     it("should process a transaction", async ()=> {
          const transactionRepository = MockRepository()
          const processPaymentUseCase = new ProcessPaymentUseCase(transactionRepository)

          const input = {
               orderId: transaction.orderId,
               amount: transaction.amount
          }
          const result = await processPaymentUseCase.execute(input)

          expect(transactionRepository.save).toHaveBeenCalled();
          expect(result.transactionID).toBeDefined();
          expect(result.status).toBe("approved");
          expect(result.amount).toBe(input.amount);
          expect(result.orderId).toBe(input.orderId);
          expect(result.orderId).toBe(input.orderId);
     })
})