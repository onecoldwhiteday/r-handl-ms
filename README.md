[![Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)

# r-handl-ms
This is a [Moleculer](https://moleculer.services/)-based microservices project. Generated with the [Moleculer CLI](https://moleculer.services/docs/0.14/moleculer-cli.html).

## Usage
1) Instal dependencies: `npm install`
2) Start the project: `npm start` 

## Tests
Run tests: `npm test`


## Services
- **api**: API Gateway service
- **publisher**: Gets message from API Gateway and puts it in RabbitMQ queue
- **consumer**: Takes messages by turn from queue and print them to console with timeout which equals message.length in seconds
