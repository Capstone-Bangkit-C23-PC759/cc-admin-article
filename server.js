require('dotenv').config();
const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const jwt = require('@hapi/jwt');

const init = async () => {
	const server = Hapi.server({
		port: process.env.PORT || 3000,
		host: 'localhost',
		routes: {
			cors: true,
		},
	});

	// Register jwt with the server
	await server.register(jwt);

	// Declare an authentication strategy using the jwt scheme.
	server.auth.strategy('jwt', 'jwt', {
		keys: process.env.JWT_SECRET,
		verify: {
			aud: 'urn:audience:test',
			iss: 'urn:issuer:test',
			sub: false,
			nbf: true,
			exp: true,
			maxAgeSec: 14400, // 4 hours
			timeSkewSec: 15,
		},
		validate: (artifacts, request, h) => {
			return {
				isValid: true,
				credentials: { user: artifacts.decoded.payload.user },
			};
		},
	});

	// Set the strategy
	server.auth.default('jwt');

	// Set the server routes
	server.route(routes);

	// Start the server
	await server.start();
	console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

init();
