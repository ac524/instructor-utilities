const mongoose = require("mongoose");
const mongoDbUri = require("./options")( "mongodb" );

mongoose
  .connect(
    mongoDbUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));