import AggregateRoot from "../../@shared/domain/enitty/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/enitty/base.entity";
import Id from "../../@shared/domain/enitty/value-object/id.value-object";

type ProductProps = {
     id?: Id;
     name: string;
     description: string;
     salesPrice: number;
};

export default class Product extends BaseEntity implements AggregateRoot {
     private _name: string;
     private _descritpion: string;
     private _salesPrice: number;

     constructor(props: ProductProps) {
          super(props.id);

          this._name = props.name;
          this._descritpion = props.description;
          this._salesPrice = props.salesPrice;
     }

     public get name(): string {
          return this._name;
     }

     public get descritpion(): string {
          return this._descritpion;
     }

     public get salesPrice(): number {
          return this._salesPrice;
     }
}
