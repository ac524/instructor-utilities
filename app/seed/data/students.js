const { Staff, Classroom } = require("../../models");

module.exports = async ( classroom ) => {

  const staff = await Staff.find({});

  const names = [
    "Sue Watts",
    "Anita Hudson",
    "Terra Bennett",
    "Alan Ramirez",
    "Doris Lee"
  ]

  return names.map( name => ({
    name,
    priorityLevel: Math.floor( (Math.random() * 10)+1 ),
    classroom: classroom._id,
    assignedTo: staff[ Math.floor( (Math.random() * staff.length) ) ]._id
  }) );

};