const userSchema = require("../model/userModel");

const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

const saltRounds = 10;

const genrateToken = (id) => {
  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const createUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await userSchema.exists({ email });

    if (userExists) {
      return res.status(401).json({ message: "User Already Exists" });
    }

    const passwordHashed = await bcrypt.hash(password, saltRounds);

    if (name && email && passwordHashed) {
      const user = await userSchema.create({
        name,
        email,
        password: passwordHashed,
      });

      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: genrateToken(user._id),
      });
    }
  } catch (error) {
    throw error;
  }
};

const loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email or Password missing" });
    }

    const user = await userData(email);

    if (!user) {
      return res.status(404).json({ msg: "No such Account Found" });
    }

    const match = checkPassword(password, user.password);

    if (match) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: genrateToken(user._id),
      });
    } else {
      return res.status(401).send("Email or Password Mismatch!");
    }
  } catch (error) {
    throw error;
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

module.exports = { createUsers, loginUsers };
