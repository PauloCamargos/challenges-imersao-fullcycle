import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("should throw error when id is emtpy", () => {
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrowError("Id is required.");
    });

    it("should throw error when customerId is emtpy", () => {
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrowError("Id is required.");
    });

    it("should throw error when qnt is less than 0", () => {
        expect(() => {
            let order = new Order("123", "123", []);
        }).toThrowError("Item qnt must be greater than 0.");
    });

    it("should calculated total", () => {
        const item = new OrderItem("I1", "Item1", 100, "p1", 2);
        const order = new Order("O1", "C1", [item]);

        expect(order.total()).toBe(200);

        const item2 = new OrderItem("I2", "Item2", 200, "p1", 2);
        const order2 = new Order("O1", "C1", [item, item2]);

        expect(order2.total()).toBe(600);
    });

    it("should throw error if the any item quantity is less or equal than 0", () => {
        const item = new OrderItem("I1", "Item1", 100, "p1", 0);
        
        expect(() => {
            const order = new Order("O1", "C1", [item]);
        }).toThrowError("Quantity must be grater than 0.");

    });

});