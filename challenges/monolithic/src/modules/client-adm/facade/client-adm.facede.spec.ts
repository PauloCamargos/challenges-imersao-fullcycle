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
            document: "000",
            street: "some address",
            number: "1",
            complement: "",
            city: "some city",
            state: "some state",
            zipCode: "000",
        };

        await clientAdmFacade.add(clientInput);
        const foundClient = await ClientModel.findOne({
            where: {
                id: clientInput.id
            }
        });

        expect(foundClient).toBeDefined();
        expect(foundClient.id).toBe(clientInput.id);
        expect(foundClient.name).toBe(clientInput.name);
        expect(foundClient.email).toBe(clientInput.email);
        expect(foundClient.document).toBe(clientInput.document);
        expect(foundClient.street).toBe(clientInput.street);
        expect(foundClient.number).toBe(clientInput.number);
        expect(foundClient.complement).toBe(clientInput.complement);
        expect(foundClient.city).toBe(clientInput.city);
        expect(foundClient.state).toBe(clientInput.state);
        expect(foundClient.zipCode).toBe(clientInput.zipCode);
        

    });

    it("should find a client", async () => {
        const clientAdmFacade = ClientAdmFacadeFactory.create();

        const clientInput = {
            id: "1",
            name: "John",
            email: "johndoe@email.com",
            document: "000",
            street: "some address",
            number: "1",
            complement: "",
            city: "some city",
            state: "some state",
            zipCode: "000",
        };

        await clientAdmFacade.add(clientInput);
        const foundClient = await clientAdmFacade.find({ id: clientInput.id });

        expect(foundClient).toBeDefined();
        expect(foundClient.id).toBe(clientInput.id);
        expect(foundClient.name).toBe(clientInput.name);
        expect(foundClient.email).toBe(clientInput.email);
        expect(foundClient.document).toBe(clientInput.document);
        expect(foundClient.street).toBe(clientInput.street);
        expect(foundClient.number).toBe(clientInput.number);
        expect(foundClient.complement).toBe(clientInput.complement);
        expect(foundClient.city).toBe(clientInput.city);
        expect(foundClient.state).toBe(clientInput.state);
        expect(foundClient.zipCode).toBe(clientInput.zipCode);


    });

});
