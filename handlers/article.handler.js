const pool = require('../connections/db_connection');

const getAllArticles = async (request, h) => {
	try {
		const connection = await pool.getConnection();
		const sql = 'SELECT * FROM articles';
		const [rows] = await connection.query(sql);

		connection.release();

		const response = h
			.response({
				statusCode: 200,
				message: 'success',
				articles: rows,
			})
			.code(200);

		return response;
	} catch (error) {
		console.log(error);
		return h
			.response({
				statusCode: 500,
				message: 'Internal server error,',
			})
			.code(500);
	}
};

const getArticleById = async (request, h) => {
	const article_id = request.params.id;
	try {
		const connection = await pool.getConnection();
		const sql = `SELECT * FROM articles WHERE idarticles='${article_id}'`;
		const [rows] = await connection.query(sql);

		connection.release();

		if (rows.length > 0) {
			const response = h
				.response({
					statusCode: 200,
					message: 'success',
					articles: rows,
				})
				.code(200);
			return response;
		} else {
			const response = h
				.response({
					statusCode: 404,
					message: 'Article not found.',
				})
				.code(404);
			return response;
		}
	} catch (error) {
		console.log(error);
		return h
			.response({
				statusCode: 500,
				message: 'Internal server error,',
			})
			.code(500);
	}
};
module.exports = { getAllArticles, getArticleById };
