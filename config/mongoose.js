// requiring the library
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

//connecting to the database
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log("Error connecting to database", err));
