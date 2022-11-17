import EventHandlerInterface from "../../@shared/event_handler.interface";
import ProductCreatedEvent from "../product_created.event";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface{
    handle(event: ProductCreatedEvent): void {
        console.log("Sending email to user");
    }
}