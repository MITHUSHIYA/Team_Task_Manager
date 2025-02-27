import "./Card.css";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

const Card = ({home,setInputdiv}) => {
  const data = [
    { title: "Item 1", desc: "gdfbfdbnbvnvb", status:"Incomplete" },
    { title: "Item 2", desc: "nbdsdfghjkj", status:"Complete" },
    { title: "Item 3", desc: "jnkjdfsaretryftguyh", status:"Incomplete" },
    { title: "Item 4", desc: "fdsgfgfhfgf", status:"Incomplete" },
  ];

  return (
    <>
      <div className="list">
        {data &&
          data.map((items, i) => (
            <div className="list-item">
              <div>
                <h2>{items.title}</h2>
                <p>{items.desc}</p>
              </div>
              <div className="status">
                <button className="btn">{items.status}</button>
                <div className="icons">
                  <button>
                    <CiHeart />
                  </button>
                  <button>
                    <FaEdit />
                  </button>
                  <button>
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {home === true &&
        (<div className="add">
          <button className="add-btn" onClick={()=>setInputdiv("fixed")}><IoMdAddCircle /></button>
          <h2>Add More Task</h2>
        </div>)}
      </div>
    </>
  );
};
export default Card;
