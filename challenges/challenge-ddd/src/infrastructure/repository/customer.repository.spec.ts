import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
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

        const customer = new Customer("1", "Customer 1");

        const address = new Address("Rua X", 222, "111", "Neverland");
        customer.setAddress(address);

        customer.activate();

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne(
            { where: { id: "1" } }
        );

        expect(customerModel?.toJSON()).toStrictEqual({
            id: "1",
            name: "Customer 1",
            street: "Rua X",
            zipcode: "111",
            city: "Neverland",
            number: 222,
            active: true,
            rewardPoints: 0,
        });
    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();

        const customer = new Customer("1", "Customer 1");

        const address = new Address("Rua X", 222, "111", "Neverland");
        customer.setAddress(address);

        customer.activate();

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne(
            { where: { id: "1" } }
        );

        expect(customerModel?.toJSON()).toStrictEqual({
            id: "1",
            name: "Customer 1",
            street: "Rua X",
            zipcode: "111",
            city: "Neverland",
            number: 222,
            active: true,
            rewardPoints: 0,
        });

        customer.changeName("Customer 2");

        await customerRepository.update(customer);

        const customerModel2 = await CustomerModel.findOne({ where: { id: "1" } });
        expect(customerModel2?.toJSON()).toStrictEqual({
            id: "1",
            name: "Customer 2",
            street: "Rua X",
            zipcode: "111",
            city: "Neverland",
            number: 222,
            active: true,
            rewardPoints: 0,
        });
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();

        const customer = new Customer("1", "Customer 1");

        const address = new Address("Rua X", 222, "111", "Neverland");
        customer.setAddress(address);

        customer.activate();

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne(
            { where: { id: "1" } }
        );

        const foundCustomer = customerRepository.find(customer.id);

        expect(customerModel?.toJSON()).toStrictEqual({
            id: (await foundCustomer).id,
            name: (await foundCustomer).name,
            street: (await foundCustomer).address.street,
            zipcode: (await foundCustomer).address.zipcode,
            city: (await foundCustomer).address.city,
            number: (await foundCustomer).address.number,
            active: (await foundCustomer).isActive(),
            rewardPoints: (await foundCustomer).rewardPoints,
        });
    });

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();

        const address = new Address("Rua X", 222, "111", "Neverland");

        const customer1 = new Customer("1", "Customer 1");
        customer1.setAddress(address);
        customer1.activate();
        customer1.addRewardPoints(10)
        await customerRepository.create(customer1);


        const customer2 = new Customer("2", "Customer 2");
        customer2.setAddress(address);
        customer2.activate();
        await customerRepository.create(customer2);

        const foundCustomers = await customerRepository.findAll();
        const customers = [customer1, customer2];
        expect(customers).toEqual(foundCustomers);
    });

    it('should throw an error when customer is not found', () => {
        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find("foo");
        }).rejects.toThrow("Customer not found.")

    });
});