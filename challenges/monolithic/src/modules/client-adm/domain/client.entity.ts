import AggregateRoot from "../../@shared/domain/enitty/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/enitty/base.entity";
import Id from "../../@shared/domain/enitty/value-object/id.value-object";

type ClientProps = {
  id?: Id;
  name: string;
  email: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Client extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _email: string;
  private _address: string;

  constructor(props: ClientProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._email = props.email;
    this._address = props.address;
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }
  public get address(): string {
    return this._address;
  }
  public set address(value: string) {
    this._address = value;
  }
}