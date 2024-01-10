import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import ClientAdmFacadeInterface, { AddClientFacadeInputDTO, FindClientFacadeInputDTO, FindClientFacadeOutputDTO } from "./client-adm.facade.interface";

export interface ClientAdmUseCaseProps {
     addClientUseCase: UseCaseInterface;
     findClientUseCase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
     private _addClientUseCase: UseCaseInterface;
     private _findClientUseCase: UseCaseInterface;

     constructor(props: ClientAdmUseCaseProps) {
          this._addClientUseCase = props.addClientUseCase;
          this._findClientUseCase = props.findClientUseCase;
     }

     async add(input: AddClientFacadeInputDTO): Promise<void> {
          this._addClientUseCase.execute(input);
     }
     async find(input: FindClientFacadeInputDTO): Promise<FindClientFacadeOutputDTO> {
          return await this._findClientUseCase.execute(input);
     }

}
