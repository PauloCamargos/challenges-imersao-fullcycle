import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ClientGateway from "../../gateway/client.gateway";
import { FindClientInputDTO, FindClientOutputDTO } from "./find-client.usecase.dto";

export default class FindClientUseCase implements UseCaseInterface {
  private _repository: ClientGateway

  constructor(repository: ClientGateway) {
    this._repository = repository
  }

  async execute(input: FindClientInputDTO): Promise<FindClientOutputDTO> {
    const client = await this._repository.find(input.id)
    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
    }
  }
}