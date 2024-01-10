import Id from "../../@shared/domain/enitty/value-object/id.value-object";
import Product from "../domain/product.entity";
import PlaceOrderUseCase from "./place-order.usecase";
import { PlaceOrderInputDto } from "./place-order.usecase.dto";

const mockDate = new Date(2000, 1, 1);


describe("PlaceOrderUseCase unit test", () => {
    describe("validateProducts methods", () => {
        //@ts-expect-error - no params in constructor
        const placeOrderUseCase = new PlaceOrderUseCase();

        it("should throw and error if no products are selected", async () => {
            const input: PlaceOrderInputDto = {
                clientId: "0",
                products: [],
            };

            await expect(
                placeOrderUseCase["validateProducts"](input)
            ).rejects.toThrow(new Error("No products selected"));
        });

        it("should throw an error when product is out of stock", async () => {
            const mockProductFacade = {
                checkStock: jest.fn(({ productId }: { productId: string; }) =>
                    Promise.resolve({
                        productId,
                        stock: productId === "1" ? 0 : 1
                    }),
                )
            };

            //@ts-expect-error - foce set productFacade
            placeOrderUseCase["_productFacade"] = mockProductFacade;

            let input: PlaceOrderInputDto = {
                clientId: "0",
                products: [{ productId: "1" }]
            };

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(
                new Error("Product 1 is not available in stock")
            );

            input = {
                clientId: "0",
                products: [{ productId: "0" }, { productId: "1" }]
            };

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(
                new Error("Product 1 is not available in stock")
            );
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);

            input = {
                clientId: "0",
                products: [{ productId: "0" }, { productId: "1" }, { productId: "2" }]
            };

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(
                new Error("Product 1 is not available in stock")
            );
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(5);

        });
    });

    describe("getProducts method", () => {
        beforeAll(() => {
            jest.useFakeTimers();
            jest.setSystemTime(mockDate);
        });

        afterAll(() => {
            jest.useRealTimers();
        });

        // @ts-expect-error - no params in constructor
        const placeOrderUseCase = new PlaceOrderUseCase();

        it("should throw an error when product not found", async () => {
            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue(null)
            };

            // @ts-expect-error - force set calatogFacade
            placeOrderUseCase["_catalogFacade"] = mockCatalogFacade;

            await expect(placeOrderUseCase["getProduct"]("0")).rejects.toThrow(
                new Error("Product not found")
            );
        });

        it("should return a product", async () => {
            let productProps = {
                id: "0",
                name: "product 0",
                description: "some description",
                salesPrice: 0,
            };
            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue(productProps)
            };

            // @ts-expect-error - force set calatogFacade
            placeOrderUseCase["_catalogFacade"] = mockCatalogFacade;

            await expect(placeOrderUseCase["getProduct"]("0")).resolves.toEqual(
                new Product({
                    id: new Id(productProps.id),
                    name: productProps.name,
                    description: productProps.description,
                    salesPrice: productProps.salesPrice,
                })
            );
            expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1);
        });


    });

    describe("execute method", () => {
        beforeAll(() => {
            jest.useFakeTimers();
            jest.setSystemTime(mockDate);
        });

        afterAll(() => {
            jest.useRealTimers();
        });

        it("should throw an error when client not found", async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(null),
            };
            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase();
            //@ts-expect-error - force set clientFacade
            placeOrderUseCase["_clientFacade"] = mockClientFacade;

            const input: PlaceOrderInputDto = {
                clientId: "0",
                products: []
            };
            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
                new Error("Client not found")
            );
        });

        it("should throw an error when products are not valid", async () => {
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(true),
            };
            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase();

            const mockValidProducts = jest
                // @ts-expect-error - spy on private method
                .spyOn(placeOrderUseCase, "validateProducts")
                // @ts-expect-error - not return never
                .mockRejectedValue(new Error("No products selected"));

            //@ts-expect-error - force set clientFacade
            placeOrderUseCase["_clientFacade"] = mockClientFacade;

            const input: PlaceOrderInputDto = { clientId: "1", products: [] };

            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
                new Error("No products selected")
            );

            expect(mockValidProducts).toHaveBeenCalledTimes(1);
        });

        describe("place an order", () => {
            const clientProps = {
                id: "1c",
                name: "Client 0",
                document: "000",
                email: "client@user.com",
                street: "some address",
                number: "1",
                complement: "",
                city: "some city",
                state: "some state",
                zipCode: "000",
            };

            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(clientProps),
            };

            const mockPaymentFacade = {
                process: jest.fn(),
            };

            const mockCheckoutRepo = {
                addOrder: jest.fn(),
            };

            const mockInvoiceFacade = {
                create: jest.fn().mockResolvedValue({ id: "1i" })
            };

            const placeOrderUseCase = new PlaceOrderUseCase(
                mockClientFacade,
                null,
                null,
                mockCheckoutRepo,
                mockInvoiceFacade,
                mockPaymentFacade,
            );

            const products = {
                "1": new Product({
                    id: new Id("1"),
                    name: "product 1",
                    description: "product description 1",
                    salesPrice: 100,
                }),
                "2": new Product({
                    id: new Id("2"),
                    name: "product 2",
                    description: "product descriptio 2",
                    salesPrice: 100,
                }),
            };

            const mockValidateProducts = jest
                //@ts-expect-error - spy on private method
                .spyOn(placeOrderUseCase, "validateProducts")
                // @ts-expect-error - spy on private method
                .mockResolvedValue(null);

            const mockGetProduct = jest
                //@ts-expect-error - spy on private method
                .spyOn(placeOrderUseCase, "getProduct")
                // @ts-expect-error - spy on private method
                .mockImplementation((productId: keyof typeof products) => {
                    return products[productId];
                });

            it("should not be approved", async () => {
                mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
                    transactionId: "it",
                    orderId: "1o",
                    amount: 100,
                    status: "error",
                    createAt: new Date(),
                    updatedAt: new Date()
                });

                const input: PlaceOrderInputDto = {
                    clientId: "1c",
                    products: [{ productId: "1" }, { productId: "2" }],
                };

                let output = await placeOrderUseCase.execute(input);

                expect(output.invoiceId).toBeNull();
                expect(output.total).toBe(70);
                expect(output.products).toStrictEqual([
                    { product: "1" },
                    { product: "2" },
                ]);

                expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
                expect(mockClientFacade.find).toHaveBeenCalledWith({ id: "1c" });

                expect(mockValidateProducts).toHaveBeenCalledTimes(1);
                expect(mockValidateProducts).toHaveBeenCalledWith(input);

                expect(mockGetProduct).toHaveBeenCalledTimes(2);

                expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(1);

                expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
                expect(mockPaymentFacade.process).toHaveBeenCalledWith({
                    orderId: output.id,
                    amount: output.total,
                });

                expect(mockInvoiceFacade.create).toHaveBeenCalledTimes(0);

            });
        });
    });
});
