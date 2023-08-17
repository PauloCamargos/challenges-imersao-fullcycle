import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../repository/transaction.model";
import PaymentFacadeFactory from "../factory/payment.facade.factory";

describe("Payment facade unit test", () => {
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

  it("should process a trasaction", async () => {
    const paymentFacade = PaymentFacadeFactory.create();

    const input = {
      orderId: "1",
      amount: 101
    };

    const output = await paymentFacade.process(input);

    const foundProduct = await TransactionModel.findOne({
      where: {
        id: output.transactionID,
      }
    });

    
    expect(output.orderId).toBe(input.orderId);
    expect(output.status).toBe("approved");
    expect(output.amount).toBe(input.amount);
  });

});