import ValueObject from "./value-objects.interface";

export default class Address implements ValueObject {
     private _street: string;
     private _number: number;

     constructor(street: string, number: number) {
          this._street = street;
          this._number = number;
     }

     get street(): string {
          return this._street;
     }

     get number(): number {
          return this._number;
     }
}
