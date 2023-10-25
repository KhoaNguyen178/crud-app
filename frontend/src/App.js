import React from "react";

import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Layout/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import AddStudent from "./students/AddStudent";
import UpdateStudent from "./students/UpdateStudent";
import ReadStudent from "./students/ReadStudent";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import BoardUser from "./pages/BoardUser";
import BoardModerator from "./pages/BoardModerator";
import BoardAdmin from "./pages/BoardAdmin";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/user" element={<BoardUser />} />
        <Route exact path="/mod" element={<BoardModerator />} />
        <Route exact path="/admin" element={<BoardAdmin />} />
        <Route exact path="/add-student" element={<AddStudent />} />
        <Route exact path="/update-student/:id" element={<UpdateStudent />} />
        <Route exact path="/read-student/:id" element={<ReadStudent />} />
      </Routes>
    </div>
  );
};

export default App;
