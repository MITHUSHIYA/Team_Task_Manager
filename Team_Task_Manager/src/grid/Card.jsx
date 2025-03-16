import { useState, useEffect } from "react";
import axios from "axios";
import "./Card.css";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

const Card = ({ home, setInputdiv }) => {
  const [tasks, setTasks] = useState([]);
  const username = localStorage.getItem("username") || "";

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!username) {
          console.error("User not logged in.");
          return;
        }

        const response = await axios.get("http://localhost:3003/getTask", {
          params: { username },
        });

        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [username]);

  const handleDelete = async (taskId) => {
    try {
      if (!username) {
        alert("User not logged in. Please log in to delete tasks.");
        return;
      }

      const response = await axios.delete(
        `http://localhost:3003/deleteTask/${taskId}?username=${username}`
      );

      if (response.status === 200) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        alert("Task deleted successfully!");
      } else {
        alert("Failed to delete task.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Error deleting task. Please try again.");
    }
  };

  const toggleComplete = async (taskId) => {
    try {
      const response = await axios.put(`http://localhost:3003/toggleComplete/${taskId}`);
      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, complete: !task.complete } : task
          )
        );
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      alert("Error updating task. Please try again.");
    }
  };

  const toggleImportant = async (taskId) => {
    try {
      const response = await axios.put(`http://localhost:3003/toggleImportant/${taskId}`);
      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, important: !task.important } : task
          )
        );
      }
    } catch (error) {
      console.error("Error updating task importance:", error);
      alert("Error updating task. Please try again.");
    }
  };

  return (
    <>
      <div className="list">
        {tasks.length > 0 ? (
          tasks.map((item) => (
            <div key={item._id} className="list-item">
              <div>
                <h2>{item.title}</h2>
                <p>{item.desc}</p>
              </div>
              <div className="status">
                <button className="btn" onClick={() => toggleComplete(item._id)}>
                  {item.complete ? "Complete" : "Incomplete"}
                </button>
                <div className="icons">
                  <button onClick={() => toggleImportant(item._id)}>
                    <CiHeart color={item.important ? "red" : "gray"} />
                  </button>
                  <button onClick={() => handleDelete(item._id)}>
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No tasks found.</p>
        )}

        {home === true && (
          <div className="add">
            <button className="add-btn" onClick={() => setInputdiv("fixed")}>
              <IoMdAddCircle />
            </button>
            <h2>Add More Task</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
