const mongoose = require("mongoose");
const Feed = require("./Feed");
const Schema = mongoose.Schema;

const InvitesSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  token: {
    type: Schema.Types.ObjectId,
    ref:"Token",
  }
});

// Create Schema
const StaffSchema = new Schema({
  role: {
    type: String,
    required: true
  },
  user: {
      type: Schema.Types.ObjectId,
      ref:'User',
      required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create Schema
const StudentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  priorityLevel: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  assignedTo: {
      type: Schema.Types.ObjectId
  },
  feed: {
    type: Schema.Types.ObjectId,
    ref: "Feed",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
}/*, {
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true 
  }
}*/);

StudentSchema.methods.getElevation = async function() {

  const [ feed ] = await Feed.aggregate([

    { $match: { _id: this.feed } },

    { $unwind: '$items'},

    { $match: {"items.action": {$in: [ "elevate", "deelevate" ]}}},

    { $group: { _id: '$_id', items: { $push: '$items' }}}

  ])

  return feed.items.reduce( (elevation, entry) => elevation + (entry.action === "elevate" ? 1 : -1), 0 );

}

// StudentSchema.virtual('elevation').get(async function() {

  // const [ feed ] = await Feed.aggregate([

  //   { $match: { _id: this.feed } },

  //   { $unwind: '$items'},

  //   { $match: {"items.action": {$in: [ "elevate", "deelevate" ]}}},

  //   { $group: { _id: '$_id', items: { $push: '$items' }}}

  // ])

  // return 0; //feed.items.reduce( (elevation, entry) => elevation + (entry.action === "elevate" ? 1 : -1), 0 );

// });

// Create Schema
const ClassroomSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  staff: [StaffSchema],
  students: [StudentSchema],
  invites: [InvitesSchema],
  apps: [{
    type: Schema.Types.ObjectId,
    ref:"App",
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

ClassroomSchema.methods.populateStudentFeedAggregates = async function() {
  
  for( let i=0; i < this.students.length; i++ )

    this.students[i] = {
      ...this.students[i].toObject(),
      elevation: await this.students[i].getElevation()
    }

  return this;

}

// ClassroomSchema.statics. = async function() {

//   return this.aggregate([
//     { $match: { _id: this.feed } },
//     {
//         $project: {
//             _id: '$_id',
//             patients: 1,
//             _id: 0
//         }
//     },
//     {
//         $lookup: {
//             from: "patients",
//             localField: "patient",
//             foreignField: "_id",
//             as: "patient_doc"
//         }
//     }
//   ]);

// }

module.exports = mongoose.model("Classroom", ClassroomSchema);