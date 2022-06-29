import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    it("shoud throw error when id is emtpy", () => {

        expect(() => {
            let customer = new Customer("", "John Doe");
        }).toThrowError("Id is required.");
    });

    it("shoud throw error when name is emtpy", () => {

        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Name is required.");
    });

    it("shoud change name", () => {
        const customer = new Customer("123", "John Doe");
        customer.changeName("Jane Doe");
        expect(customer.name).toBe("Jane Doe");
    });

    it("shoud throw error when activate customer with no address", () => {
        const customer = new Customer("123", "John Doe");
        expect(() => customer.activate()).toThrowError(
            "Address is madatory to activate new customer."
        );
    });

    it("shoud activate customer", () => {
        const customer = new Customer("123", "John Doe");
        const address = new Address(
            "Av. Neverland", 2, "1234-4312", "The citadel"
        );
        customer.setAddress(address);
        customer.activate();
        expect(customer.isActive()).toBe(true);
    });

    it("shoud deactivate customer", () => {
        const customer = new Customer("123", "John Doe");
        const address = new Address(
            "Av. Neverland", 2, "1234-4312", "The citadel"
        );
        customer.setAddress(address);
        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    });

    it("should add raward points", () => {
        const customer = new Customer("1", "customer 1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });
});