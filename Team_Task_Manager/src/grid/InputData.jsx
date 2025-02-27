import "./InputData.css";
import { RxCross2 } from "react-icons/rx";

const InputData = ({InputDiv,setInputdiv}) => {
  return (
    <>
      <div className={`${InputDiv} Input`}></div>
      <div className={`${InputDiv} Data`}>
        <div className="box">
        <div className="exit" onClick={()=>setInputdiv("hidden")}><RxCross2 /></div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="input"
          />
          <textarea
            name="desc"
            placeholder="Description..."
            cols={"30"}
            rows={"10"}
            className="input"
          ></textarea>
          <button className="submit-btn">Submit</button>
        </div>
      </div>
    </>
  );
};

export default InputData;
