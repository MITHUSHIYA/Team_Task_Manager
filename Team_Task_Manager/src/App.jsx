import React from "react";
import Home from "./Componenets/Home";
import AllTask from "./Componenets/AllTask";
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
            </Route>
          </Routes>
        
      </main>
      </BrowserRouter>
    </>
  );
}

export default App;
