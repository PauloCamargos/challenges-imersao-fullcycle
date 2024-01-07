import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceItemModel from "../repository/invoice-item.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("Invoice facade unit test", () => {
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

     it("should find and invoice", async () => {
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
          await invoiceFacade.generate(input)
          const invoice = await InvoiceModel.findOne({
               where: {
                    name: input.name,
               },
               include: ["items"],
          });

          const foundInvoice = await invoiceFacade.find({id: invoice.id})
          expect(foundInvoice.id).toBe(invoice.id)
          expect(foundInvoice.name).toBe(invoice.name)
          expect(foundInvoice.address.street).toBe(input.street)
          expect(foundInvoice.address.number).toBe(input.number)
          expect(foundInvoice.address.complement).toBe(input.complement)
          expect(foundInvoice.address.city).toBe(input.city)
          expect(foundInvoice.address.state).toBe(input.state)
          expect(foundInvoice.address.zipCode).toBe(input.zipCode)
          expect(foundInvoice.total).toBe(15)
          foundInvoice.items.forEach(item => {
               expect(foundInvoice.items).toContainEqual({
                    id: item.id,
                    name: item.name,
                    price: item.price,
               })
          })

     })
});
