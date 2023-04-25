import Address from "../value-object/address";

export default interface CustomerInterface {
    get name(): string;
    get address(): Address;
    get rewardPoints(): number;
}