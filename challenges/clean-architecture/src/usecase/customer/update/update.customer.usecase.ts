import CustomerRepositoryInterface from "../../../domain/customer/repository/customer_repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { OutputCreateCustomerDTO } from "../create/create.customer.dto";
import { InputUpdateCustomerDTO } from "./update.customer.dto";

export default class UpdateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputUpdateCustomerDTO): Promise<OutputCreateCustomerDTO> {
    const customer = await this.customerRepository.find(input.id);

    customer.changeName(input.name);
    customer.changeAddress(new Address(input.address.street, input.address.number, input.address.zip, input.address.city));

    await this.customerRepository.update(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zipcode,
        city: customer.address.city,
      }
    };
  }
}