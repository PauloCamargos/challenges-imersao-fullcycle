import Product from "./product";

describe("Product unit tests", () => {

    it("should throw error when id is emtpy", () => {
        expect(() => {
            let product = new Product("", "Product 1", 100);
        }).toThrowError("product: id is required");
    });

    it("should throw error when name is emtpy", () => {
        expect(() => {
            let product = new Product("P1", "", 100);
        }).toThrowError("product: name is required");
    });

    it("should throw error when price is negative", () => {
        expect(() => {
            let product = new Product("P1", "Product 1", -1);
        }).toThrowError("product: price must be greater than zero");
    });

    it("should throw error when id and name is empty and price is negative", () => {
        expect(() => {
            let product = new Product("", "", -1);
        }).toThrowError(
            "product: id is required,product: name is required,product: price must be greater than zero",
        );
    });

    it("should change name", () => {
        let product = new Product("P1", "Product 1", 1);
        product.changeName("Product One");
        expect(product.name).toBe("Product One");
    });

    it("should change price", () => {
        let product = new Product("P1", "Product 1", 1);
        product.changePrice(150);
        expect(product.price).toBe(150);
    });

});