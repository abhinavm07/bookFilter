const userSchema = require("../model/userModel");

const bcrypt = require("bcrypt");

const saltRounds = 10;

const users = (req, res) => {
  res.send("Hello There User!");
};

const createUsers = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = userData(email);
  if (userExists) {
    return res.status(401).send("User Already Exists!");
  }

  const passwordHashed = await bcrypt.hash(password, saltRounds);

  //   console.log(`Hashed Password : ${passwordHashed}`);

  if (name && email && passwordHashed) {
    try {
      userSchema.create({
        name: name,
        email: email,
        password: passwordHashed,
      });

      console.log(name, email, password);
      return res.send("Success");
    } catch (error) {
      throw error;
    }
  }
};

const loginUsers = async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await userData(email);
    if (user) {
      const match = checkPassword(password, user.password);
      console.log(match);
      return match
        ? res.send("Welcome User")
        : res.status(401).send("Email or Password Mismatch!");
    } else {
      res.status(404).json({ msg: "No such Account Found" });
    }
  }
};

const deleteUser = async () => {
  const { email, password } = req.body;
  const user = userData(email);
  if (user) {
    const match = checkPassword(password, user.password);
    console.log(match);
    res.send("Hello!");
  }
};

const userData = async (email) => {
  try {
    const userExists = await userSchema.findOne({ email: email });
    return userExists ? userExists : false;
  } catch (error) {
    throw error;
  }
};

const checkPassword = (password, passwordHashed) => {
  try {
    const match = bcrypt.compareSync(password, passwordHashed);

    return match ? true : false;
  } catch (error) {
    throw error;
  }
};

module.exports = { users, createUsers, loginUsers, deleteUser };
