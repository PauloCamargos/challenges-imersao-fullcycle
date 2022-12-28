import EventDispatcherInterface from "../../@shared/event/event_dispatcher.interface";
import EventHandlerInterface from "../../@shared/event/event_handler.interface";
import eventHandlerInterface from "../../@shared/event/event_handler.interface";
import eventInterface from "../../@shared/event/event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
    private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

    get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
        return this.eventHandlers;
    }
    notify(event: eventInterface): void {
        const eventName = event.constructor.name;

        const handlers = this.eventHandlers[eventName]
        if (handlers) {
            handlers.forEach(eventHandler => eventHandler.handle(event))
        }
    }

    register(eventName: string, eventHandler: eventHandlerInterface<eventInterface>): void {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(eventHandler)
    }

    unregister(eventName: string, eventHandler: eventHandlerInterface<eventInterface>): void {
        if (this.eventHandlers[eventName]) {
            const index = this.eventHandlers[eventName].indexOf(eventHandler);
            if (index !== -1) {
                this.eventHandlers[eventName].splice(index, 1);
            }
        }
    }

    unregisterAll(): void {
        this.eventHandlers = {};
    }
}