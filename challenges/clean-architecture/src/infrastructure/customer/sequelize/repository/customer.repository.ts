import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer_repository.interface";
import CustomerModel from "../model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            zipcode: entity.address.zipcode,
            city: entity.address.city,
            number: entity.address.number,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        });
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                name: entity.name,
                street: entity.address.street,
                zipcode: entity.address.zipcode,
                city: entity.address.city,
                number: entity.address.number,
                active: entity.isActive(),
                rewardPoints: entity.rewardPoints,
            },
            {
                where: {
                    id: entity.id,
                },
            }
        );
    }

    async find(id: string): Promise<Customer> {
        let customerModel;
        try {
            customerModel = await CustomerModel.findOne({
                where: { id },
                rejectOnEmpty: true,
            });
        } catch (error) {
            throw new Error("Customer not found.");
        }

        const customer = new Customer(
            customerModel!.id,
            customerModel!.name,
        );
        const address = new Address(
            customerModel!.street,
            customerModel!.number,
            customerModel!.zipcode,
            customerModel!.city,
        );
        customer.changeAddress(address);
        customer.activate();

        return customer;
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();
        return customerModels.map(
            customerModel => {
                const customer = new Customer(
                    customerModel!.id,
                    customerModel!.name,
                );
                const address = new Address(
                    customerModel!.street,
                    customerModel!.number,
                    customerModel!.zipcode,
                    customerModel!.city,
                );
                customer.addRewardPoints(customerModel.rewardPoints);
                customer.changeAddress(address);
                if (customerModel.active)
                    customer.activate();

                return customer;
            });
    }
}