const adminRoutes = require('./admin.routes.js');
const articleRoutes = require('./article.routes.js');

module.exports = [].concat(adminRoutes, articleRoutes);
