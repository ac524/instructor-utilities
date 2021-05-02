const {
    student: studentVal,
    createStudent: createStudentVal
} = require("./validation");

const { student: studentPerm } = require("../config/permissions");

const ctrls = require("../controllers");

const createRouter = require("./utils/createRouter");

const isRoomMember = require("./middleware/isRoomMember");
const setRoom = require("./middleware/setRoom");

module.exports = createRouter([

    ["/", {
        post: {
            auth: true,
            defaultError: "create the student",
            validation: createStudentVal,
            middleware: [ setRoom.fromBody, isRoomMember ],
            permission: studentPerm,
            ctrl: ctrls.get("room.student")
        }
    }],

    ["/:studentId", {
        get: {
            defaultError: "get the student",
            permission: studentPerm,
            ctrl: ctrls.get("room.student")
        },
        patch: {
            defaultError: "update the student",
            validation: studentVal,
            permission: studentPerm,
            ctrl: ctrls.get("room.student")
        },
        delete: {
            defaultError: "delete the student",
            permission: studentPerm,
            ctrl: ctrls.get("room.student")
        }
     }, {
        auth: true,
        paramCheck: true,
        middleware: [ setRoom.fromStudent, isRoomMember ]
    }]

]);