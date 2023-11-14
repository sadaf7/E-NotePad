const mongoose = require("mongoose");
const mongoUrl = "mongodb+srv://chatApp_admin:admin404@cluster0.blflx4z.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoUrl);
    console.log("db connected");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
module.exports = connectToMongo;