const { Staff } = require("../../models");

module.exports = async () => {

  const staff = await Staff.find({});

  return [
    {
      name: "My First Classroom",
      staff: staff.map( ({_id}) => _id )
    }
  ];

};