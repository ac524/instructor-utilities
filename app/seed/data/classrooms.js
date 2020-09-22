const { Feed } = require("../../models");
const ObjectId = require("mongoose").Types.ObjectId;

const createStudentFeed = async (roomId,studentId) => {
    const feed = new Feed({
      room: roomId,
      for: studentId,
      in: "students"
    });

    await feed.save();

    return feed._id;
}

const createStudents = async (roomId, staff) => {

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

  const studentId = new ObjectId()

  const students = names.map( name => ({
    _id: studentId,
    name,
    priorityLevel: randomPriority(),
    assignedTo: randomStaffId()
  }) );

  for(let i=0; i < students.length; i++)

    students[i].feed = await createStudentFeed(roomId, studentId);

  return students;

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

  const roomId = new ObjectId();
  const staff = createStaff(users);

  // console.log( createStudents(staff) );

  return [
    {
      _id: roomId,
      name: "My First Classroom",
      staff: staff,
      students: await createStudents(roomId, staff)
    }
  ];

};