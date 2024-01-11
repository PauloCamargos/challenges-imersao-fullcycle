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
            document: "000",
            street: "some address",
            number: "1",
            complement: "",
            city: "some city",
            state: "some state",
            zipCode: "000",
        });

        repository.add(client);

        const foundModel = await ClientModel.findOne({ where: { id: client.id.id } });

        expect(foundModel.id).toBe(client.id.id);
        expect(foundModel.name).toBe(client.name);
        expect(foundModel.email).toBe(client.email);
        expect(foundModel.document).toBe(client.document);
        expect(foundModel.street).toBe(client.street);
        expect(foundModel.number).toBe(client.number);
        expect(foundModel.complement).toBe(client.complement);
        expect(foundModel.city).toBe(client.city);
        expect(foundModel.state).toBe(client.state);
        expect(foundModel.zipCode).toBe(client.zipCode);
        expect(foundModel.createdAt).toEqual(client.createdAt);
        expect(foundModel.updatedAt).toEqual(client.updatedAt);
    });

    it("should find a client", async () => {
        const repository = new ClientRepository();

        const client = await ClientModel.create({
            id: "1",
            name: "client 1",
            email: "email@client.com",
            document: "000",
            street: "some address",
            number: "1",
            complement: "",
            city: "some city",
            state: "some state",
            zipCode: "000",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const foundModel = await repository.find(client.id);

        expect(foundModel.id.id).toBe(client.id);
        expect(foundModel.name).toBe(client.name);
        expect(foundModel.email).toBe(client.email);
        expect(foundModel.document).toBe(client.document);
        expect(foundModel.street).toBe(client.street);
        expect(foundModel.number).toBe(client.number);
        expect(foundModel.complement).toBe(client.complement);
        expect(foundModel.city).toBe(client.city);
        expect(foundModel.state).toBe(client.state);
        expect(foundModel.zipCode).toBe(client.zipCode);
        expect(foundModel.createdAt).toStrictEqual(client.createdAt);
        expect(foundModel.updatedAt).toStrictEqual(client.updatedAt);
    });
});
