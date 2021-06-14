"use strict";
import {BrokerOptions, Errors, MetricRegistry, ServiceBroker} from "moleculer";

const brokerConfig: BrokerOptions = {
	namespace: "r-handl-ms",
	nodeID: "node-" + process.pid,
	metadata: {},
	logger: {
		type: "Console",
		options: {
			colors: true,
			moduleColors: true,
			formatter: "full",
			objectPrinter: null,
			autoPadding: true,
		},
	},
	logLevel: "info",
	transporter: "AMQP",
	serializer: "JSON",
	requestTimeout: 10 * 1000,
	retryPolicy: {
		enabled: true,
		retries: 5,
		delay: 100,
		maxDelay: 1000,
		factor: 2,
		check: (err: Errors.MoleculerError) => err && !!err.retryable,
	},
	maxCallLevel: 100,
	heartbeatInterval: 10,
	heartbeatTimeout: 30,
	tracking: {
		enabled: true,
		shutdownTimeout: 5000,
	},
	disableBalancer: false,
	registry: {
		strategy: "RoundRobin",
		preferLocal: true,
	},
	bulkhead: {
		enabled: true,
		concurrency: 10,
		maxQueueSize: 100,
	},
	validator: "Fastest",
	errorHandler: null,
	middlewares: [],
};

export = brokerConfig;
