const { Feed } = require("../../app/controllers/definitions/models");
const ObjectId = require("mongoose").Types.ObjectId;

const createStudentFeed = async (roomId, student, instructor, assignedTo) => {

  const comment = {
    _id: new ObjectId(),
    action: "comment",
    by: assignedTo.user,
    data: {
      comment: {
        blocks: [{
          text: "Hello World!"
        }]
      }
    },
    date: Date.now(),
  };

  const feed = new Feed({
    room: roomId,
    for: student._id,
    in: "students",
    items: [
      {
        _id: new ObjectId(),
        action: "create",
        by: instructor.user,
        date: Date.now(),
      },
      comment,
      {
        _id: new ObjectId(),
        action: "elevate",
        by: assignedTo.user,
        data: {
          to: instructor.user,
        },
        date: Date.now(),
      },
      {
        _id: new ObjectId(),
        action: "deelevate",
        by: instructor.user,
        date: Date.now(),
      },
    ],
  });

  await feed.save();

  return {
    feed: feed._id,
    elevation: 0,
    recentComments: [comment]
  };
};

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
    "Nafeesa Gilliam",
  ];

  const instructor = staff.find(({ role }) => role === "instructor");
  const taStaff = staff.filter(({ role }) => role === "ta");

  const randomPriority = (max = 10, min = 1) => {
    return Math.floor(Math.random() * max + min);
  };

  const randomStaffId = () => {
    return taStaff[Math.floor(Math.random() * taStaff.length)]._id;
  };

  const students = names.map((name) => ({
    _id: new ObjectId(),
    name,
    priorityLevel: randomPriority(),
    assignedTo: randomStaffId(),
  }));

  for (let i = 0; i < students.length; i++) {

    students[i] = {
      ...students[i],
      ...(await createStudentFeed(
        roomId,
        students[i],
        instructor,
        taStaff.find(({ _id }) => _id.equals(students[i].assignedTo))
      ))
    };

  }

  return students;
};

const createStaff = (users) => [
  {
    _id: new ObjectId(),
    role: "instructor",
    user: users[0]._id,
  },
  ...users.slice(1).map(({ _id }) => ({
    _id: new ObjectId(),
    role: "ta",
    user: _id,
  })),
];

module.exports = async (users) => {
  const roomId = new ObjectId();
  const staff = createStaff(users);

  // console.log( createStudents(staff) );

  return [
    {
      _id: roomId,
      name: "My First Classroom",
      staff: staff,
      students: await createStudents(roomId, staff),
    },
  ];
};
