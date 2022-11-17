import EventInterface from "../@shared/event.interface";

export default class CustomerAddressChangedEvent implements EventInterface {
    datetimeOccurrence: Date;
    eventData: any;

    constructor(eventData: any) {
        this.datetimeOccurrence = new Date();
        this.eventData = eventData;
    }

}