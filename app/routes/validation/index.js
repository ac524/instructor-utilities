/**
 * @typedef {import('./definitions/userValidation').UserData} UserData
 */

module.exports = {
    app: require("./definitions/appValidation"),
    feedEntry: require("./definitions/feedEntryValidation"),
    comment: require("./definitions/commentValidation"),
    invite: require("./definitions/inviteValidation"),
    login: require("./definitions/loginValidation"),
    register: require("./definitions/registerValidation"),
    resend: require("./definitions/resendValidation"),
    room: require("./definitions/roomValidation"),
    student: require("./definitions/studentValidation"),
    createStudent: require("./definitions/createStudentValidation"),
    user: require("./definitions/userValidation")
}