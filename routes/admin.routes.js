const Joi = require('joi');
const { admin_login, admin_register } = require('../handlers/admin.handler');

module.exports = [
	{
		method: 'POST',
		path: '/admin-register',
		handler: admin_register,
		options: {
			validate: {
				payload: Joi.object({
					username: Joi.string().required(),
					password: Joi.string().min(8).required(),
				}),
			},
			auth: false,
		},
	},
	{
		method: 'POST',
		path: '/admin-login',
		handler: admin_login,
		options: {
			validate: {
				payload: Joi.object({
					username: Joi.string().required(),
					password: Joi.string().required(),
				}),
			},
			auth: false,
		},
	},
];
