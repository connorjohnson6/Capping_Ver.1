/**
 * Action creators for authentication and user-related actions.
 *
 * This module exports functions that create actions for different authentication and user interaction
 * scenarios such as starting a login process, handling login success or failure, and user follow/unfollow actions.
 * These actions are used with a reducer to update the application's state.
 *
 * @fileoverview Action creators for authentication and user interactions in a React application.
 * @author [Connor Johnson]
 */

/**
 * Creates an action to represent the start of the login process.
 *
 * @param {object} userCredentials - The credentials of the user attempting to log in.
 * @returns {object} An action object with type 'LOGIN_START'.
 */
 export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

/**
 * Creates an action to represent a successful login.
 *
 * @param {object} user - The user object returned upon successful login.
 * @returns {object} An action object with type 'LOGIN_SUCCESS' and the user data as payload.
 */
export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

/**
 * Creates an action to represent a failed login attempt.
 *
 * @returns {object} An action object with type 'LOGIN_FAILURE'.
 */
export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

/**
 * Creates an action for a user follow operation.
 *
 * @param {string} userId - The ID of the user being followed.
 * @returns {object} An action object with type 'FOLLOW' and the user ID as payload.
 */
export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});

/**
 * Creates an action for a user unfollow operation.
 *
 * @param {string} userId - The ID of the user being unfollowed.
 * @returns {object} An action object with type 'UNFOLLOW' and the user ID as payload.
 */
export const Unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});
