export interface PaymentInputDTO {
     orderId: string;
     amount: number;
}

export interface PaymentOutputDTO {
     transactionId: string;
     orderId: string;
     amount: number;
     status: string;
     createdAt: Date;
     updatedAt: Date;
}

export default interface PaymentFacadeInterface {
     process(input: PaymentInputDTO): Promise<PaymentOutputDTO>;
}
