const mongoose = require("mongoose");

mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://localhost/instructorutilities",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));