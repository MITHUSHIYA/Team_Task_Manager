import "./Sidebar.css";
import { CgNotes } from "react-icons/cg";
import { FaStar } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaRegTimesCircle } from "react-icons/fa";


const Sidebar = () => {
  const data = [
    { title: "All Tasks",icon:<CgNotes /> },
    { title: "Important Tasks" ,icon:<FaStar />},
    { title: "Comleted Tasks", icon:<IoCheckmarkDoneSharp /> },
    { title: "Incompleted Tasks", icon:<FaRegTimesCircle /> },
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
          <div className="items">{items.icon}
          {items.title}</div>
        ))}
      </div>
      <div>
        <button>Log Out</button>
      </div>
    </>
  );
};
export default Sidebar;
