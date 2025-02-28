const mdb = require("mongoose");

const addDetailsSchema = mdb.Schema({
  title: String,
  desc: String,
});

const new_add = mdb.model("addDetails", addDetailsSchema);
module.exports = new_add;
