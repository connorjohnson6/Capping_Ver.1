// Page not used as we have auth on landing_page
// made here incase future group wants a working auth
// backend when making it all react


import "./login.css";


export default function Login() {


  return (
    
    <div className="login">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
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
              placeholder="Email"
              type="email"
              className="loginInput"
            />
            <input
              placeholder="Password"
              type="password"
              minLength="6"
              className="loginInput"
            />
            <button className="loginButton" type="submit">

                Log In
            
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">

                Create a New Account
              
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}