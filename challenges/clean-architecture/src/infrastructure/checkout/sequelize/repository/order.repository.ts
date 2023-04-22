import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterfae from "../../../../domain/checkout/repository/order_repository.interface";
import OrderItemModel from "../model/order-item.model";
import OrderModel from "../model/order.model";


export default class OrderRepository implements OrderRepositoryInterfae {
    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total,
                items: entity.items.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity,
                }))
            },
            {
                include: [{ model: OrderItemModel }]
            }
        );
    }

    async update(entity: Order): Promise<void> {
        // fetching items to remove requires another hit on db, thus
        // destroy is a valid alternative for this challenge
        await OrderItemModel.destroy({ where: { order_id: entity.id } })

        await OrderItemModel.bulkCreate(
            entity.items.map(
                item => ({
                    id: item.id,
                    order_id: entity.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity
                })
            ),
            // {
            //     updateOnDuplicate: ["name", "price", "product_id", "quantity"],
            // }
        );

        await OrderModel.update(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total,
            },
            {
                where: {
                    id: entity.id
                }
            }
        )
    }

    async find(id: string): Promise<Order> {
        let orderModel;
        try {
            orderModel = await OrderModel.findOne({
                where: { id },
                rejectOnEmpty: true,
                include: ["items"],
            });
        } catch (error) {
            throw new Error("Order not found.");
        }

        const order = new Order(
            orderModel.id,
            orderModel.customer_id,
            orderModel.items.map(
                item => (
                    new OrderItem(
                        item.id,
                        item.name,
                        item.price,
                        item.product_id,
                        item.quantity,
                    )
                )
            )
        )
        return order;
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({ include: ["items"] })

        return orderModels.map(
            orderModel => new Order(
                orderModel.id,
                orderModel.customer_id,
                orderModel.items.map(
                    item => (
                        new OrderItem(
                            item.id,
                            item.name,
                            item.price,
                            item.product_id,
                            item.quantity,
                        )
                    )
                )
            )
        )
    }
}