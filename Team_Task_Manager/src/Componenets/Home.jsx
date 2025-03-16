import "./Home.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Home = () => {
  return (
    <div className="container">
      <div className="item_1">
        <Sidebar />
      </div>
      <div className="item_2">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Home;
