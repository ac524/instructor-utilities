const AuthController = require("./definitions/AuthController");
const AppController = require("./definitions/AppController");
const AppTypeController = require("./definitions/AppTypeController");
const FeedController = require("./definitions/FeedController");
const FeedEntryController = require("./definitions/FeedEntryController");
const InviteController = require("./definitions/InviteController");
const RegisterController = require("./definitions/RegisterController");
const RoomController = require("./definitions/RoomController");
const StudentController = require("./definitions/StudentController");
const TokenController = require("./definitions/TokenController");
const UserController = require("./definitions/UserController");
const ValidateEmailController = require("./definitions/ValidateEmailController");
const library = require("./types/library.js");

new AppController();

new AppTypeController();

new AuthController();

new FeedController();

new FeedEntryController("comment");

new FeedEntryController("elevate");

new FeedEntryController("deelevate");

new InviteController();

new RegisterController();

new RoomController();

new StudentController();

new TokenController();

new UserController();

new ValidateEmailController();

module.exports = library;
