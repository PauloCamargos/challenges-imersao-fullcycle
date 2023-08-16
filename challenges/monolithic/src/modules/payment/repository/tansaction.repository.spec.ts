import { Sequelize } from "sequelize-typescript";
import TransactionModel from "./transaction.model";
import Transaction from "../domain/transaction";
import Id from "../../@shared/domain/enitty/value-object/id.value-object";
import TransactionRepository from "./transaction.repository";

describe("TransactionRepository test", () => {
     let sequelize: Sequelize;

     beforeEach(async () => {
          sequelize = new Sequelize({
               dialect: "sqlite",
               storage: ":memory:",
               logging: false,
               sync: { force: true },
          });
          await sequelize.addModels([TransactionModel]);
          await sequelize.sync();
     });

     afterEach(async () => {
          await sequelize.close();
     });

     it("should create a transaction", async () => {
          const input = {
               id: new Id("1"),
               amount: 101,
               orderId: "2",
               createdAt: new Date(),
               updatedAt: new Date(),
          };
          const transaction = new Transaction(input);
          transaction.approve();

          const repository = new TransactionRepository();
          const result = await repository.save(transaction);
          const transactionDb = await TransactionModel.findOne({
               where: {
                    id: input.id.id,
               }
          });

          expect(transactionDb.id).toBe(input.id.id);
          expect(transactionDb.status).toBe("approved");
          expect(transactionDb.amount).toBe(input.amount);
          expect(transactionDb.orderId).toBe(input.orderId);
     });
});