import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import InvoiceItem from "../domain/invoice-item.entity";
import Address from "../../@shared/domain/enitty/value-object/address.value-object";
import Invoice from "../domain/invoice.entity";
import InvoiceRepository from "./invoice.repository";
import Id from "../../@shared/domain/enitty/value-object/id.value-object";
import InvoiceItemModel from "./invoice-item.model";

describe("Invoice repository tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: true,
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
    
    it("should create a new invoice", async () => {
        const repository = new InvoiceRepository();

        const item1 = new InvoiceItem({
            id: new Id("item1"),
            name: "Item 1",
            price: 10.0,
        });
        const item2 = new InvoiceItem({
            id: new Id("item2"),
            name: "Item 2",
            price: 10.0,
        });
        const address = new Address("Foo st.", 1000);

        const invoice = new Invoice({
            id: new Id("invoice1"),
            name: "Foo",
            document: "documents/foo",
            address: address,
            items: [item1, item2]

        });

        await repository.generate(invoice);

        const foundInvoice = await InvoiceModel.findOne(
            {
                where: { id: invoice.id.id },
                rejectOnEmpty: true,
                include: ["items"],
            }
        );

        expect(foundInvoice!.toJSON()).toStrictEqual({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            addressStreet: invoice.address.street,
            addressNumber: invoice.address.number,
            items: invoice.items.map(
                item => ({
                    id: item.id.id,
                    name: item.name,
                    price: item.price,
                    invoice_id: invoice.id.id,
                })
            ),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        });

    });

    it("should find a client", async () => {

        const item1 = new InvoiceItem({
            name: "Item1",
            price: 10.0,
        });
        const item2 = new InvoiceItem({
            name: "Item2",
            price: 10.0,
        });
        const address = new Address("Foo st.", 1000);
        const invoiceProps = {
            id: new Id("invoice1"),
            name: "Foo",
            document: "documents/foo",
            address: address,
            items: [item1, item2],
            createdAt: new Date(),
            updatedAt: new Date(),

        };
        const invoiceId = "1";
        const createdInvoice = await InvoiceModel.create({
            id: invoiceId,
            name: invoiceProps.name,
            document: invoiceProps.document,
            invoicePropsItems: invoiceProps.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
            })),
            addressStreet: invoiceProps.address.street,
            addressNumber: invoiceProps.address.number,
            createdAt: invoiceProps.createdAt,
            updatedAt: invoiceProps.updatedAt,
        });

        const repository = new InvoiceRepository();


        const foundInvoice = await repository.find(invoiceId);

        expect(foundInvoice.id.id).toBe(invoiceProps.id.id);
        expect(foundInvoice.name).toBe(invoiceProps.name);
        expect(foundInvoice.document).toBe(invoiceProps.document);
        expect(foundInvoice.address).toEqual(invoiceProps.address);
        expect(foundInvoice.createdAt).toEqual(invoiceProps.createdAt);
        expect(foundInvoice.updatedAt).toEqual(invoiceProps.updatedAt);

    });


});
