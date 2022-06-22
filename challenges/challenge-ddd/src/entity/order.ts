import OrderItem from "./order_item";

export default class Order {
    _id: string;
    _customerId: string;  // id cause it's from another agg.
    _items: OrderItem[];  // object cause it's from the same agg.

    constructor(_id: string, _customerId: string, _items: OrderItem[]) {
        this._id = _id
        this._customerId = _customerId
        this._items = _items
    }

}
