import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterfae from "../../../domain/customer/repository/customer_repository.interface";
import { InputListCustomerDTO, OutputListCustomerDTO } from "./list.customer.dto";

export default class ListCustomerUseCase {
  private customerRepository: CustomerRepositoryInterfae;

  constructor(customerRepository: CustomerRepositoryInterfae) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputListCustomerDTO): Promise<OutputListCustomerDTO> {
    const customers = await this.customerRepository.findAll();
    return OutputMapper.toOutput(customers);
  }
}

class OutputMapper {
  static toOutput(customers: Customer[]): OutputListCustomerDTO {
    return {
      customers: customers.map(
        customer => (
          {
            id: customer.id,
            name: customer.name,
            address: {
              street: customer.address.street,
              number: customer.address.number,
              zip: customer.address.zipcode,
              city: customer.address.city,
            }
          }
        )
      )
    };
  }
}