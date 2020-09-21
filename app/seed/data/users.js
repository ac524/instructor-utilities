const passwordHash = require("../../config/utils/passwordHash");

module.exports = async () => [
    {
      name: "Anthony Brown",
      email: "anthony@classroomadmin.com",
      password: await passwordHash("test123"),
      isVerified: true
    },
    {
      name: "Tom Lam",
      email: "tom@classroomadmin.com",
      password: await passwordHash("test123"),
      isVerified: true
    },
    {
      name: "Spencer Hirata",
      email: "spencer@classroomadmin.com",
      password: await passwordHash("test123"),
      isVerified: true
    }
];