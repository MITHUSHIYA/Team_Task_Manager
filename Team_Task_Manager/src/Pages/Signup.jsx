import { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [Name, setName] = useState("");
  const [phoneNumber, setPN] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const req = await axios.post("http://localhost:3003/signup", {
      Name: Name,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
    });
    const message = req.data.message;
    const isSignup = req.data.isSignup;
    if (isSignup) {
      alert(message);
      navigate("/");
    } else {
      alert(message);
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={Name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="name"
          placeholder="Name"
          required
        />{" "}
        <br />
        <input
          value={phoneNumber}
          onChange={(e) => setPN(e.target.value)}
          type="tel"
          id="phNo"
          placeholder="Phone Number"
        />{" "}
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="mail"
          id="email"
          placeholder="Email id"
          required
        />{" "}
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
        <button type="submit">Submit</button>
      </form>
      <p>
        Already Have an Account ?
        <button>
          <Link to="/login">Login</Link>
        </button>
      </p>
    </div>
  );
};
export default Signup;
