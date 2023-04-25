import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Product from "../../../../domain/product/entity/product";
import OrderItemModel from "../model/order-item.model";
import OrderModel from "../model/order.model";
import ProductModel from "../../../product/sequelize/model/product.model";
import CustomerRepository from "../../../customer/sequelize/repository/customer.repository";
import ProductRepository from "../../../product/sequelize/repository/product.repository";
import OrderRepository from "./order.repository";
import CustomerModel from "../../../customer/sequelize/model/customer.model";

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
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "P1", 1);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
        const orderRepository = new OrderRepository();
        const order = new Order("1", customer.id, [orderItem]);
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel!.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customerId,
            total: order.total,
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: orderItem.productId,
                }
            ]
        });
    });

    it("should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "John Doe");
        const address = new Address("Second Avenue", 1, "123", "New York");
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("1", "P1", 5);
        await productRepository.create(product);
        const product2 = new Product("2", "P2", 10);
        await productRepository.create(product2);

        const orderItem1 = new OrderItem(
            "1", product.name, product.price, product.id, 1,
        );
        const orderItem2 = new OrderItem(
            "2", product2.name, product2.price, product2.id, 1,
        );
        const orderRepository = new OrderRepository();
        const order = new Order("1", customer.id, [orderItem1, orderItem2]);
        await orderRepository.create(order);

        // updates
        const customer2 = new Customer("2", "Jane Doe");
        customer2.changeAddress(address);
        customer2.activate();
        await customerRepository.create(customer2);
        order.changeCustomer(customer2.id);

        const product3 = new Product("3", "P3", 15);
        await productRepository.create(product3);

        const orderItem3 = new OrderItem(
            "3", product3.name, product3.price, product3.id, 1,
        );
        order.addItem(orderItem3);
        order.removeItem(orderItem1);

        await orderRepository.update(order);
        const orderModelUpdated = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModelUpdated!.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer2.id,
            total: order.total,
            items: [
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity,
                    order_id: order.id,
                    product_id: orderItem2.productId,
                },
                {
                    id: orderItem3.id,
                    name: orderItem3.name,
                    price: orderItem3.price,
                    quantity: orderItem3.quantity,
                    order_id: order.id,
                    product_id: orderItem3.productId,
                },
            ]
        });
    });

    it("should find an order and items", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "John Doe");
        const address = new Address("Second Avenue", 1, "123", "New York");
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product1 = new Product("1", "P1", 10);
        const product2 = new Product("2", "P2", 20);
        await productRepository.create(product1);
        await productRepository.create(product2);

        const orderItem1 = new OrderItem(
            "1", product1.name, product1.price, product1.id, 1,
        );
        const orderItem2 = new OrderItem(
            "2", product2.name, product2.price, product2.id, 2,
        );
        const orderItems = [orderItem1, orderItem2]
        const orderRepository = new OrderRepository();
        const order = new Order("1", customer.id, orderItems);
        await orderRepository.create(order);

        const orderFound = await orderRepository.find(order.id);
        expect(order).toEqual(orderFound)

    })

    it("should find all orders and items", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("1", "John Doe");
        const customer2 = new Customer("2", "Jane Doe");
        const address = new Address("Second Avenue", 1, "123", "New York");
        customer1.changeAddress(address);
        customer1.activate();
        customer2.changeAddress(address);
        customer2.activate();
        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const productRepository = new ProductRepository();
        const product1 = new Product("1", "P1", 10);
        const product2 = new Product("2", "P2", 20);
        await productRepository.create(product1);
        await productRepository.create(product2);

        const orderItem1 = new OrderItem(
            "1", product1.name, product1.price, product1.id, 1,
        );
        const orderItem2 = new OrderItem(
            "2", product2.name, product2.price, product2.id, 2,
        );
        const orderRepository = new OrderRepository();
        const order1 = new Order("1", customer1.id, [orderItem1]);
        const order2 = new Order("2", customer2.id, [orderItem2]);
        await orderRepository.create(order1);
        await orderRepository.create(order2);

        const ordersFound = await orderRepository.findAll();
        expect([order1, order2]).toEqual(ordersFound)
    });

});