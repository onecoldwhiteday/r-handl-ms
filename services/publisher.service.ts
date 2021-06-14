import Moleculer, {Context, Service, ServiceBroker} from "moleculer";
import {IMessage} from "../types/message.type";
import ValidationError = Moleculer.Errors.ValidationError;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const amqpMixin = require("moleculer-amqp");

// Web service
export default class PublisherService extends Service {

	public constructor(broker: ServiceBroker) {
		super(broker);
		// @ts-ignore
		this.parseServiceSchema({
			name: "publisher",
			mixins: [amqpMixin("amqp://localhost")],
			actions: {
				initMessage: {
					rest: "POST /",
					headers: {
						"Content-Type": "application/json"
					},
					params: {
						user: {type: "string", optional: false},
						message: {type: "string", optional: false},
						timestamp: {type: "number", optional: false}
					},
					handler(ctx: Context<any, any>) {
						const time = new Date(ctx.params.timestamp).toLocaleTimeString();
						this.sendToQueue("users", ctx.params, {persistent: true});
						this.logger.info(`Pushed message to queue: ${time}`);
						return true;
					}
				}
			},
		});
	}
}
