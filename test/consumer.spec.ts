import {ServiceBroker} from "moleculer";
import ConsumerService from "../services/consumer.service";

describe("Test consumer service", () => {
	let broker = new ServiceBroker({logger: false})
	let service = broker.createService(ConsumerService);

	beforeAll(() => broker.start())
	afterAll(() => broker.stop())

	describe("Test consumer.printMessage action", () => {
		it("should print with proper timeout",  () => {
			jest.useFakeTimers();
			try {
				const payload = {user: "user1", message: "some text", timestamp: 12312415415};
				service.printMessage({user: "user1", message: "some text", timestamp: 12312415415});
				expect(setTimeout).toHaveBeenCalledTimes(1);
				expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), payload.message.length * 1e3);
			} catch (e) {
				console.log(e);
			}
		})
	});

})
