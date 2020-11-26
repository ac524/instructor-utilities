const createRouter = require("./utils/createRouter");

const setRoom = require("./middleware/setRoom");
const isRoomMember = require("./middleware/isRoomMember");

const studentValidation = require("../validation/studentValidation");

const { CREATE_STUDENT, UPDATE_STUDENT, DELETE_STUDENT, VIEW_STUDENT } = require("../config/permissions");

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
            permission: CREATE_STUDENT,
            ctrl: [ create, studentCtlrConfig ]
        }
    }],

    ["/:roomId/:studentId", {
        get: {
            defaultError: "get the student",
            permission: VIEW_STUDENT,
            ctrl: getSingle
        },
        patch: {
            defaultError: "update the student",
            validation: studentValidation,
            permission: UPDATE_STUDENT,
            ctrl: [ update, studentCtlrConfig ]
        },
        delete: {
            defaultError: "delete the student",
            permission: DELETE_STUDENT,
            ctrl: deleteSingle
        }
     }, {
        auth: true,
        paramCheck: true,
        middleware: existingStudentMiddleware
    }]

]);