const userModel = require("../model/user.model");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { isValid, isValidRequestBody } = require("../utils/validations");
const UserModel = require("../model/user.model");

//============================================================ create user controller ==========================================================================//

const createUser = async function (req, res) {
  try {
    let data = req.body;

    if (!isValidRequestBody(data)) {
      return res.status(400).send({ status: false, message: "data not found" });
    } else {
      const { username, email, password } = data;

      //-----------------------------------------------validation start from here------------------------------------------------//

      //----------validation for fname  & unique name---------------

      if (!isValid(username)) {

        //Finding wheather User with same username already there
const sameUsername= await userModel.find({username})
if(sameUsername) res.status(400).send({status:false , message:"User with this userName already exists"})

        return res
          .status(400)
          .send({ status: false, message: "username is required" });
      }

      //------------validation for email & unique email---------------

      if (!isValid(email)) {
        return res
          .status(400)
          .send({ status: false, message: "email is required" });
      }

      let uniqueEmail = await userModel.findOne({ email });
      if (uniqueEmail) {
        return res
          .status(400)
          .send({ status: false, message: "email already exist" });
      }

      if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
        return res
          .status(400)
          .send({ status: false, message: "Please enter a valid email" });
      }

      //-----------------validation for password-----------------------------

      if (!isValid(password)) {
        return res
          .status(400)
          .send({ status: false, message: "password is required" });
      }
      if (password.length < 8 || password.length > 15) {
        return res
          .status(400)
          .send({ status: false, message: "password must be 8-15 characters" });
      }

      const saltRounds = 10;
      data["password"] = await bcrypt.hash(password, saltRounds);

      let createUser = await userModel.create(data);
      return res.status(201).send({
        status: true,
        message: "User created successfully",
        data: createUser,
      });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//================================================ login user controller ====================================================================//

const userlogin = async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
      return res
        .status(400)
        .send({ status: false, message: "email is required" });
    }

    if (!password) {
      return res
        .status(400)
        .send({ status: false, message: "password is required" });
    }

    const validEmail = validator.isEmail(email);
    if (!validEmail) {
      return res
        .status(400)
        .send({ status: false, message: "email is not valid" });
    }

    const checkedUser = await userModel.findOne({ email });
    if (!checkedUser) {
      return res
        .status(404)
        .send({ status: false, message: "no user with this emailId" });
    }

    let userId = checkedUser._id.toString();

    const match = await bcrypt.compare(password, checkedUser.password);
    if (!match) {
      return res.status(400).send({ status: false, message: "password wrong" });
    }

    const token = jwt.sign({ userId }, "sainathTesting", { expiresIn: "4d" });

    const result = { userId, token };
    return res
      .status(200)
      .send({ status: true, message: "User login successfull", data: result });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// Update a user by ID
const updateUser = async function (req, res) {
  try {
    const userId = req.params.id; // Assuming you pass the user ID in the URL
    const updatedData = req.body;

    if (!isValid(userId)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid user ID" });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).send({ status: false, message: "User not found" });
    }

    // Validate and update individual fields
    if (isValid(updatedData.username)) {
      user.username = updatedData.username;
    }

    if (isValid(updatedData.email)) {
      const alreadyMail = UserModel.findOne({ mail: updatedData.email });
      if (alreadyMail)
        res
          .status(400)
          .send({
            status: false,
            message: "User already exist with this email id",
          });
      user.email = updatedData.email;
    }

    if (isValid(updatedData.password)) {
      const saltRounds = 10;
      user["password"] = await bcrypt.hash(updatedData.password, saltRounds);
    }

    // Save the updated user
    const updatedUser = await user.save();

    return res.status(200).send({
      status: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// Read a user by ID
const readUser = async function (req, res) {
  try {
    const userId = req.params.id; // Assuming you pass the user ID in the URL

    if (!isValid(userId)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid user ID" });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).send({ status: false, message: "User not found" });
    }

    return res.status(200).send({
      status: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// Delete a user by ID
const deleteUser = async function (req, res) {
  try {
    const userId = req.params.id; // Assuming you pass the user ID in the URL

    if (!isValid(userId)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid user ID" });
    }

    const user = await UserModel.findByIdAndRemove(userId);

    if (!user) {
      return res.status(404).send({ status: false, message: "User not found" });
    }

    return res.status(200).send({
      status: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createUser, userlogin, updateUser, readUser, deleteUser };
