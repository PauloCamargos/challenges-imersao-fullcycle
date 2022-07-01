import Order from "../../domain/entity/order";
import OrderRepositoryInterfae from "../../domain/repository/order_repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterfae {
    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity
                }))
            },
            {
                include: [{ model: OrderItemModel }]
            }
        );
    }

    async update(entity: Order): Promise<void> {
        // sadly, not so simple with sequelize.
        throw new Error("Method not implemented.");
    }

    async find(id: string): Promise<Order> {
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<Order[]> {
        throw new Error("Method not implemented.");
    }
}