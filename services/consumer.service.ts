"use strict";

import {Service, ServiceBroker} from "moleculer";
import {IMessage} from "../types/message.type";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const amqpMixin = require("moleculer-amqp");

export default class ConsumerService extends Service {

	public constructor(public broker: ServiceBroker) {
		super(broker);
		this.parseServiceSchema({
			name: "consumer",
			mixins: [amqpMixin("amqp://localhost")],
			queues: {
				users: {
					params: {
						user: "string",
						message: "string",
						timestamp: "number"
					},
					handler: this.printMessage
				}
			}
		});
	}

	public async printMessage({user, message, timestamp}: IMessage) {
		const time = new Date(timestamp).toLocaleTimeString();

		this.logger.info(`Received job with timestamp: ${time}`);
		return new Promise((resolve: any) => {
			setTimeout(
				 () => resolve(console.log("\x1b[36m%s\x1b[0m", `[${time}][${user}]: ${message}`,)),
				message.length * 1e3);
		});
	}
}
