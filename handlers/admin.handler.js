const bcrypt = require('bcrypt');
const pool = require('../connections/db_connection');

const admin_register = async (request, h) => {
	// Generate hash
	// Just return back the data for testing
	try {
		const { username, password } = request.payload;

		// hash
		const hashedPassword = await bcrypt.hash(password, 10);

		return h
			.response({
				statusCode: 200,
				message: 'register success',
				data: {
					username: username,
					password: hashedPassword,
				},
			})
			.code(200);
	} catch (error) {
		console.log(error);
		return h
			.response({
				statusCode: 500,
				message: '',
			})
			.code(500);
	}
};

const admin_login = async (request, h) => {
	return;
};

module.exports = {
	admin_login,
	admin_register,
};
