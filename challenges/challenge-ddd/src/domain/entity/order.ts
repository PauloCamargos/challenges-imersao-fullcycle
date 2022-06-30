import OrderItem from "./order_item";

export default class Order {
    private _id: string;
    private _customerId: string;  // id cause it's from another agg.
    private _items: OrderItem[];  // object cause it's from the same agg.
    private _total: number;

    constructor(
        id: string, customerId: string, items: OrderItem[]
    ) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    validate() {
        if (this._id.length === 0) {
            throw Error("Id is required.");
        }

        if (this._customerId.length === 0) {
            throw Error("Id is required.");
        }

        if (this._items.length === 0) {
            throw Error("Item qnt must be greater than 0.");
        }

        if (this._items.some(el => el.quantity <= 0)) {
            throw Error("Quantity must be grater than 0.");
        }
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.price, 0);
    }

}
