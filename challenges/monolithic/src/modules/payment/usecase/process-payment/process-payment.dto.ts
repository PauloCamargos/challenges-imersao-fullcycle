export interface ProcessPyamenInputtDTO {
     orderId: string;
     amount: number;
}

export interface ProcessPyamentOutputDTO {
     transactionId: string;
     orderId: string;
     amount: number;
     status: string;
     createdAt: Date;
     updatedAt: Date;
}
