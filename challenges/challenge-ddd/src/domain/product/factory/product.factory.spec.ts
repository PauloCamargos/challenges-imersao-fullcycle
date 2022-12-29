import Product from "../entity/product";
import ProductB from "../entity/product-b";
import ProductInterface from "../entity/product.interface";
import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {
    it("should create a product of type a", () => {
        const product = ProductFactory.create(Product, "Product A", 1);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(1);
        expect(product.constructor.name).toBe("Product");
    })

    it("should create a product of type b", () => {
        const product = ProductFactory.create(ProductB, "Product B", 1);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(2);
        expect(product.constructor.name).toBe("ProductB");
    })

    it("should throw an error when product type is not supported", () => {
        class NotSupportedProduct implements ProductInterface {
            get id(): string {
                throw new Error("Method not implemented.");
            }
            get name(): string {
                throw new Error("Method not implemented.");
            }
            get price(): number {
                throw new Error("Method not implemented.");
            }
        }

        expect(() => ProductFactory.create(NotSupportedProduct, "Product Not Supported", 1)).toThrowError(
            "type not supported"
        )
    })
})