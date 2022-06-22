import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer("123", "John Doe");
const address = new Address("Av. Neverland", 2, "1234-4312", "The citadel");

customer.setAddress(address);
customer.activate();

const item1 = new OrderItem("1", "Item 1", 14);
const item2 = new OrderItem("2", "Item 2", 16);

const order = new Order("1", "123", [item1, item2]);
