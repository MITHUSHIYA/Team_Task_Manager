import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const req = await axios.post("http://localhost:3003/login", {
      username: username,
      password: password,
    });
    const message = req.data.message;
    const isLoggedIn = req.data.isLoggedIn;
    if (isLoggedIn) {
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
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
          />
          <br />
          <input
            value={password}
            onChange={(e) => setPass(e.target.value)}
            type="text"
            placeholder="password"
          />
          <br />
          <button type="submit" className="accept">
            login
          </button>
        </form>

        <p>
          Dont't Have an Account ?
          <button className="account">
            <Link to="/signup" className="link">
              Signup
            </Link>
          </button>
        </p>
      </div>
    </div>
  );
};
export default Login;
