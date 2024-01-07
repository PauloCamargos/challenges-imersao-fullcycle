import Address from "../../@shared/domain/enitty/value-object/address.value-object";
import Id from "../../@shared/domain/enitty/value-object/id.value-object";
import InvoiceItem from "../domain/invoice-item.entity";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItemModel from "./invoice-item.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
    async generate(invoice: Invoice): Promise<void> {

        await InvoiceModel.create(
            {
                id: invoice.id.id,
                name: invoice.name,
                document: invoice.document,
                items: invoice.items.map(item => ({
                    id: item.id.id,
                    name: item.name,
                    price: item.price,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                })),
                addressStreet: invoice.address.street,
                addressNumber: invoice.address.number,
                createdAt: invoice.createdAt,
                updatedAt: invoice.updatedAt,
            },
            {
                include: [{ model: InvoiceItemModel }]
            }
        );
    }
    async find(id: string): Promise<Invoice> {
        let invoice;
        try {
            invoice = await InvoiceModel.findOne({
                where: { id },
                rejectOnEmpty: true,
                include: ["items"],
            });
        } catch (error) {
            throw new Error("Invoice not found.");
        }

        return new Invoice({
            id: new Id(invoice.id),
            name: invoice.name,
            document: invoice.document,
            address: new Address(
                invoice.addressStreet,
                invoice.addressNumber,
            ),
            items: invoice.items.map(
                item => (
                    new InvoiceItem({
                        id: new Id(item.id),
                        name: item.name,
                        price: item.price,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt,
                    })
                )
            ),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        });
    }

}
