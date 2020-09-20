const ObjectId = require("mongoose").Types.ObjectId;

const createStudents = (staff) => {

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
    return staff[ Math.floor( (Math.random() * staff.length) ) ]._id;
  }

  return names.map( name => ({
    _id: new ObjectId(),
    name,
    priorityLevel: randomPriority(),
    assignedTo: randomStaffId()
  }) );

}

const createStaff = users => [
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

module.exports = async ( users ) => {

  const staff = createStaff(users);

  // console.log( createStudents(staff) );

  return [
    {
      name: "My First Classroom",
      staff: staff,
      students: createStudents(staff)
    }
  ];

};