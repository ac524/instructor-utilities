
const {
    student: studentVal,
    createStudent: createStudentVal
} = require("~crsm/routes/validation");

const { student: studentPerm } = require("~crsm/config/permissions");

const studentCtrl = require("~crsm/controllers/student");

const createRouter = require("./utils/createRouter");

const isRoomMember = require("./middleware/isRoomMember");
const setRoom = require("./middleware/setRoom");

// const extractBelongsTo = ( req, res, next ) => {

//     if( req.body.belongsTo ) {

//         // Set the belongsTo key for the controller.
//         req.crdata.set( "belongsTo", req.body.belongsTo );

//         // Set the roomId for authentication..
//         req.crdata.set( "roomId", req.body.belongsTo );

//         delete req.body.belongsTo;

//     }

//     next();

// }

const studentCtlrConfig = {
    keyMap: { body: "studentData" }
}

module.exports = createRouter([

    ["/", {
        post: {
            auth: true,
            defaultError: "create the student",
            validation: createStudentVal,
            middleware: [ setRoom.fromBody, isRoomMember ],
            permission: studentPerm,
            ctrl: studentCtrl,
            ctrlFilter: ([ ctrl, config ]) => [ctrl, {
                ...config,
                keyMap: {
                    ...config.keyMap,
                    user: "createdBy"
                }
            }]
        }
    }],

    ["/:studentId", {
        get: {
            defaultError: "get the student",
            permission: studentPerm,
            ctrl: studentCtrl
        },
        patch: {
            defaultError: "update the student",
            validation: studentVal,
            permission: studentPerm,
            ctrl: studentCtrl
        },
        delete: {
            defaultError: "delete the student",
            permission: studentPerm,
            ctrl: studentCtrl
        }
     }, {
        auth: true,
        paramCheck: true,
        middleware: [ setRoom.fromStudent, isRoomMember ]
    }]

]);