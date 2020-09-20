const ObjectId = require("mongoose").Types.ObjectId;

module.exports = async ( users ) => {

  const createStaff = () => [
    {
      _id: new ObjectId(),
      role: "instructor",
      user: users[0]._id
    },
    ...users.slice(1).map( ({_id}) => ({
      _id: new ObjectId(),
      role: "ta",
      user: _id
    }) )
  ];

  return [
    {
      name: "My First Classroom",
      staff: createStaff()
    }
  ];

};