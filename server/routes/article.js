const articleController = require('../controllers/article_controller');
const multipart = require('connect-multipart');
const multipartWare = multipart();

module.exports = (router) => {
	
	/** Index **/
	router
	.route('/articles')
	.get(articleController.getAll);

	/** Create **/
	router
	.route('/article')
	.post(multipartWare, articleController.addArticle);

	/** Comment **/
	router
	.route('/article/comment')
	.post(articleController.commentArticle);

	/** Show **/
	router
	.route('/article/:id')
	.get(articleController.getArticle);
}