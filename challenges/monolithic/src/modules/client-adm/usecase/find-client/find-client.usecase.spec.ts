import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
    name: "client 1",
    email: "client@client.com",
    document: "000",
    street: "some address",
    number: "1",
    complement: "",
    city: "some city",
    state: "some state",
    zipCode: "000",
});

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(client),
        add: jest.fn()
    };
};

describe("Find client use case unit test", () => {
    it("should find a client", async () => {
        const repository = MockRepository();
        const useCase = new FindClientUseCase(repository);

        const input = {
            id: client.id.id
        };

        const output = await useCase.execute(input);
        expect(repository.find).toHaveBeenCalled();

        expect(output.id).toBe(client.id.id);
        expect(output.name).toBe(client.name);
        expect(output.email).toBe(client.email);
        expect(output.document).toBe(client.document);
        expect(output.street).toBe(client.street);
        expect(output.number).toBe(client.number);
        expect(output.complement).toBe(client.complement);
        expect(output.city).toBe(client.city);
        expect(output.state).toBe(client.state);
        expect(output.zipCode).toBe(client.zipCode);

    });
});
