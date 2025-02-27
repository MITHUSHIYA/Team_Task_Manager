import "./Sidebar.css";
import { CgNotes } from "react-icons/cg";
import { FaStar } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaRegTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const data = [
    { title: "All Tasks", icon: <CgNotes />, link:"/"},
    { title: "Important Tasks", icon: <FaStar />, link:"/importantTask" },
    { title: "Comleted Tasks", icon: <IoCheckmarkDoneSharp />, link:"/completeTask" },
    { title: "Incompleted Tasks", icon: <FaRegTimesCircle />, link:"/incompleteTask" },
  ];
  return (
    <>
      <div>
        <h2 className="items_1"> Team Task Manager</h2>
        <h4 className="items_2">abc@gmail.com</h4>
        <hr />
      </div>
      <div>
        {data.map((items, i) => (
          <Link to={items.link} key={i} className="items">
            {items.icon}
            {items.title}
          </Link>
        ))}
      </div>
      <div>
        <button>Log Out</button>
      </div>
    </>
  );
};
export default Sidebar;
