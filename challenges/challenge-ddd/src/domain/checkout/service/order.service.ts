import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import { v4 as uuid4 } from "uuid";

export default class OrderService {

    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        if (items.length === 0) {
            throw new Error("Order must have at least one item.");
        }
        const order = new Order(uuid4(), customer.id, items);
        customer.addRewardPoints(order.computeTotal() / 2);

        return order;
    }

    static total(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.computeTotal(), 0);
    }
}