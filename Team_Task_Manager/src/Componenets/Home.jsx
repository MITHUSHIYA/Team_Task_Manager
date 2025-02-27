import "./Home.css";
import Sidebar from "./Sidebar";
const Home = () => {
  return (
    <div className="container">
      <div className="item_1">
        <Sidebar />
      </div>
      <div className="item_2">home</div>
    </div>
  );
};

export default Home;
