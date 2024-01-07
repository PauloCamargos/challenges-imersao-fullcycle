import Address from "../../../@shared/domain/enitty/value-object/address.value-object";
import Id from "../../../@shared/domain/enitty/value-object/id.value-object";
import InvoiceItem from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

const invoice = new Invoice({
     id: new Id("1"),
     name: "invoice 1",
     document: "foo",
     address: new Address({
          id: new Id("123"),
          street: "foo",
          number: "bar",
          complement: "",
          city: "neverland",
          state: "ZZ",
          zipCode: "12345",
     }),
     items: [
          new InvoiceItem({
               id: new Id("987"),
               name: "foo item",
               price: 10,
          }),
          new InvoiceItem({
               id: new Id("987"),
               name: "foo item",
               price: 5,
          })
     ]
})

const MockRepository = () => {
     return {
          generate: jest.fn(),
          find: jest.fn((_id) => Promise.resolve(invoice))
     };
};

describe("Find invoice", () => {
     it("should find and invoice",  async () => {
          const repository = MockRepository();
          const findInvoiceUseCase = new FindInvoiceUseCase(repository);
          const input = {
               id: invoice.id.id,
          }

          const result = await findInvoiceUseCase.execute(input)
          expect(repository.find).toHaveBeenCalled()
          expect(result.id).toBe(invoice.id.id)
          expect(result.name).toBe(invoice.name)
          expect(result.address.street).toBe(invoice.address.street)
          expect(result.address.number).toBe(invoice.address.number)
          expect(result.address.complement).toBe(invoice.address.complement)
          expect(result.address.city).toBe(invoice.address.city)
          expect(result.address.state).toBe(invoice.address.state)
          expect(result.address.zipCode).toBe(invoice.address.zipCode)
          result.items.forEach(item => {
               expect(result.items).toContainEqual({
                    id: item.id,
                    name: item.name,
                    price: item.price,
               })
          })

     })
})
