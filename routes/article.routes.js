const { getAllArticles, getArticleById } = require('../handlers/article.handler');

module.exports = [
	{
		method: 'GET',
		path: '/articles',
		handler: getAllArticles,
		options: {
			auth: false,
		},
	},
	{
		method: 'GET',
		path: '/articles/{id}',
		handler: getArticleById,
		options: {
			auth: false,
		},
	},
];
