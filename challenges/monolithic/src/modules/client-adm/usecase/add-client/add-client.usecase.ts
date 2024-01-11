import Id from "../../../@shared/domain/enitty/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDTO, AddClientOutputDTO } from "./add-client.usecase.dto";

export default class AddClientUseCase implements UseCaseInterface {
    private _repository: ClientGateway;

    constructor(repository: ClientGateway) {
        this._repository = repository;
    }
    async execute(input: AddClientInputDTO): Promise<AddClientOutputDTO> {
        const props = {
            id: new Id(input.id),
            name: input.name,
            email: input.email,
            document: input.document,
            street: input.street,
            number: input.number,
            complement: input.complement,
            city: input.city,
            state: input.state,
            zipCode: input.zipCode,
        };

        const client = new Client(props);
        await this._repository.add(client);

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            document: client.document,
            street: client.street,
            number: client.number,
            complement: client.complement,
            city: client.city,
            state: client.state,
            zipCode: client.zipCode,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        };
    }

}
