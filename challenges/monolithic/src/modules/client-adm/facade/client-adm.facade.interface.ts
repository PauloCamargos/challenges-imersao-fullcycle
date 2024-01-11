export interface AddClientFacadeInputDTO {
    id?: string;
    name: string;
    email: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
}

export interface FindClientFacadeInputDTO {
    id: string;
}

export interface FindClientFacadeOutputDTO {
    id: string;
    name: string;
    email: string;
    address: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
}

export default interface ClientAdmFacadeInterface {
    add(input: AddClientFacadeInputDTO): Promise<void>;
    find(input: FindClientFacadeInputDTO): Promise<FindClientFacadeOutputDTO>;
}
