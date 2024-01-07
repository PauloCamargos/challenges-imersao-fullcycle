import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceItemModel from "./invoice-item.model";

@Table({
     tableName: "invoices",
     timestamps: false,
})
export default class InvoiceModel extends Model {
     @PrimaryKey
     @Column
     declare id: string;

     @Column({allowNull: false})
     declare name: string

     @Column({allowNull: false})
     declare document: string

     @Column({ allowNull: false })
     declare addressStreet: string;
     
     @Column({ allowNull: false })
     declare addressNumber: string;

     @Column({ allowNull: false })
     declare addressState: string;
     
     @Column({ allowNull: false })
     declare addressComplement: string;
     
     @Column({ allowNull: false })
     declare addressCity: string;
     
     @Column({ allowNull: false })
     declare addressZipCode: string;

     @HasMany(() => InvoiceItemModel)
     declare items: InvoiceItemModel[];

     @Column({ allowNull: false })
     declare createdAt: Date;

     @Column({ allowNull: false })
     declare updatedAt: Date;
}
