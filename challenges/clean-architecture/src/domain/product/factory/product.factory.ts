import ProductInterface from "../entity/product.interface";
import { v4 as uuid } from "uuid";

const supported_types = ["Product", "ProductB"]

export default class ProductFactory {
    public static create(product_type: new (...args: any) => ProductInterface, name: string, price: number): ProductInterface {
        if (!supported_types.includes(product_type.name))
            throw new Error("type not supported")
        return new product_type(uuid(), name, price);
    }
}