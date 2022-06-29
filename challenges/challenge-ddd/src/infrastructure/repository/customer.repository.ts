import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer_repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

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
        const customerModel = await CustomerModel.findOne({ where: { id } });

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
        customer.setAddress(address);
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
                customer.setAddress(address);
                customer.activate();

                return customer;
            });
    }

}