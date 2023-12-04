/**
 * Express router for user-related operations.
 *
 * This router handles various user operations such as updating user information, deleting users,
 * retrieving user details, managing follow/unfollow actions, searching users, and aggregating users with goals.
 * It uses models for users, goals, and carbon data, and includes middleware for hashing passwords.
 *
 * @fileoverview User operation routes for an Express application.
 * @author [Connor Johnson]
 */

const User = require('../models/user-model');
const Goal = require('../models/goal-model'); 
const Carbon = require('../models/carbon-model'); 
const EventModel = require('../models/event-model'); 
const router = require("express").Router();
const bcrypt = require("bcrypt");
const multer = require('multer');
const nodemailer = require('nodemailer');

// Configure  SMTP transporter
const transporter = nodemailer.createTransport({
  service: 'Outlook365', // Outlook365 service identifier
  auth: {
    user: '', // Replace with your Outlook email
    pass: '' // Replace with your Outlook password
  }
});

// Endpoint to send an email
router.post('/send-email', async (req, res) => {
  const { userEmail, eventDetails } = req.body;

  const mailOptions = {
    from: '', // Your Outlook email
    to: userEmail,
    subject: `Confirmation for ${eventDetails.title}`,
    text: `Hello,\n\nYou have successfully joined the event: ${eventDetails.title}.\nEvent Details:\n- Type: ${eventDetails.type}\n- Date: ${eventDetails.date}\n- Group: ${eventDetails.group}\n\nThank you!`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent');
    }
  });
});




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/images/profilePictures'); //  upload destination directory
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExtension = file.originalname.split('.').pop(); // Get file extension from original file name
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
  }
});

const upload = multer({ storage: storage });


//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

// Search for users

router.get('/search', async (req, res) => {
  try {
      const users = await User.find({ username: { $regex: req.query.name, $options: "i" }});
      res.json(users);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Get all users along with their goals and total CO2 emissions
router.get('/allUsersGoalsAndEmissions', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    const usersWithGoalsAndEmissions = await Promise.all(users.map(async (user) => {
      // Fetch goals for the user
      const goals = await Goal.find({ userId: user._id });
      // Fetch emissions for the user
      const emissions = await Carbon.find({ userId: user._id });
      
      // Calculate total emissions for the user
      const totalEmissions = emissions.reduce((acc, emission) => acc + parseFloat(emission.totalCo2E), 0);

      return {
        ...user._doc, // Spread the user document
        totalCo2E: totalEmissions, // Add the total emissions
        goal: goals.length > 0 ? goals[0].goal : undefined // Add the first goal found
      };
    }));

    res.json(usersWithGoalsAndEmissions);
  } catch (error) {
    console.error("Error in /allUsersGoalsAndEmissions route:", error);
    res.status(500).send('Server error');
  }
});


//get just carbon data for user
router.get('/userCarbons/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const emissionsData = await Carbon.find({ userId });

    if (!emissionsData || emissionsData.length === 0) {
      return res.status(404).json({ message: 'Carbon data not found for the user.' });
    }

    // Assuming each document has a `routes` property
    const userRoutes = emissionsData[0].routes.map(route => route.co2E);

    res.json({
      routes: userRoutes
    });
  } catch (error) {
    console.error("Error fetching user emissions:", error);
    res.status(500).send('Server error');
  }
});


// Get goal and emissions for a specific user
router.get('/userGoalAndEmissions/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const goalData = await Goal.findOne({ userId });
    const emissionsData = await Carbon.find({ userId });
    
    // Calculate total emissions
    const totalEmissions = emissionsData.reduce((acc, emission) => acc + emission.totalCo2E, 0);

    res.json({
      goal: goalData ? goalData.goal : null,
      unit: goalData ? goalData.unit : 'kg', // Assuming 'kg' is your default unit
      emissions: totalEmissions,
    });
  } catch (error) {
    console.error("Error fetching user goal and emissions:", error);
    res.status(500).send('Server error');
  }
});

  // Route to update user's progress
  router.put('/updateProgress/:userId', async (req, res) => {
    try {
      await updateUserProgress(req.params.userId);
      res.status(200).json({ message: 'User progress updated successfully' });
    } catch (error) {
      console.error('Error in /updateProgress route:', error);
      res.status(500).json({ error: 'Error updating user progress' });
    }
  });

  router.put('/updateInfo/:userId', upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }]), async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Update user data from body
      user.email = req.body.email || user.email;
      user.city = req.body.city || user.city;
      user.from = req.body.from || user.from;
      user.desc = req.body.desc || user.desc;
  
      // Process profile image if provided
      if (req.files['profileImage']) {
        const profileImagePath = req.files['profileImage'][0].path;
        // Remove 'public/' from the path before saving to the database
        const dbProfileImagePath = profileImagePath.replace('public/images/', '');
        user.profilePicture = dbProfileImagePath;
      }
  
      // Process cover image if provided
      if (req.files['coverImage']) {
        const coverImagePath = req.files['coverImage'][0].path;
        // Remove 'public/' from the path before saving to the database
        const dbCoverImagePath = coverImagePath.replace('public/images/', '');
        user.coverPicture = dbCoverImagePath;
      }
  
      await user.save();
      res.send({ message: 'User updated successfully', user });
    } catch (error) {
      res.status(500).send('Server error');
    }

  });

  // POST route to join an event
router.post('/join-event/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const eventInfo = req.body; // Assuming event information is sent in the body of the request

    // Find the user by ID and add the event to their events array
    const userEvent = await EventModel.findOneAndUpdate(
      { userId: userId },
      { $push: { events: eventInfo } },
      { new: true, upsert: true } // Upsert will create a new document if one doesn't exist
    );

    // Send back a success response
    res.status(200).json(userEvent);
  } catch (error) {
    console.error('Error joining event:', error);
    res.status(500).json({ message: 'Error joining event' });
  }
});
  
// GET route to retrieve the events a user has joined
router.get('/joined-event/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find the user's events using the userId
    const userEvents = await EventModel.findOne({ userId: userId });
    
    if (userEvents) {
      res.status(200).json(userEvents.events); // Send the array of events
    } else {
      res.status(404).json({ message: 'No events found for this user.' });
    }
  } catch (error) {
    console.error('Error fetching joined events:', error);
    res.status(500).json({ message: 'Error fetching events' });
  }
});

module.exports = router;

module.exports = router;