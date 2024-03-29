import BaseEntity from "../../@shared/domain/enitty/base.entity";
import Id from "../../@shared/domain/enitty/value-object/id.value-object";

type ProductSProps = {
  id: Id,
  name: string,
  description: string,
  salesPrice: number,
};

export default class ProductSC extends BaseEntity {
  private _name: string;
  private _description: string;
  private _salesPrice: number;

  constructor(props: ProductSProps) {
    super(props.id);
    this._name = props.name;
    this._description = props.description;
    this._salesPrice = props.salesPrice;
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
  }
  public get salesPrice(): number {
    return this._salesPrice;
  }
  public set salesPrice(value: number) {
    this._salesPrice = value;
  }

}
