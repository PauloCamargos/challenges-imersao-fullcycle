import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("Product adm facade unit test", () => {
     let sequelize: Sequelize;

     beforeEach(async () => {
          sequelize = new Sequelize({
               dialect: "sqlite",
               storage: ":memory:",
               logging: false,
               sync: { force: true },
          });
          sequelize.addModels([
               InvoiceModel,
               InvoiceItemModel,
          ]);
          await sequelize.sync();
     });

     afterEach(async () => {
          await sequelize.close();
     });

     it("should generate an invoice", async () => {
          const invoiceFacade = InvoiceFacadeFactory.create();

          const input = {
               name: "foo",
               document: "bar",
               street: "baz",
               number: "123",
               complement: "",
               city: "neverland",
               state: "ZZ",
               zipCode: "12345",
               items: [
                    {
                         id: "item1",
                         name: "item 1",
                         price: 10,
                    },
                    {
                         id: "item2",
                         name: "item 2",
                         price: 5,
                    }
               ],
          };

          await invoiceFacade.generate(input);

          const foundInvoice = await InvoiceModel.findOne({
               where: {
                    name: input.name,
               },
               include: ["items"],
          });

          expect(foundInvoice.id).toBeDefined();
          expect(foundInvoice.name).toBe(input.name);
          expect(foundInvoice.document).toBe(input.document);
          expect(foundInvoice.addressStreet).toBe(input.street);
          expect(foundInvoice.addressNumber).toBe(input.number);
          expect(foundInvoice.addressComplement).toBe(input.complement);
          expect(foundInvoice.addressCity).toBe(input.city);
          expect(foundInvoice.addressState).toBe(input.state);
          expect(foundInvoice.addressZipCode).toBe(input.zipCode);

     });
});
