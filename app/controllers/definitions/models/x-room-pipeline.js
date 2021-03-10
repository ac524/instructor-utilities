/**
 * THIS CODE IS NOT CURRENTLY IN USE
 * 
 * The below code was written in an effort to fetch the room and all aggregated data through one
 * pipeline. Have put a good deal of work into and currently still hitting some stumbling blocks
 * on document populations on different scenarios. Side tabling this effort for now and moving relevant
 * code here for potential review and reapproach later on.
 * 
 * Pulled from models/Room.js
 */

const roomProject = {
    _id: 1,
    name: 1,
    staff: 1,
    students: 1,
    invites: 1,
    apps: 1
  };
  
  const roomDefaults = {
    staff: [],
    students: [],
    invites: [],
    apps: []
  }
  
  // const roomGroup = {
  //   _id: '$_id',
  //   name: '$name',
  //   staff: '$staff',
  //   students: '$students',
  //   invites: '$invites',
  //   apps: '$apps'
  // };
  
  const makeSubdocPopulatePipeline = ( from, path, $project ) => {
  
    const pieces = path.split(".");
  
    return [
      {
        $unwind: {
          path: `$${pieces[0]}`,
          preserveNullAndEmptyArrays: true
        },
      },
      {
        $lookup: {
              from,
              let: { joinId: `$${path}` },
              pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$joinId"] } } },
                ...( $project ? [ { $project } ] : [] )
              ],
              as: "_docToPopulate"
          }
      },
      
      /**
       * Current issue with an empty object being inserted when lookup finds no
       * matches and the path is undefined stems from here. The $addField attempts to push
       * an empty value to a nested path that doesn't exist, resulting in the creation of an
       * empty object.
       */
      { $addFields: { [path]: { $arrayElemAt: ["$_docToPopulate",0] } } },

      { $project: { _docToPopulate: 0 } },
      {
        $group: {
          root: { $first: '$$ROOT' },
          _id: '$_id',
          [pieces[0]]: { $push: `$${pieces[0]}` }
        }
      },
      { $replaceRoot: { newRoot: { $mergeObjects: [ '$root', "$$ROOT" ] } } },
      { $project: { root: 0 } }
    ]
  
  }
  
  const populateStaffUsersPipeline = makeSubdocPopulatePipeline(
    "users",
    "staff.user",
    { _id: 1, name: 1, email: 1 }
  );
  
  const populateInviteTokenPipeline = makeSubdocPopulatePipeline(
    "tokens",
    "invites.token",
    { _id: 1, token: 1 }
  );
  
  const addDefaultsPipeline = [
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            roomDefaults,
            "$$ROOT"
          ]
        }
      }
    }
  ]
  
  ClassroomSchema.statics.getRoomAggregate = async function( roomId ) {
  
    console.log( roomId );
  
    return this.aggregate([
      { $match: { _id: new ObjectId(roomId) } },
      // ...populateStaffUsersPipeline,
      ...populateInviteTokenPipeline,
      // ...addDefaultsPipeline
    ]);
  
  }