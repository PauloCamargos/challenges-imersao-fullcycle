import AggregateRoot from "../../@shared/domain/enitty/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/enitty/base.entity";
import Id from "../../@shared/domain/enitty/value-object/id.value-object";

type ClientProps = {
     id?: Id;
     name: string;
     email: string;
     address: string;
};


export default class Client extends BaseEntity implements AggregateRoot {
     private _name: string;
     private _email: string;
     private _address: string;

     constructor(props: ClientProps) {
          super(props.id);
          this._name = props.name;
          this._address = props.address;
          this._email = props.email;
     }

     get name(): string {
          return this._name;
     }

     get email(): string {
          return this._email;
     }

     get address(): string {
          return this._address;
     }
}
