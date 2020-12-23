const createRouter = require("./utils/createRouter");

const {
    student: studentVal,
    createStudent: createStudentVal
} = require("../config/validation");

const { student: studentPerm } = require("../config/permissions");

const {
    create,
    getSingle,
    update,
    deleteSingle
} = require("../controllers/student");

const extractBelongsTo = ( req, res, next ) => {

    if( req.body.belongsTo ) {

        req.crdata.set( "belongsTo", req.body.belongsTo );
        delete req.body.belongsTo;

    }

    next();

}

const studentCtlrConfig = {
    keyMap: { body: "studentData" }
}

module.exports = createRouter([

    ["/", {
        post: {
            auth: true,
            defaultError: "create the student",
            validation: createStudentVal,
            middleware: extractBelongsTo,
            permission: studentPerm,
            ctrl: [ create, studentCtlrConfig ]
        }
    }],

    ["/:studentId", {
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