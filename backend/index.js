const express = require("express");

const app = express();

const cors = require("cors");

app.use(cors());

app.use(express.json());

require("express-async-handler");

const userRoutes = require("./routes/userRoutes");

const bookRoutes = require("./routes/bookRoutes");

app.use("/user", userRoutes);

app.use("/books", bookRoutes);

require("dotenv").config();

const connect = require("./db/connectDb");

const appLaunch = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(8000, () => {
      console.log(`Routes Active`);
    });
  } catch (error) {
    console.log(error);
  }
};

appLaunch();
