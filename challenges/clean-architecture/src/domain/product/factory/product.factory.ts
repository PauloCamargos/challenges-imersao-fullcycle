import ProductInterface from "../entity/product.interface";
import { v4 as uuid } from "uuid";

export default class ProductFactory {
    public static create(product_type: new (...args: any) => ProductInterface, name: string, price: number): ProductInterface {
        const supported_types = ["Product", "ProductB"]
        if (!supported_types.includes(product_type.name))
            throw new Error("type not supported")
        return new product_type(uuid(), name, price);
    }
}