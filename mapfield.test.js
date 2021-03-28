require("dotenv").config();

// MongoDB
require("~crsm/config/mongoose");

const roomId = "605d753ef34f923c5d1e1471";
const studentId = "605d753ef34f923c5d1e1475";

const studentCtrl = require("~crsm/controllers/student");

const test = async () => {

    const student = await studentCtrl.updateOne( {
        docId: studentId,
        data: {
            // Set map field key
            // $set: {
            //     [`${studentCtrl.prop}.$.meta.test8`]: ""
            // }
            // unset map field key
            $unset: {
                [`${studentCtrl.prop}.$.meta.test8`]: ""
            }
        }
    } );

    // studentCtrl.ctrl.model.findOneAndUpdate(
    //     {}
    // )

    console.log(student);

    process.exit(0);

}

test();