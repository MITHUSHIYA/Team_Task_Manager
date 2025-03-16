import { Link } from "react-router-dom";
const Welcome = () => {
  return (
    <div>
      <h1>Welcome to Team Project Manager</h1>
      
      <p>
        Dont't Have an Account ?
        <button className="account">
          <Link to="/signup" className="link">
            Signup
          </Link>
        </button>
      </p>
      <p>
        Already Have an Account ?
        <button className="account">
          <Link to="/login" className="link">
            Login
          </Link>
        </button>
      </p>
    </div>
  );
};

export default Welcome;