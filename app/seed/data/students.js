const { Staff, Classroom } = require("../../models");

module.exports = async ( classroom ) => {

  const staff = await Staff.find({});

  const names = [
    "Sue Watts",
    "Anita Hudson",
    "Terra Bennett",
    "Alan Ramirez",
    "Doris Lee"
  ];

  const randomPriority = ( max = 10, min = 1  ) => {
    return Math.floor( (Math.random() * max)+min )
  }

  const randomStaffId = () => {
    return staff[ Math.floor( (Math.random() * staff.length) ) ]._id;
  }

  return names.map( name => ({
    name,
    priorityLevel: randomPriority(),
    classroom: classroom._id,
    assignedTo: randomStaffId()
  }) );

};