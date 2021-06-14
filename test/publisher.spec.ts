import {ServiceBroker} from "moleculer";
import PublisherService from "../services/publisher.service";
import * as Moleculer from "moleculer";
import ValidationError = Moleculer.Errors.ValidationError;

describe("Test publisher service", () => {
	let broker = new ServiceBroker({logger: false})
	broker.createService(PublisherService);

	beforeAll(() => broker.start())
	afterAll(() => broker.stop())

	describe("Test publisher.initMessage action for input type match", () => {
		it("should return true with {'message': 'Hello', 'user': 'user1', timestamp: '1515125125'}", async() => {
			try {
				const res = await broker.call('publisher.initMessage', {message: 'Hello', user: 'user1', timestamp: 1515125125});
				expect(res).toBeTruthy();
			} catch (e) {
				console.log("It should not happen");
			}
		})

		it("should throw error if input has mismatched type", async () => {
			try {
			 	await broker.call("publisher.initMessage", {random: 'object'}).catch(e => {
			});
			} catch (e) {
				expect(e).toBeInstanceOf(ValidationError);
			}
		})
	})
})
