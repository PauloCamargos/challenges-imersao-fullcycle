import AbstractEntity from "../../@shared/entity/entity.abstract";
import EventDispatcherInterface from "../../@shared/event/event_dispatcher.interface";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerAddressChangedEvent from "../../customer/events/customer_address_changed.event";
import CustomerCreatedEvent from "../../customer/events/customer_created.event";
import Address from "../value-object/address";
import CustomerInterface from "./customer.interface";

export default class Customer extends AbstractEntity implements CustomerInterface {
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
        super();
        this._id = id;
        this._name = name;
        this.validate();
        this._event_dispatcher = event_dispatcher;

        if (this.notification.hasError()) {
            throw new NotificationError(this.notification.getErrors());
        }

        this.fireCustomerCreatedEvent();
    }

    get name(): string {
        return this._name;
    }

    get address(): Address {
        return this._address;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }


    validate() {
        if (this.id.length === 0) {
            this.notification.addError({
                message: "id is required",
                context: "customer"
            });
        }
        if (this._name.length === 0) {
            this.notification.addError({
                message: "name is required",
                context: "customer"
            });
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
        this._event_dispatcher.notify(new CustomerCreatedEvent({ customerId: this.id }));
    }
}