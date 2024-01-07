import Address from "../../../@shared/domain/enitty/value-object/address.value-object";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import InvoiceItem from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.usecase.dto";

export default class FindInvoiceUseCase implements UseCaseInterface {
     constructor(
          private repository: InvoiceGateway,
     ) { }

     async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
          const persistedInvoice = await this.repository.find(input.id);

          const address = new Address({
               street: persistedInvoice.address.street,
               number: persistedInvoice.address.number,
               complement: persistedInvoice.address.complement,
               city: persistedInvoice.address.city,
               state: persistedInvoice.address.state,
               zipCode: persistedInvoice.address.zipCode,
          });

          const items = persistedInvoice.items.map(item =>
               new InvoiceItem({
                    id: item.id,
                    name: item.name,
                    price: item.price,
               })
          );

          const invoice = new Invoice({
               id: persistedInvoice.id,
               name: persistedInvoice.name,
               document: persistedInvoice.document,
               address: address,
               items: items,
               createdAt: persistedInvoice.createdAt,
               updatedAt: persistedInvoice.updatedAt
          });

          return {
               id: invoice.id.id,
               name: invoice.name,
               document: invoice.document,
               address: {
                    street: invoice.address.street,
                    number: invoice.address.number,
                    state: invoice.address.state,
                    complement: invoice.address.complement,
                    city: invoice.address.city,
                    zipCode: invoice.address.zipCode,
               },
               items: items.map(item => ({
                    id: item.id.id,
                    name: item.name,
                    price: item.price,
               })),
               total: invoice.total(),
               createdAt: invoice.createdAt,
          };
     }
}
