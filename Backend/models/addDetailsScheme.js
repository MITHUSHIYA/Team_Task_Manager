const mdb = require("mongoose");

const addDetailsSchema = mdb.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  important: {
    type: Boolean,
    default: false,
  },
  complete: {
    type: Boolean,
    default: false,
  },
},{timestamps:true});

const new_add = mdb.model("addDetails", addDetailsSchema);
module.exports = new_add;
