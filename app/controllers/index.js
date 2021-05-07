const ctrls = require("./types/library");
const FeedEntryController = require("./definitions/FeedEntryController");

const createController = registry =>

    Array.isArray(registry)

        ? new registry[0](...registry[1])

        : new registry();

[
    require("./definitions/AuthController"),
    require("./definitions/AppController"),
    require("./definitions/AppTypeController"),
    require("./definitions/FeedController"),
    [FeedEntryController,["comment"]],
    [FeedEntryController,["elevate"]],
    [FeedEntryController,["deelevate"]],
    require("./definitions/InviteController"),
    require("./definitions/RegisterController"),
    require("./definitions/RoomController"),
    require("./definitions/StudentController"),
    require("./definitions/TokenController"),
    require("./definitions/UserController"),
    require("./definitions/ValidateEmailController")
].forEach(createController);

module.exports = ctrls;