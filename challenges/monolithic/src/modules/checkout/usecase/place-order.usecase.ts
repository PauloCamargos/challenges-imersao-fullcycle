import Id from "../../@shared/domain/enitty/value-object/id.value-object";
import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import ClientAdmFacadeInterface from "../../client-adm/facade/client-adm.facade.interface";
import InvoiceFacadeInterface from "../../invoice/facade/invoice.facade.interface";
import PaymentFacadeInterface from "../../payment/facade/payment.facade.interface";
import ProductAdmFacadeInterface from "../../product-adm/facade/product-adm.facade.interface";
import StoreCatalogFacadeInterface from "../../store-catalog/facade/store-catalog.facade.interface";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import { PlaceOrderInputDto, PlaceOrderOutputTto } from "./place-order.usecase.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {
    private _clientFacade: ClientAdmFacadeInterface;
    private _productFacade: ProductAdmFacadeInterface;
    private _catalogFacade: StoreCatalogFacadeInterface;
    private _repository: CheckoutGateway;
    private _invoiceFacade: InvoiceFacadeInterface;
    private _paymentFacade: PaymentFacadeInterface;

    constructor(
        clientFacade: ClientAdmFacadeInterface,
        productFacade: ProductAdmFacadeInterface,
        catalogFacade: StoreCatalogFacadeInterface,
        repository: CheckoutGateway,
        invoiceFacade: InvoiceFacadeInterface,
        paymentFacade: PaymentFacadeInterface,
    ) {
        this._clientFacade = clientFacade;
        this._productFacade = productFacade;
        this._catalogFacade = catalogFacade;
        this._repository = repository;
        this._invoiceFacade = invoiceFacade;
        this._paymentFacade = paymentFacade;
    }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputTto> {
        const client = await this._clientFacade.find({ id: input.clientId });
        if (!client) {
            throw new Error("Client not found");
        }

        await this.validateProducts(input);

        const products = await Promise.all(
            input.products.map(p => this.getProduct(p.productId))
        );

        const myClient = new Client({
            id: new Id(client.id),
            name: client.name,
            email: client.email,
            address: client.street,
        });

        const order = new Order({
            client: myClient,
            products: products,
        });

        // process payment
        const payment = await this._paymentFacade.process({
            orderId: order.id.id,
            amount: order.total,
        });

        let invoice = null;

        if (payment.status === "approved") {
            invoice = await this._invoiceFacade.generate({
                name: client.name,
                document: client.document,
                street: client.street,
                number: client.number,
                complement: client.complement,
                city: client.city,
                state: client.state,
                zipCode: client.zipCode,
                items: products.map(
                    p => ({ id: p.id.id, name: p.name, price: p.salesPrice })
                )
            });

            order.approved();
        }

        if (order.status === "approved") {
            this._repository.addOrder(order);
        }

        return {
            id: order.id.id,
            invoiceId: invoice ? invoice.id : null,
            status: order.status,
            total: order.total,
            products: products.map(
                p => ({ productId: p.id.id })
            )
        };

    }

    private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
        if (input.products.length == 0) {
            throw new Error("No products selected");
        }

        for (const p of input.products) {
            const product = await this._productFacade.checkStock({
                productId: p.productId,
            });
            if (product.stock <= 0) {
                throw new Error(`Product ${p.productId} is not available in stock`);
            }
        }
    }

    private async getProduct(productId: string): Promise<Product> {
        const product = await this._catalogFacade.find({ id: productId });
        if (!product) {
            throw new Error("Product not found");
        }
        const productProps = {
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        };
        return new Product(productProps);
    }

}
