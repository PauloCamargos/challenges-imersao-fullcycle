import EventHandlerInterface from "../../../@shared/event/event_handler.interface";
import eventInterface from "../../../@shared/event/event.interface";

export default class SendConsoleLog1WhenCustomerCreatedHandler implements EventHandlerInterface {
    handle(event: eventInterface): void {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    }

}