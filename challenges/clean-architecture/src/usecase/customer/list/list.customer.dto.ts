export interface  InputListCustomerDTO {}

type CustomerListItemDTO = {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    zip: string;
    city: string;
  }
}

export interface OutputListCustomerDTO {
  customers: CustomerListItemDTO[]
}