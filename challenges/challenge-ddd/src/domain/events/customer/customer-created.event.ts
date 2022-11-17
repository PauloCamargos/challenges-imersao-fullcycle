import EventInterface from "../@shared/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
    datetimeOccurrence: Date;
    eventData: any;

    constructor(eventData: any) {
        this.datetimeOccurrence = new Date();
        this.eventData = eventData;
    }

}