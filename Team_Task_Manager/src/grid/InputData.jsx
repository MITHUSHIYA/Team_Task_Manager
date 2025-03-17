import { useState } from "react";
import "./InputData.css";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const InputData = ({ InputDiv, setInputdiv }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const username = localStorage.getItem("username");
  const handleInsertion = async (event) => {
    event.preventDefault();
    if (!username) {
      alert("User not logged in. Please log in to add tasks.");
      return;
    }
    try {
      const req = await axios.post("https://team-task-manager-iyoo.onrender.com/addDetails", {
        title: title,
        desc: desc,
        username: username,
      });
      const msg = req.data.message;
      const isAdded = req.data.isAdded;
      if (isAdded) {
        alert(req.data.message);
        setTitle("");
        setDesc("");
      } 

      alert(msg);
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className={`${InputDiv} Input`}></div>
      <div className={`${InputDiv} Data`}>
        <div className="box">
          <div onClick={() => setInputdiv("hidden")} className="close-btn">
            <RxCross2 />
          </div>
          <form onSubmit={handleInsertion}>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              type="text"
              placeholder="Title"
              name="title"
              className="input"
            />
            <textarea
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              name="desc"
              placeholder="Description..."
              cols={"30"}
              rows={"10"}
              className="input"
            ></textarea>
            <button className="submit-btn">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default InputData;
