import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
}

describe("Add client use case unit tests", () => {
  it("should add a client", async () => {
    const repository = MockRepository();
    const useCase = new AddClientUseCase(repository);

    const input = {
      name: "client 1",
      email: "client@client.com",
      address: "Address 1",
    }

    const result = await useCase.execute(input)

    expect(repository.add).toHaveBeenCalled()

    expect(result.id).toBeDefined()
    expect(result.name).toBe(input.name)
    expect(result.email).toBe(input.email)
    expect(result.address).toBe(input.address)
  });
});