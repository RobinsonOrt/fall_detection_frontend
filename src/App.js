import React from "react";
import Home from "./pages/Home";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GestionEmployee from "./pages/GestionEmployee";
import GestionFamily from "./pages/GestionFamily";
import Login from "./pages/Login";

import { MyUserProvider } from "./context/UserContext";
import { MyEmployeeProvider } from "./context/EmployeeContext";


function App() {
  return (
    <MyUserProvider>
    <MyEmployeeProvider>
      <Router>
          <Routes>
            {localStorage.getItem("logged") ? (
              <>
                
                <Route path="/" element={<Home />} />
                <Route path="/empleados" element={<GestionEmployee />} />
                <Route path="/familiares" element={<GestionFamily />} />
              </>
            ) : (

              
              <Route path="*" element={<Login />} />
            )}
              {/* <Route path="/" element={<Login/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/empleados" element={<GestionEmployee/>}/>
              <Route path="/familiares" element={<GestionFamily/>}/> */}
          </Routes>
      </Router>
    </MyEmployeeProvider>
    </MyUserProvider>
  );
}

export default App;
