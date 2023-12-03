/**
 * Reducer function for authentication-related state management.
 *
 * This reducer handles actions related to user authentication, such as login attempts,
 * login success, login failures, as well as user follow and unfollow actions.
 * It updates the state based on the action type and payload received.
 *
 * @param {object} state - The current state of the authentication-related data.
 * @param {object} action - The action object that dictates how the state should change.
 * @returns {object} The updated state after applying the action.
 *
 * @fileoverview Reducer function for managing authentication and user-related state changes.
 * @author [Connor Johnson]
 */

 const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case "FOLLOW":
      // Adds a new user to the current user's followings list
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "UNFOLLOW":
      // Removes a user from the current user's followings list
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload, // the payload contains the updated user data
      };
    
      default:
      return state;
  }
};

export default AuthReducer;
