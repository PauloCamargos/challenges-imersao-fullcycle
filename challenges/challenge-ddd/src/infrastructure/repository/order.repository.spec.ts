import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import Product from "../../domain/entity/product";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";

describe("Order repository tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([
            CustomerModel,
            OrderModel,
            OrderItemModel,
            ProductModel
        ]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "John Doe");
        const address = new Address("Second Avenue", 1, "123", "New York");
        customer.setAddress(address);
        customer.activate();
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "P1", 0);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", "Item 1", 10, "1", 2);
        const items = [orderItem];

        const orderRepository = new OrderRepository();
        const order = new Order("1", "1", items);
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel!.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customerId,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "1",
                    product_id: orderItem.productId,
                }
            ]
        });
    });

    it("should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "John Doe");
        const address = new Address("Second Avenue", 1, "123", "New York");
        customer.setAddress(address);
        customer.activate();
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "P1", 0);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", "Item 1", 10, "1", 2);
        const items = [orderItem];

        const orderRepository = new OrderRepository();
        const order = new Order("1", "1", items);
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel!.toJSON()).toStrictEqual({
            id: "1",
            customer_id: "1",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    product_id: orderItem.productId,
                    order_id: "1",
                }
            ]
        });

        // updates
        const customer2 = new Customer("2", "Jane Doe");
        customer2.setAddress(address);
        customer2.activate();
        await customerRepository.create(customer2);

        order.changeCustomer(customer2.id);
        
        orderItem.changePrice(20)
        orderItem.changeQuantity(4);

        const newItem = new OrderItem("2", "Item 2", 100, "2", 1);
        order.addItem(newItem);

        await orderRepository.update(order);
        const orderModelUpdated = await OrderModel.findOne(
            { where: { id: "1" } }
        );

        expect(orderModelUpdated!.toJSON()).toStrictEqual({
            id: "1",
            customer_id: "2",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: "New Item 1 Name",
                    price: orderItem.price,
                    quantity: 4,
                    order_id: "1",
                    product_id: orderItem.productId,
                },
                {
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: newItem.quantity,
                    order_id: "1",
                    product_id: newItem.productId,
                }
            ]
        });
    });

});