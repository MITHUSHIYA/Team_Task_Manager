import { useState } from "react";
import Card from "../grid/Card";
import InputData from "../grid/InputData";
import { IoMdAddCircle } from "react-icons/io";
import "./AllTask.css"
const AllTask = () => {
  const styling = {
    width: "100%",
    display: "flex",
    justifyContent: "end",
    padding: "5px",
  };
  const [InputDiv, setInputdiv] = useState("hidden");
  return (
    <>
      <div>
        <h1>All Tasks</h1>
        <div style={styling}>
          <button
            style={{ backgroundColor: "black", fontSize: "25px" }}
            onClick={() => setInputdiv("fixed")}
          >
            <IoMdAddCircle />
          </button>
        </div>
        <Card home={true} setInputdiv={setInputdiv} showImportantOnly={false} showCompOnly={false} showInCompOnly={false}/>
      </div>
      <InputData InputDiv={InputDiv} setInputdiv={setInputdiv}/>
    </>
  );
};
export default AllTask;
