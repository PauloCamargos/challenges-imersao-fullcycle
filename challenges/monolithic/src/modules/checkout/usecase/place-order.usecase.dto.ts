export interface PlaceOrderInputDto {
     clientId: string;
     products: {
          productId: string;
     }[];
}

export interface PlaceOrderOutputTto {
     id: string;
     invoiceId: string;
     status: string;
     total: number;
     products: {
          productId: string;
     }[];
}
