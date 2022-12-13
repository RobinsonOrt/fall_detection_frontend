import React, { useState, useContext } from "react";
import ModalAddEmployee from "../components/ModalAddEmployee.js";
import ModalEditEmployee from "../components/ModalEditEmployee";
import ModalDeleteEmployee from "../components/ModalDeleteEmployee.js";
import { Link } from "react-router-dom";

import MyEmployeeContext from "../context/EmployeeContext.js";

const GestionEmployee = () => {
  const { useEmployees, setEmployee } = useContext(MyEmployeeContext);
  const { employees, isError, isLoading } = useEmployees();

  const [isModalAddEmployeeOpen, setIsModalAddEmployeeOpen] = useState(false);
  const [isModalEditEmployeeOpen, setIsModalEditEmployeeOpen] = useState(false);
  const [isModalDeleteEmployeeOpen, setIsModalDeleteEmployeeOpen] = useState(false);
 
  return (
    <div className="">
      <ModalAddEmployee
        isModalAddEmployeeOpen={isModalAddEmployeeOpen}
        setIsModalAddEmployeeOpen={setIsModalAddEmployeeOpen}
      />
      <ModalEditEmployee
        isModalEditEmployeeOpen={isModalEditEmployeeOpen}
        setIsModalEditEmployeeOpen={setIsModalEditEmployeeOpen}
      />
      <ModalDeleteEmployee
        isModalDeleteEmployeeOpen={isModalDeleteEmployeeOpen}
        setIsModalDeleteEmployeeOpen={setIsModalDeleteEmployeeOpen}
      />
      <div className="flex flex-row justify-between items-center px-5 pt-4 mb-4">
      <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>

        </Link>
        <h1 className="text-lg">Gestion de empleados</h1>
        
         <button className="bg-gray-800 hover:bg-gray-600 text-white font-semibold py-3 px-2 border border-gray-400 rounded shadow" onClick={() => setIsModalAddEmployeeOpen(true)}
        >Agregar empleado</button>
      </div>

      <div className="container mx-auto flex">
        <table className="table w-full border text-center mx-4">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Telefono</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {employees ? employees.length > 0 ? employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.last_name}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>
                  <button

                    className="w-full bg-gray-400 py-1 px-3 rounded-lg"
                    onClick={() => {
                      setEmployee(employee);
                      setIsModalEditEmployeeOpen(true);
                    }}
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    className="bg-red-400 w-full py-1 px-3 rounded-lg"
                    onClick={() => {
                      setEmployee(employee);
                      setIsModalDeleteEmployeeOpen(true);
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            )) : <tr><td>No hay empleados</td></tr> : <tr><td>Cargando...</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionEmployee;
