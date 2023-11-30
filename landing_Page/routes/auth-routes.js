/**
 * Router module for authentication routes in an Express application.
 *
 * This module sets up routes for login, logout, and registration, including integration with
 * Google OAuth for authentication. It also includes a custom login and registration process using Passport.js
 * and bcryptjs for password hashing. User data is managed using the User model from the database.
 *
 * @fileoverview Authentication routes including OAuth, login, logout, and registration in an Express application.
 * @author [Connor Johnson]
 */

 const router = require('express').Router();
 const passport = require('passport');
 const bcrypt = require('bcryptjs');
 const User = require('../../api/models/user-model');
 
 // Route for login page
 router.get('/login', (req, res) => {
     // Renders the login page
     res.render('login', { user: req.user });
 });
 
 // Route for logging out
 router.get('/logout', (req, res) => {
     // Passport.js logout function
     req.logout();
     // Redirect to the home page after logout
     res.redirect('/');
 });
 
 // Google OAuth authentication route
 router.get('/google', passport.authenticate('google', {
     scope: ['profile', 'email'] // Requesting access to user's profile and email
 }));
 
 // Google OAuth callback route
 router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
     // Redirect to profile page after successful authentication
     res.redirect('/profile');
 });
 
 // Route to check username and email availability
 router.get('/check-availability', async (req, res) => {
     try {
         const emailExists = await User.findOne({ email: req.query.email });
         const usernameExists = await User.findOne({ username: req.query.username });
 
         // Respond with the availability status of email and username
         res.json({
             emailExists: !!emailExists,
             usernameExists: !!usernameExists
         });
     } catch (err) {
         // Handle server errors
         res.status(500).json({ error: 'Server error' });
     }
 });
 
 // Route for custom user registration
 router.post('/register', async (req, res) => {
     // Extracting user details from the request body
     const { email, username, password } = req.body;
 
     try {
         // Checking for existing users with the same email or username
         const existingUser = await User.findOne({ $or: [{email: email}, {username: username}] });
         if (existingUser) {
             // Inform user if an account already exists and redirect to login
             req.flash('error', 'An account with this email or username already exists.');
             return res.redirect('/auth/login');
         }
 
         // Hashing the password and creating a new user
         const hashedPassword = await bcrypt.hash(password, 10);
         const newUser = new User({
             email: email,
             username: username,
             password: hashedPassword
         });
         await newUser.save();
         
         // Auto-login after registration
         req.login(newUser, function(err) {
             if (err) {
                 console.error("Error during auto login after registration:", err);
                 return res.redirect('/auth/login');
             }
             return res.redirect('/profile');
         });
 
     } catch (err) {
         // Handle errors and redirect to login with an error message
         console.error(err);
         req.flash('error', 'Server error. Registration failed.');
         res.redirect('/auth/login');
     }
 });
 
 // Custom login route
 router.post('/login', (req, res, next) => {
     console.log("Received login POST request with data:", req.body);
     // Passport local strategy for authentication
     passport.authenticate('local', {
         successRedirect: '/profile',
         failureRedirect: '/auth/login',
         failureFlash: true
     })(req, res, next);
 });
 
 // Exporting the router to be used in other parts of the application
 module.exports = router;
 