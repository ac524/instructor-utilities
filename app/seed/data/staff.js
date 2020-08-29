module.exports = async ( users ) => {

  return [
    {
      role: "instructor",
      user: users[0]._id
    },
    ...users.slice(1).map( ({_id}) => ({
      role: "ta",
      user: _id
    }) )
  ];

};