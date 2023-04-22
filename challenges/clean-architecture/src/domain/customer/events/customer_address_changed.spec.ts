import EventDispatcher from "../../product/event/event_dispatcher";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import SendConsoleLogWhenCustomerAddressChangedHandler from "./handler/send_console_log_when_customer_address_changed.handler";

describe("Customer address event tests", () => {
    it("should notify all customer address changed handlers", () => {
        const eventDispatcher= new EventDispatcher();
        const eventHandler = new SendConsoleLogWhenCustomerAddressChangedHandler();

        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        // simple injection of event dispatcher only to fulfill exercise purpose
        const customer = new Customer("1", "John Doe", eventDispatcher);
        const address = new Address("First Av.", 101, "123ABC", "Lalaland");
        customer.changeAddress(address);  // event should me emited from here

        expect(spyEventHandler).toHaveBeenCalled();
    })
})