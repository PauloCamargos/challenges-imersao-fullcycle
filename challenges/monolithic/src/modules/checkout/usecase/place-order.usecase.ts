import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import ClientAdmFacadeInterface from "../../client-adm/facade/client-adm.facade.interface";
import ProductAdmFacadeInterface from "../../product-adm/facade/product-adm.facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputTto } from "./place-order.usecase.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {
     private _clientFacade: ClientAdmFacadeInterface;
     private _productFacade: ProductAdmFacadeInterface;

     constructor(_clientFacade: ClientAdmFacadeInterface, _productFacade: ProductAdmFacadeInterface) {
          this._clientFacade = _clientFacade;
          this._productFacade = _productFacade;
     }

     async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputTto> {
          // fecth client, explode if cant find
          const client = await this._clientFacade.find({ id: input.clientId });
          if (!client) {
               throw new Error("Client not found");
          }
          // validate products
          await this.validateProducts(input);

          // fetch products

          // create client obj

          // create order obj (client, product)


          // process payment
          // case payment approved generate invoice
          // change order status to approved
          // return dto

          return {
               id: "",
               invoiceId: "",
               status: "",
               total: 0,
               products: []
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

}
