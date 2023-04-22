import EventInterface from "../../@shared/event/event.interface";

export default class ProductCreatedEvent implements EventInterface {
    datetimeOccurrence: Date;
    eventData: any;

    constructor(eventData: any) {
        this.datetimeOccurrence = new Date();
        this.eventData = eventData;
    }
}