/**
 * Express router for user authentication, including registration and login.
 *
 * This router handles user registration by hashing passwords and storing user details in the database,
 * and user login by verifying email and password. It uses bcrypt for password hashing and the User model
 * for database operations.
 *
 * @fileoverview User authentication routes for registration and login in an Express application.
 * @author [Connor Johnson]
 */

const router = require("express").Router();
const User = require("../models/user-model");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err)
  }
});

// Login an existing user
router.post("/login", async (req, res) => {
  try {
        // Find the user by email
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

        // Verify the password
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password")

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;