import AggregateRoot from "../../@shared/domain/enitty/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/enitty/base.entity";
import Id from "../../@shared/domain/enitty/value-object/id.value-object";

type InvoiceItemProps = {
     id?: Id;
     name: string;
     price: number;
};

export default class InvoiceItem extends BaseEntity implements AggregateRoot {
     private _name: string;
     private _price: number;

     constructor(props: InvoiceItemProps) {
          super(props.id);
          this._name = props.name;
          this._price = props.price;
     }

     get name(): string {
          return this._name;
     }

     get price(): number {
          return this._price;
     }
}
