import EventHandlerInterface from "../../../@shared/event-handler.interface";
import eventInterface from "../../../@shared/event.interface";

export default class SendConsoleLogWhenCustomerAddressChangedHandler implements EventHandlerInterface {
    handle(event: eventInterface): void {
        const data = event.eventData;
        const formattedAddress = `\
        St. ${data["addressStreet"]}, \
        ${data["addressNumber"]} - \
        Zipcode: ${data["address"]}, \
        ${data["addressCity"]}`;

        console.log(
            `Endereço do cliente: ${data["customerId"]}, ${data["customerName"]} alterado para: ${formattedAddress}`
        )
    }

}