
const FeedEntryController = require("./definitions/FeedEntryController");
const AppController = require("./definitions/AppController");
const AppTypeController = require('./definitions/AppTypeController');
const AuthController = require("./definitions/AuthController");
const FeedController = require("./definitions/FeedController");
const InviteController = require("./definitions/InviteController");
const RegisterController = require("./definitions/RegisterController");
const RoomController = require('./definitions/RoomController');
const StudentController = require("./definitions/StudentController");
const TokenController = require("./definitions/TokenController");
const UserController = require("./definitions/UserController");
const ValidateEmailController = require("./definitions/ValidateEmailController");

module.exports = {
	appCtrl: new AppController(),

	appTypeCtrl: new AppTypeController(),

	authCtrl: new AuthController(),

	feedCtrl: new FeedController(),

	feedCommentCtrl: new FeedEntryController("comment"),
	feedElevateCtrl: new FeedEntryController("elevate"),
	feedDeelevateCtrl: new FeedEntryController("deelevate"),

	inviteCtrl: new InviteController(),

	registerCtrl: new RegisterController(),

	roomCtrl: new RoomController(),

	studentCtrl: new StudentController(),

	tokenCtrl: new TokenController(),

	userCtrl: new UserController(),

	validateEmailCtrl: new ValidateEmailController()
};