module.exports = async ( classroom ) => {  

  const names = [
    "Sue Watts",
    "Anita Hudson",
    "Terra Bennett",
    "Alan Ramirez",
    "Doris Lee",
    "Ayrton Bass",
    "Carter Kane",
    "Alys Joyce",
    "Anjali Goddard",
    "Harris Trejo",
    "Mylie Pruitt",
    "Darryl Kenny",
    "Beau Garrett",
    "Tobey Chester",
    "Doris Harrington",
    "Kayla Lang",
    "Glyn Mayo",
    "Cormac Mustafa",
    "Tiarna Francis",
    "Malaika Broughton",
    "Cassia Brandt",
    "Jaime Reilly",
    "Murphy Emery",
    "Barney Duke",
    "Nafeesa Gilliam"
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