const { Feed } = require("../../app/controllers/models");
const ObjectId = require("mongoose").Types.ObjectId;

const createStudentFeed = async (roomId,student,instructor,assignedTo) => {
    const feed = new Feed({
      room: roomId,
      for: student._id,
      in: "students",
      items: [
        {
            _id: new ObjectId(),
            action: "create",
            by: instructor.user,
            date: Date.now()
        },
        {
            _id: new ObjectId(),
            action: "comment",
            by: assignedTo.user,
            data: {
                comment: "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I'm breaking now. We said we'd say it was the snow that killed the other two, but it wasn't. Nature is lethal but it doesn't hold a candle to man."
            },
            date: Date.now()
        },
        {
            _id: new ObjectId(),
            action: "elevate",
            by: assignedTo.user,
            data: {
                to: instructor.user,
            },
            date: Date.now()
        },
        {
            _id: new ObjectId(),
            action: "deelevate",
            by: instructor.user,
            date: Date.now()
        }
      ]
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

  const instructor = staff.find(({role})=>role === "instructor");
  const taStaff = staff.filter(({role})=>role === "ta");

  const randomPriority = ( max = 10, min = 1  ) => {
    return Math.floor( (Math.random() * max)+min )
  }

  const randomStaffId = () => {
    return taStaff[ Math.floor( (Math.random() * taStaff.length) ) ]._id;
  }

  const students = names.map( name => ({
    _id: new ObjectId(),
    name,
    priorityLevel: randomPriority(),
    assignedTo: randomStaffId()
  }) );

  for(let i=0; i < students.length; i++)

    students[i].feed = await createStudentFeed(
      roomId,
      students[i],
      instructor,
      taStaff.find(({_id})=>_id.equals(students[i].assignedTo))
    );

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