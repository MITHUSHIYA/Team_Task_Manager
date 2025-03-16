const express = require("express");
const mdb = require("mongoose");
const dotenv = require("dotenv");
const Signup = require("./models/signupSchema");
const addDetails = require("./models/addDetailsScheme");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./models/auth");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
const PORT = 3003;

dotenv.config();

console.log(process.env.MONGODB_URL);
mdb
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MDB Connection Successful");
  })
  .catch((err) => {
    console.log("Check your connection String:", err);
  });

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Backend Server!!</h1>");
});

app.post("/signup", async (req, res) => {
  try {
    const { username, phoneNumber, password, email } = req.body;
    const existUser = await Signup.findOne({ username: username });
    const existEmail = await Signup.findOne({ email: email });
    if (existUser) {
      return res.status(400).json({ message: "Username already exists" });
    } else if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username should have atleast 4 characters" });
    }
    if (existEmail) {
      return res.status(400).json({ message: "Eamil already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newSignup = new Signup({
      username: username,
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

app.get("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await Signup.findOne({ username: username });
    console.log(existingUser);
    if (existingUser != null) {
      const isValidPassword = await bcrypt.compare(
        password,
        existingUser.password,
        (err, data) => {
          if (data) {
            const authClaims = [
              { name: username },
              { jti: jwt.sign({}, "secret-key") },
            ];
            const token = jwt.sign({ authClaims }, "secret-key", {
              expiresIn: "2d",
            });
            res.status(200).json({ id: existingUser._id, token: token });
          } else {
            return res.status(400).json({ message: "Invalid Credentials" });
          }
        }
      );
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

app.post("/addDetails", authenticateToken, async (req, res) => {
  try {
    const { title, desc } = req.body;
    const { id } = req.headers;
    const newDetails = new addDetails({
      title: title,
      desc: desc,
    });
    console.log(req.body);
    const saveTask = await newDetails.save();
    const Taskid = saveTask._id;
    await Signup.findByIdAndUpdate(id, { $push: { tasks: Taskid._id } });
    console.log("Successfully Added");
    res.status(201).json({ message: "Insertion Successful", isAdded: true });
  } catch (error) {
    console.log(error);
    res.status(201).json({ message: "Insertion Unsuccessful", isAdded: false });
  }
});

app.get("/getTask", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await Signup.findById(id).populate({
      path: "tasks",
      options: { sort: { createdAt: -1 } },
    });
    res.status(201).json({ data: userData });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

app.delete("/deleteTask/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers.id;
    await addDetails.findByIdAndDelete(id);
    await Signup.findByIdAndUpdate(userId, { $pull: { tasks: id } });
    res.status(201).json({ message: "Task deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

app.put("/UpdateTask/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;
    await addDetails.findByIdAndUpdate(id, { title: title, desc: desc });
    res.status(201).json({ message: "Task deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

app.put("/Update-Imp-Task/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const TaskData = await addDetails.findById(id);
    const ImpTask = TaskData.important;
    await addDetails.findByIdAndUpdate(id, { important: !ImpTask});
    res.status(201).json({ message: "Task deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

app.put("/Update-complete-Task/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const TaskData = await addDetails.findById(id);
    const CompTask = TaskData.complete;
    await addDetails.findByIdAndUpdate(id, { complete: !CompTask});
    res.status(201).json({ message: "Task deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});


app.get("/getImpTask", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const Data = await Signup.findById(id).populate({
      path: "tasks",
      match: {important: true},
      options: { sort: { createdAt: -1 } },
    });
    const ImpTask = Data.tasks;
    res.status(201).json({ data: ImpTask });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

app.get("/getCompTask", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const Data = await Signup.findById(id).populate({
      path: "tasks",
      match: {complete: true},
      options: { sort: { createdAt: -1 } },
    });
    const CompTask = Data.tasks;
    res.status(201).json({ data: CompTask });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

app.get("/getInCompTask", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const Data = await Signup.findById(id).populate({
      path: "tasks",
      match: {complete: false},
      options: { sort: { createdAt: -1 } },
    });
    const InCompTask = Data.tasks;
    res.status(201).json({ data: InCompTask });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log("Server Started Successfully");
});
