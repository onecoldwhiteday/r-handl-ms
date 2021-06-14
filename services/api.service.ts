import {Service, ServiceBroker} from "moleculer";
import ApiGateway from "moleculer-web";

export default class ApiService extends Service {

	public constructor(broker: ServiceBroker) {
		super(broker);
		// @ts-ignore
		this.parseServiceSchema({
			name: "api",
			mixins: [ApiGateway],
			settings: {
				port: process.env.HTTP_PORT || 8080,
				routes: [{
					path: "/",
					aliases: {
						"POST /": this.handleInput,
					},
					cors: {
						origin: ["*"],
						methods: ["POST"]
					},
					onError: this.errorHandler,
					authentication: false,
					authorization: false,
					callingOptions: {},
					bodyParsers: {
						json: {
							strict: false,
							limit: "1MB",
						},
						urlencoded: {
							extended: true,
							limit: "1MB",
						},
					},
					logging: true,
				}],
				log4XXResponses: false,
				logRequestParams: null,
				logResponseData: null,
			},
		});
	}

	public async handleInput(req: any, res: any) {
		res.statusCode = 200;
		res.end();
		try {
			await this.broker.call("publisher.initMessage", req.body);
		} catch (e) {
			this.errorHandler(req, res, e);
		}
	}

	public errorHandler(req: any, res: any, err: any) {
		this.logger.error(`[${err.code}]: ${err.type}`);

		// Prepare readable errors text
		const error = err.data?.length ? err.data.map((e: any) => e.message) : [];
		error.forEach((e: any) => this.logger.error(e));

		// Send error
		res.statusCose = err.code || 500;
		res.end(`${err.code}: ${err.type}. ${JSON.stringify(error, null, 2)}`);
	}
}
