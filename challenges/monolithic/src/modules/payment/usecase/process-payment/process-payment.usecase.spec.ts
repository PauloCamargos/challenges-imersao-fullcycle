import ProcessPaymentUseCase from "./process-payment.usecase";

const MockRepository = () => {
     return {
          save: jest.fn((_transaction) => _transaction)
     };
};

describe("Process transaction", () => {
     it("should process and approve a transaction", async () => {
          const transactionRepository = MockRepository();
          const processPaymentUseCase = new ProcessPaymentUseCase(transactionRepository);

          const input = {
               orderId: "1",
               amount: 101,
          };
          const result = await processPaymentUseCase.execute(input);

          expect(transactionRepository.save).toHaveBeenCalled();
          expect(result.transactionId).toBeDefined();
          expect(result.status).toBe("approved");
          expect(result.amount).toBe(input.amount);
          expect(result.orderId).toBe(input.orderId);
     });
     it("should process decline a transaction", async () => {
          const transactionRepository = MockRepository();
          const processPaymentUseCase = new ProcessPaymentUseCase(transactionRepository);

          const input = {
               orderId: "1",
               amount: 99,
          };
          const result = await processPaymentUseCase.execute(input);

          expect(transactionRepository.save).toHaveBeenCalled();
          expect(result.transactionId).toBeDefined();
          expect(result.status).toBe("declined");
          expect(result.amount).toBe(input.amount);
          expect(result.orderId).toBe(input.orderId);
     });
});
