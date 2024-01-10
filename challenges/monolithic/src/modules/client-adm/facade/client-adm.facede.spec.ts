import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";


describe("ClientAdm facade unit test", () => {
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
    const clientAdmFacade = ClientAdmFacadeFactory.create();

    const clientInput = {
      id: "1",
      name: "John",
      email: "johndoe@email.com",
      address: "Av. Chocolateland, 156"
    }

    await clientAdmFacade.add(clientInput);
    const foundClient = await ClientModel.findOne({
      where: {
        id: clientInput.id
      }
    })

    expect(foundClient).toBeDefined();
    expect(foundClient.id).toBe(clientInput.id);
    expect(foundClient.name).toBe(clientInput.name);
    expect(foundClient.email).toBe(clientInput.email);
    expect(foundClient.address).toBe(clientInput.address);

  });

  it("should find a client", async () => {
    const clientAdmFacade = ClientAdmFacadeFactory.create();

    const clientInput = {
      id: "1",
      name: "John",
      email: "johndoe@email.com",
      address: "Av. Chocolateland, 156"
    }

    await clientAdmFacade.add(clientInput);
    const foundClient = await clientAdmFacade.find({id: clientInput.id})

    expect(foundClient).toBeDefined();
    expect(foundClient.id).toBe(clientInput.id);
    expect(foundClient.name).toBe(clientInput.name);
    expect(foundClient.email).toBe(clientInput.email);
    expect(foundClient.address).toBe(clientInput.address);


  });

});
