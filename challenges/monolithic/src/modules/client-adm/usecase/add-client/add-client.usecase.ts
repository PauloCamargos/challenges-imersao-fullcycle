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
      name: input.name,
      email: input.email,
      address: input.address
    };

    const client = new Client(props);
    await this._repository.add(client);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }

}