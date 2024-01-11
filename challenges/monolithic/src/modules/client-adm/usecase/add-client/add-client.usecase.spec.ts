import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    };
};

describe("Add client use case unit tests", () => {
    it("should add a client", async () => {
        const repository = MockRepository();
        const useCase = new AddClientUseCase(repository);

        const input = {
            name: "client 1",
            email: "client@client.com",
            document: "000",
            street: "some address",
            number: "1",
            complement: "",
            city: "some city",
            state: "some state",
            zipCode: "000",
        };

        const result = await useCase.execute(input);

        expect(repository.add).toHaveBeenCalled();

        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.email).toBe(input.email);
        expect(result.document).toBe(input.document);
        expect(result.street).toBe(input.street);
        expect(result.number).toBe(input.number);
        expect(result.complement).toBe(input.complement);
        expect(result.city).toBe(input.city);
        expect(result.state).toBe(input.state);
        expect(result.zipCode).toBe(input.zipCode);
    });
});
