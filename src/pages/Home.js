import React, { useState } from "react";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { Detector } from "../components/FallDetection";
import axios from "axios";
import { API } from "../config";

import "../css/home.css";

const Home = () => {
  const [error, setError] = useState(null);
  return (
    <div className="">
      <Navbar username={localStorage.getItem("userName")} />
      <div className="flex flex-row">
        
        <div className="w-full px-6">
          <Detector />
          {error&&<div className="text-red-500 text-center">{error}</div>}
        </div>
        {localStorage.getItem("role") === "1" ? (
        <div className="flex flex-col justify-between my-12 mx-4">
          <Button text="Gestionar Empleados" onClick={()=> window.location.assign('/empleados')}/>
          <Button text="Gestionar Familiares" onClick={()=> window.location.assign('/familiares')}/>
          <Button text="Activar Alarma" onClick={async()=>await axios.get(`${API}/alarm`).then((res)=>setError(null)).catch((error)=>setError("No se ha podido activar la alarma, intente nuevamente"))}/>
        </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
