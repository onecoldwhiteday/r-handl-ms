import {ServiceBroker} from "moleculer";
import PublisherService from "../services/publisher.service";
import * as Moleculer from "moleculer";
import ValidationError = Moleculer.Errors.ValidationError;
import {IMessage} from "../types/message.type";

describe("Test publisher service", () => {
	let broker = new ServiceBroker({logger: false})
	broker.createService(PublisherService);

	beforeAll(() => broker.start())
	afterAll(() => broker.stop())

	describe("Test publisher.initMessage action for input type match", () => {
		it("should return true with {'message': 'Hello', 'user': 'user1', timestamp: '1515125125'}", async() => {
			try {
				const input = {message: 'Hello', user: 'user1', timestamp: 1515125125}
				const res = await broker.call('publisher.initMessage', input);
				expect(input).toBeInstanceOf(IMessage);
				expect(res).toBeTruthy();
			} catch (e) {
				console.log("It should not happen");
			}
		})

		it("should throw error if input has mismatched type", async () => {
			try {
				const input = { random: "object" };
				expect(input).not.toBeInstanceOf(IMessage);
			 	await broker.call("publisher.initMessage", input)
			} catch (e) {
				expect(e).toBeInstanceOf(ValidationError);
			}
		})
	})
})
