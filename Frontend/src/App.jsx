import React from "react";
import Home from "./Componenets/Home";
import AllTask from "./Componenets/AllTask";
import ImportantTask from "./Componenets/ImportantTask";
import CompleteTask from "./Componenets/CompleteTask";
import IncompleteTask from "./Componenets/IncompleteTask";
import Signup from "./Pages/Signup";
import Login from "./Pages/login";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <main className="Main_container">
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<AllTask />}></Route>
              <Route path="/importantTask" element={<ImportantTask />} />
              <Route path="/completeTask" element={<CompleteTask />} />
              <Route path="/incompleteTask" element={<IncompleteTask />} />
            </Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
