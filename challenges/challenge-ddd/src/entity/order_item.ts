export default class OrderItem {
    _id: string;
    _name: string;
    _price: number;

    constructor(_id: string, _name: string, _price: number) {
        this._id = _id
        this._name = _name
        this._price = _price
    }

}
