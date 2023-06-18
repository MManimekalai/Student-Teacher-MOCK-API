import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import TeachersList from "./Components/TeachersList";
import StudentsList from "./Components/StudentsList";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import AddStudent from "./Components/AddStudent";

function App() {
   return (
    <Router>
      <div id="wrapper">
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/teacherslist" element={<TeachersList/>} />
          <Route
            path="/studentslist"
            element={<StudentsList/>}
          />
          <Route path="/addstudent" element={<AddStudent/>} />
          <Route path="/edit-student/:id" element={<AddStudent/>} />
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;