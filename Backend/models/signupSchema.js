const mdb = require("mongoose");

const signupSchema = mdb.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [{
    type: mdb.Types.ObjectId,
    ref: "addDetails",
  }],
});

const signup_scheme = mdb.model("signup", signupSchema);
module.exports = signup_scheme;
