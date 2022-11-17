
import Customer from "../../../../entity/customer";
import EventDispatcher from "../../../@shared/event_dispatcher";
import SendConsoleLog1WhenCustomerCreatedHandler from "./send_console_log_1_when_customer_created.handler";
import SendConsoleLog2WhenCustomerCreatedHandler from "./send_console_log_2_when_customer_created.handler";

describe("Customer created event tests", () => {
    it("should notify all customer created handlers", () => {
        const eventDispatcher= new EventDispatcher();
        const eventHandler1 = new SendConsoleLog1WhenCustomerCreatedHandler();
        const eventHandler2 = new SendConsoleLog2WhenCustomerCreatedHandler();

        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        // simple injection of event dispatcher only to fulfill exercise purpose
        new Customer("1", "John Doe", eventDispatcher);
        
        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    })
})