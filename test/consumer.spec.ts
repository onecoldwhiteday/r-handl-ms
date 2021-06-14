import {ServiceBroker} from "moleculer";
import ConsumerService from "../services/consumer.service";

describe("Test consumer service", () => {
	let broker = new ServiceBroker({logger: false})
	broker.createService(ConsumerService);

})
