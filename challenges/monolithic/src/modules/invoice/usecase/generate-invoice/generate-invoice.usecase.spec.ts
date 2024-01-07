import InvoiceFacadeFactory from "../../factory/invoice.facade.factory";
import GenerateInvoiceUseCase from "./generate.invoice.usecase";

const MockRepository = () => {
     return {
          generate: jest.fn((_invoice) => _invoice),
          find: jest.fn()
     };
};


describe("Generate an invoice", () => {
     it("should generate an invoice", async () => {
          const repository = MockRepository()
          const generateInvoicUseCase = new GenerateInvoiceUseCase(repository)

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

          const result = await generateInvoicUseCase.execute(input)

          expect(repository.generate).toHaveBeenCalled();
          expect(result.id).toBeDefined()
          expect(result.name).toBe(input.name)
          expect(result.document).toBe(input.document)
          expect(result.street).toBe(input.street)
          expect(result.number).toBe(input.number)
          expect(result.complement).toBe(input.complement)
          expect(result.city).toBe(input.city)
          expect(result.state).toBe(input.state)
          expect(result.zipCode).toBe(input.zipCode)

          expect(result.items).toStrictEqual(input.items)
     });
});
