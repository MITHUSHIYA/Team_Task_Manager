import { Link } from "react-router-dom";
import "./Welcome.css";
const Welcome = () => {
  return (
    <div className="full-content">
      <h1>Welcome to Team Project Manager</h1>
      <br />
      <h3>Effortless Task Tracking for seamless teamwork</h3>
      <br />
      <p>
        Get Started Now!
        <button className="account">
          <Link to="/signup" className="link">
            Signup
          </Link>
        </button>
      </p>
      <br />
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