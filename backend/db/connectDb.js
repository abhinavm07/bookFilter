const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

//Database connection
const db = (url) => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB Connected !!"))
    .catch((err) => {
      throw err;
    });

  mongoose.connection.on("disconnected", () => {
    "Disconnected";
  });

  mongoose.connection.on("connected", () => {
    "Connected";
  });
};

module.exports = db;
