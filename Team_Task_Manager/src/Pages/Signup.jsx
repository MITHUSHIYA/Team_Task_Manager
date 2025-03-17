import { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setName] = useState("");
  const [phoneNumber, setPN] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const req = await axios.post("https://team-task-manager-iyoo.onrender.com/signup", {
      username: username,
      phoneNumber: Number(phoneNumber),
      email: email,
      password: password,
    });
    const message = req.data.message;
    const isSignup = req.data.isSignup;
    if (isSignup) {
      localStorage.setItem("username", username);
      alert(message);
      navigate("/");
    } else {
      alert(message);
    }
  };

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        display: "flex",
      }}
    >
      <div className="box">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={username}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="username"
            placeholder="username"
            required
          />
          <br />
          <input
            value={phoneNumber}
            onChange={(e) => setPN(e.target.value)}
            type="tel"
            id="phNo"
            placeholder="Phone Number"
          />
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="mail"
            id="email"
            placeholder="Email id"
            required
          />
          <br />
          <input
            value={password}
            onChange={(e) => setPass(e.target.value)}
            type="text"
            id="password"
            placeholder="Password"
            required
          />
          <br />
          <button type="submit" className="accept">
            Submit
          </button>
        </form>
        <p>
          Already Have an Account ?
          <button className="account">
            <Link to="/login" className="link">
              Login
            </Link>
          </button>
        </p>
      </div>
    </div>
  );
};
export default Signup;
