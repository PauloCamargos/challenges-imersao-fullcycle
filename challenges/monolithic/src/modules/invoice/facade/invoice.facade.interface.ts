export interface FindInvoiceInputDTO {
     id: string;
}

export interface FindInvoiceOutputDTO {
     id: string;
     name: string;
     document: string;
     address: {
          street: string;
          number: string;
          complement: string;
          city: string;
          state: string;
          zipCode: string;
     };
     items: {
          id: string;
          name: string;
          price: number;
     }[];
     total: number;
     createdAt: Date;
}

export interface GenerateInvoiceInputDto {
     name: string;
     document: string;
     street: string;
     number: string;
     complement: string;
     city: string;
     state: string;
     zipCode: string;
     items: {
          id: string;
          name: string;
          price: number;
     }[];
}

export interface GenerateInvoiceOutputDto {
     id: string;
     name: string;
     document: string;
     street: string;
     number: string;
     complement: string;
     city: string;
     state: string;
     zipCode: string;
     items: {
          id: string;
          name: string;
          price: number;
     }[];
     total: number;
}


export default interface InvoiceFacadeInterface {
     generate(input: GenerateInvoiceInputDto): Promise<GenerateInvoiceOutputDto>
     find(input: FindInvoiceInputDTO): Promise<FindInvoiceOutputDTO>
}
