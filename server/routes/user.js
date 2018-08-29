const userController = require('./../controllers/user_controller');

module.exports = (router) => {
	/** Get User **/
	router
	.route('/user/:id')
	.get(userController.getUser);

	/** Get User Profile **/
	router
	.route('/user/profile/:id')
	.get(userController.getUserProfile);

	/** Create User **/
	router
	.route('/user')
	.post(userController.addUser);

	/** Follow User **/
	router
	.route('/user/follow')
	.post(userController.followUser);
}