import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/enitty/value-object/id.value-object";
import ClientRepository from "./client.repository";

describe("Client repository unit test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const repository = new ClientRepository();

    const client = new Client({
      id: new Id("1"),
      name: "client 1",
      email: "email@client.com",
      address: "address client"
    });

    repository.add(client)

    const foundModel =  await ClientModel.findOne({where: {id: client.id.id}})

    expect(foundModel.id).toBe(client.id.id)
    expect(foundModel.name).toBe(client.name)
    expect(foundModel.email).toBe(client.email)
    expect(foundModel.address).toBe(client.address)
  });
});