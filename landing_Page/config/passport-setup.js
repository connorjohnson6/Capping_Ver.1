/**
 * Passport.js authentication strategies setup.
 *
 * This module configures Passport.js to use Google OAuth 2.0 and local authentication strategies.
 * It includes serialization and deserialization methods for user sessions, and defines strategies
 * for user authentication using Google and email/password. User data is managed using the User model
 * from the database.
 *
 * @fileoverview Configuration of Passport.js authentication strategies in a Node.js application.
 * @author [Connor Johnson]
 */

 const passport = require('passport');
 const GoogleStrategy = require('passport-google-oauth20');
 const LocalStrategy = require('passport-local');
 const bcrypt = require('bcryptjs');
 const keys = require('./keys');
 const User = require('../../api/models/user-model');
 
 // Serializes the user for the session
 passport.serializeUser((user, done) => {
     done(null, user.id);
 });
 
 // Deserializes the user from the session
 passport.deserializeUser((id, done) => {
     User.findById(id).then((user) => {
         done(null, user);
     });
 });
 
 // Google OAuth 2.0 authentication strategy
 passport.use(
     new GoogleStrategy({
         // Options for the Google strategy
         clientID: keys.google.clientID,
         clientSecret: keys.google.clientSecret,
         callbackURL: '/auth/google/redirect'
     }, (accessToken, refreshToken, profile, done) => {
         // Checks if the user already exists in our database
         User.findOne({email: profile.emails[0].value}).then((currentUser) => {
             if (currentUser) {
                 // User already exists in the database
                 console.log('user is: ', currentUser);
                 done(null, currentUser);
             } else {
                 // If not, creates a new user in the database
                 new User({
                     googleId: profile.id,
                     username: profile.displayName,
                     email: profile.emails[0].value,
                 }).save().then((newUser) => {
                     console.log('created new user: ', newUser);
                     done(null, newUser);
                 });
             }
         });
     })
 );
 
 // Local authentication strategy using email and password
 passport.use(new LocalStrategy(async (username, password, done) => {
     console.log("LocalStrategy for email:", username);
     
     // Checks if the user exists in our database
     try {
         const user = await User.findOne({ email: username });
         if (!user) {
             // No user found with the provided email
             console.log("No user found with this email.");
             return done(null, false, { message: 'User not found' });
         }
 
         // Compares the provided password with the stored hash
         const isMatch = await bcrypt.compare(password, user.password);
         if (isMatch) {
             // Passwords match, user authenticated successfully
             console.log("User authenticated successfully.");
             return done(null, user);
         } else {
             // Passwords do not match
             console.log("Incorrect password for this email.");
             return done(null, false, { message: 'Incorrect password' });
         }
     } catch (err) {
         // Handles errors during authentication
         console.error("Error during LocalStrategy authentication:", err);
         return done(err);
     }
 }));
 