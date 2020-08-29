module.exports = async ( staff ) => {

  return [
    {
      name: "My First Classroom",
      staff: staff.map( ({_id}) => _id )
    }
  ];

};