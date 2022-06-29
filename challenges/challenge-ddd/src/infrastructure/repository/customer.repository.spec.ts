import { Sequelize } from "sequelize-typescript";
import Customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1", 100);

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne(
            { where: { id: "1" } }
        );

        expect(customerModel?.toJSON()).toStrictEqual({
            id: "1",
            name: "Customer 1",
            price: 100,
        });
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1", 100);

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne(
            { where: { id: "1" } }
        );

        expect(customerModel?.toJSON()).toStrictEqual({
            id: "1",
            name: "Customer 1",
            price: 100,
        });

        customer.changeName("Customer 2");

        await customerRepository.update(customer);

        const customerModel2 = await CustomerModel.findOne({ where: { id: "1" } });
        expect(customerModel2?.toJSON()).toStrictEqual({
            id: "1",
            name: "Customer 2",
            price: 200,
        });
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Customer 1", 100);

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne(
            { where: { id: "1" } }
        );

        const foundCustomer = customerRepository.find(customer.id);

        expect(customerModel?.toJSON()).toStrictEqual({
            id: (await foundCustomer).id,
            name: (await foundCustomer).name,
            price: (await foundCustomer).price,
        });
    });

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();

        const customer1 = new Customer("1", "Customer 1", 100);
        await customerRepository.create(customer1);

        const customer2 = new Customer("2", "Customer 2", 200);
        await customerRepository.create(customer2);

        const foundCustomers = await customerRepository.findAll();
        const customers = [customer1, customer2];

        expect(customers).toEqual(foundCustomers);
    });

});