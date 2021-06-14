"use strict";

import {Service, ServiceBroker} from "moleculer";
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
					async handler({user, message, timestamp}: { user: string; message: string; timestamp: number }) {
						this.logger.info(`Received job with timestamp: ${timestamp}`);
						return new Promise((resolve: any) => {
							setTimeout(() => {
							this.logger.info(`Processed job with timestamp: ${timestamp}`);
							const time = new Date(timestamp).toLocaleString()
							return resolve(this.logger.info(`[${time}][${user}]: ${message}`));}, message.length * 1e3);
						});
					}
				}
			}
		});
	}

	public async printMessage(payload: any) {
		this.logger.info("Message received from queue");
		const {user, message, timestamp} = payload;
		const date = new Date(timestamp).toLocaleTimeString();
		await setTimeout(() => this.logger.info(`[${date}][${user}]: ${message}`), payload.message.length * 1e3);
	}
}
