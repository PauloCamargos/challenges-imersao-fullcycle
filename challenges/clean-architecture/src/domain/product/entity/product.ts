import AbstractEntity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductInterface from "./product.interface";

export default class Product extends AbstractEntity implements ProductInterface {
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        super();
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();

        if (this.notification.hasError()) {
            throw new NotificationError(this.notification.getErrors())
        }
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    validate() {
        if (this._id.length === 0) {
            this.notification.addError({
                message: "id is required",
                context: "product"
            });
        }

        if (this._name.length === 0) {
            this.notification.addError({
                message: "name is required",
                context: "product"
            });
        }

        if (this._price < 0) {
            this.notification.addError({
                message: "price must be greater than zero",
                context: "product"
            });
        }
    }

    changeName(name: string) {
        this._name = name;
    }

    changePrice(price: number) {
        this._price = price;
    }

}