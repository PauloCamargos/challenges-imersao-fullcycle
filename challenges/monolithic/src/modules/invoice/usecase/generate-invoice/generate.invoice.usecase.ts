import Address from "../../../@shared/domain/enitty/value-object/address.value-object";
import Id from "../../../@shared/domain/enitty/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import InvoiceItem from "../../domain/invoice-item.entity";
import Invoice from "../../domain/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {
     constructor(
          private repository: InvoiceGateway,
     ) { }

     async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
          const address = new Address({
               street: input.street,
               number: input.number,
               complement: input.complement,
               city: input.city,
               state: input.state,
               zipCode: input.zipCode,
          });

          const items = input.items.map(item =>
               new InvoiceItem({
                    id: new Id(item.id),
                    name: item.name,
                    price: item.price,
               })
          );

          const invoice = new Invoice({
               name: input.name,
               document: input.document,
               address: address,
               items: items,
          });

          await this.repository.generate(invoice);

          return {
               id: invoice.id.id,
               name: invoice.name,
               document: invoice.document,
               street: invoice.address.street,
               number: invoice.address.number,
               state: invoice.address.state,
               complement: invoice.address.complement,
               city: invoice.address.city,
               zipCode: invoice.address.zipCode,
               items: items.map(item => ({
                    id: item.id.id,
                    name: item.name,
                    price: item.price,
               })),
               total: invoice.total(),
          }
     }
}
