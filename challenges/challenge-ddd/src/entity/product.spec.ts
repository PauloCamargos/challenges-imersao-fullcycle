import Product from "./product";

describe("Product unit tests", () => {

    it("should throw error when id is emtpy", () => {
        expect(() => {
            let product = new Product("", "Product 1", 100);
        }).toThrowError("Id is required.");
    });

    it("should throw error when name is emtpy", () => {
        expect(() => {
            let product = new Product("P1", "", 100);
        }).toThrowError("Name is required.");
    });

    it("should throw error when price is emtpy", () => {
        expect(() => {
            let product = new Product("P1", "Product 1", -1);
        }).toThrowError("Price must be greated than 0.");
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