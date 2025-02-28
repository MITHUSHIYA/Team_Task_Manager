const express = require("express");
const mdb = require("mongoose"); 
const dotenv = require("dotenv");
const Signup = require("./models/signupSchema");
const bcrypt = require("bcrypt");
const cors = require("cors");


const app = express(); 

app.use(cors());

app.use(express.json());
const PORT = 3003;

dotenv.config();

console.log(
  process.env.MONGODB_URL
); 
mdb
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MDB Connection Successful");
  })
  .catch((err) => {
    console.log("Check your connection String:", err);
  });

app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to Backend Server!!</h1>"
  ); 
});


app.post("/signup", async (req, res) => {
  try {
    const { Name, phoneNumber, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(
      password,
      10
    ); 
    const newSignup = new Signup({
      Name:Name,
      phoneNumber: phoneNumber,
      password: hashedPassword,
      email: email,
    });

    console.log(req.body);

    newSignup.save();
    console.log("Signup Successful");
    res.status(201).json({ message: "Signup Successful", isSignup: true });
  } catch (error) {
    console.log(error);
    res.status(201).json({ message: "Signup Unsuccessful", isSignup: false });
  }
});


app.get("/getsignupdetails",  (req, res) => {
  const signup = Signup.find();
  console.log(signup);
  res.send("Signup details fetched");
});


app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingUser = await Signup.findOne({ email: email });
      console.log(existingUser);
      if (existingUser != null) {
        const isValidPassword = await bcrypt.compare(
          password,
          existingUser.password
        );
        console.log(isValidPassword);
        if (isValidPassword) {
          res.status(201).json({ message: "Password Correct", isLoggedIn: true });
        } else {
          res
            .status(201)
            .json({ message: "Incorrect Password", isLoggedIn: false });
        }
      } else {
        res
          .status(201)
          .json({ message: "User not Found Signup First", isLoggedIn: false });
      }
    } catch (error) {
      console.log("login error");
      res.status(400).json({ message: "Login Error", isLoggedIn: false });
    }
  });

app.listen(PORT, () => {
  console.log("Server Started Successfully");
}); 
