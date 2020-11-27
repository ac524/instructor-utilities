const createRouter = require("./utils/createRouter");

const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");

const { student: studentVal } = require("../validation");

const { student: studentPerm } = require("../config/permissions");

const {
    create,
    getSingle,
    update,
    deleteSingle
} = require("../controllers/student");

const newStudentMiddleware = [ setRoom.fromBody, isRoomMember ];
const existingStudentMiddleware = [ setRoom.fromParam, isRoomMember ];

const studentCtlrConfig = {
    keyMap: { body: "studentData" }
}

module.exports = createRouter([

    ["/", {
        post: {
            auth: true,
            defaultError: "create the student",
            validation: studentVal,
            middleware: newStudentMiddleware,
            permission: studentPerm,
            ctrl: [ create, studentCtlrConfig ]
        }
    }],

    ["/:roomId/:studentId", {
        get: {
            defaultError: "get the student",
            permission: studentPerm,
            ctrl: getSingle
        },
        patch: {
            defaultError: "update the student",
            validation: studentVal,
            permission: studentPerm,
            ctrl: [ update, studentCtlrConfig ]
        },
        delete: {
            defaultError: "delete the student",
            permission: studentPerm,
            ctrl: deleteSingle
        }
     }, {
        auth: true,
        paramCheck: true,
        middleware: existingStudentMiddleware
    }]

]);