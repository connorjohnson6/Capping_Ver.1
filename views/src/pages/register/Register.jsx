// Page not used as we have auth on landing_page
// made here incase future group wants a working auth
// backend when making it all react

import "./register.css";


export default function Register() {



  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Carbon Bigfoot</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Carbon Bigfoot.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox">
            <input
              placeholder="Username"
              className="loginInput"
            />
            <input
              placeholder="Email"
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              className="loginInput"
              type="password"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};