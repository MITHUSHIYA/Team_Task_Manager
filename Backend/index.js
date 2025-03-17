const express = require("express");
const mdb = require("mongoose");
const dotenv = require("dotenv");
const Signup = require("./models/signupSchema");
const addDetails = require("./models/addDetailsScheme");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3003;
dotenv.config();

mdb
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MDB Connection Successful"))
  .catch((err) => console.log("Check your connection String:", err));

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Backend Server!!</h1>");
});


app.post("/signup", async (req, res) => {
  try {
    const { username, phoneNumber, email, password } = req.body;
    if (!username || !phoneNumber || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    const existUser = await Signup.findOne({ username });
    if (existUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newSignup = new Signup({ username, phoneNumber, email, password: hashedPassword });

    await newSignup.save();
    res.status(201).json({ message: "Signup Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Signup Unsuccessful" });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await Signup.findOne({ username });

    if (!existingUser) {
      return res.status(400).json({ message: "User not found, Signup first" });
    }

    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    return res.status(200).json({ message: "Login Successful", username, isLoggedIn:true  });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


app.post("/addDetails", async (req, res) => {
  try {
    const {  title, desc, username } = req.body;
    console.log("Received request:", req.body);

    if (!username) {
      console.log("Error: Missing username");
      return res.status(400).json({ message: "Username is required", isAdded: false });
    }
    const user = await Signup.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const newDetails = new addDetails({ title, desc, username });
    const savedTask = await newDetails.save();

    user.tasks.push(savedTask._id);
    await user.save();

    res.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding task" });
  }
});


app.get("/getTask", async (req, res) => {
  try {
    const { username } = req.query;
    const user = await Signup.findOne({ username }).populate("tasks");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({ tasks: user.tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});



app.delete("/deleteTask/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { username } = req.query;

    const user = await Signup.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    await addDetails.findByIdAndDelete(taskId);
    user.tasks = user.tasks.filter((task) => task.toString() !== taskId);
    await user.save();

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting task" });
  }
});

app.put("/toggleComplete/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;

    
    const task = await addDetails.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

  
    task.complete = !task.complete;
    await task.save();

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating task" });
  }
});

app.put("/toggleImportant/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;

  
    const task = await addDetails.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    
    task.important = !task.important;
    await task.save();

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating task" });
  }
});


app.listen(PORT, () => console.log("Server Started Successfully"));
