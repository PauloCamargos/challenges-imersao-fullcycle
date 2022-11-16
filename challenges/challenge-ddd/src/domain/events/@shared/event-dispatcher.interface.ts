import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default interface EventDispatcherInterface {
    notify(event: EventInterface): void;
    register(eventName: string, eventHadler: EventHandlerInterface): void;
    unregister(eventName: string, eventHadler: EventHandlerInterface): void;
    unregisterAll(): void;
}
