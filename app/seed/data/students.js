module.exports = async ( classroom ) => {  

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
    return classroom.staff[ Math.floor( (Math.random() * classroom.staff.length) ) ];
  }

  return names.map( name => ({
    name,
    priorityLevel: randomPriority(),
    classroom: classroom._id,
    assignedTo: randomStaffId()
  }) );

};