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
  const username = localStorage.getItem("username");
  return (
    <>
      <div>
        <h2 className="items_1">Team Manager</h2>
        <h4 className="items_2">{username}</h4>
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
        <button className="login-btn"><Link to='/welcome' className="link">Log Out</Link></button>
      </div>
    </>
  );
};
export default Sidebar;
