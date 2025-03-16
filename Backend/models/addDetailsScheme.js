const mdb = require("mongoose");

const addDetailsSchema = new mdb.Schema(
  {
    username: {
      type: String,
      required: true, 
    },
    title: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

const new_add = mdb.model("addDetails", addDetailsSchema);
module.exports = new_add;
