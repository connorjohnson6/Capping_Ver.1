/**
 * Router module for the profile route in an Express application.
 *
 * This module sets up a router for handling requests to the profile page. It includes an authentication
 * check middleware to ensure that the user is logged in before accessing the profile page. If the user is
 * not authenticated, they are redirected to the login page.
 *
 * @fileoverview Router for the profile route with authentication check in an Express application.
 * @author [Connor Johnson]
 */

 const router = require('express').Router();

 /**
  * Middleware to check if the user is authenticated.
  * 
  * Redirects to the login page if the user is not logged in. Otherwise, it passes control to the next middleware.
  * 
  * @param {object} req - The request object.
  * @param {object} res - The response object.
  * @param {function} next - The next middleware function in the stack.
  */
 const authCheck = (req, res, next) => {
     if (!req.user) {
         // Redirects to login page if user is not logged in
         res.redirect('/auth/login');
     } else {
         // Proceeds to the next middleware if the user is authenticated
         next();
     }
 };
 
 /**
  * Route serving the profile page.
  * 
  * Uses the 'authCheck' middleware to ensure the user is authenticated. Renders the 'profile' view
  * with the user's information if authenticated.
  */
 router.get('/', authCheck, (req, res) => {
     // Renders the profile page with user data
     res.render('profile', { user: req.user });
 });
 
 // Exporting the router to be used in other parts of the application
 module.exports = router;
 