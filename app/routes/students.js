const createRouter = require("./utils/createRouter");

const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");

const studentValidation = require("../validation/studentValidation");

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
            validation: studentValidation,
            middleware: newStudentMiddleware,
            ctrl: [ create, studentCtlrConfig ]
        }
    }],

    ["/:roomId/:studentId", {
        get: {
            defaultError: "get the student",
            ctrl: getSingle
        },
        patch: {
            defaultError: "update the student",
            validation: studentValidation,
            ctrl: [ update, studentCtlrConfig ]
        },
        delete: {
            defaultError: "delete the student",
            ctrl: deleteSingle
        }
     }, {
        auth: true,
        paramCheck: true,
        middleware: existingStudentMiddleware
    }]

]);