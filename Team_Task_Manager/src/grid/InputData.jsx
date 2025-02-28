import { useState } from "react";
import "./InputData.css";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const InputData = ({ InputDiv, setInputdiv }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleInsertion = async (event) => {
    event.preventDefault();
    const req = await axios.post("http://localhost:3003/addDetails", {
      title: title,
      desc: desc,
    });
    const msg = req.data.message;
    const isAdded = req.data.isAdded;

    alert(msg);
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
