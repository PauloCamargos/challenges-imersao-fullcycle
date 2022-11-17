import EventDispatcherInterface from "../events/@shared/event-dispatcher.interface";
import CustomerAddressChangedEvent from "../events/customer/customer-address-changed.event";
import CustomerCreatedEvent from "../events/customer/customer-created.event";
import Address from "./address";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;
    private _event_dispatcher: EventDispatcherInterface | null;

    constructor(
        id: string,
        name: string,
        event_dispatcher: EventDispatcherInterface | null = null,
    ) {
        this._id = id;
        this._name = name;
        this.validate();
        this._event_dispatcher = event_dispatcher;

        this.fireCustomerCreatedEvent();
    }

    get name(): string {
        return this._name;
    }

    get address(): Address {
        return this._address;
    }

    get id(): string {
        return this._id;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }


    validate() {
        if (this._name.length === 0) {
            throw new Error("Name is required.");
        }
        if (this._id.length === 0) {
            throw new Error("Id is required.");
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is madatory to activate new customer.");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    isActive(): boolean {
        return this._active;
    }

    changeAddress(address: Address) {
        this._address = address;
        this.fireCustomerAddressChangedEvent();
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }
    
    fireCustomerAddressChangedEvent() {
        if (!this._event_dispatcher) return;
        const event = new CustomerAddressChangedEvent(
            {
                customerId: this.id,
                customerName: this.name,
                addressStreet: this.address.street,
                addressNumber: this.address.number,
                addressZipcode: this.address.zipcode,
                addressCity: this.address.city,
            }
        );

        this._event_dispatcher.notify(event);
    }

    fireCustomerCreatedEvent() {
        if (!this._event_dispatcher) return;
        this._event_dispatcher.notify(new CustomerCreatedEvent({customerId: this.id}))
    }
}