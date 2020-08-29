const { User } = require("../../models");

module.exports = async () => {

  const users = await User.find({});

  return [
    {
      role: "instructor",
      user: users[0]._id
    },
    ...users.slice(1).map( ({_id}) => ({
      role: "instructor",
      user: _id
    }) )
  ];

};