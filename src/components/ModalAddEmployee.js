import React, { useContext, useState } from 'react'
import { Modal } from "flowbite-react";

import MyEmployeeContext from "../context/EmployeeContext";
const ModalAddEmployee = ({
  isModalAddEmployeeOpen,
  setIsModalAddEmployeeOpen,
}) => {
  const { addEmployee } = useContext(MyEmployeeContext);

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const name = e.target.name.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;

    //name and lastname are required, between 1 and 24 characters, no special characters, yes numbers
    const nameRegex = /^[a-zA-Z0-9 ]{1,24}$/;
    if (!nameRegex.test(name)) {
      setError("El nombre es invalido");
      return;
    }
    if (!nameRegex.test(lastName)) {
      setError("El apellido es invalido");
      return;
    }

    //email is required, between 1 and 32 characters, correct format
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      setError("El formato del email es invalido");
      return;
    }

    //phone is required, between 10 and 12 characters, just numbers
    const phoneRegex = /^[0-9]{10,12}$/;
    if (!phoneRegex.test(phone)) {
      setError("El formato del telefono es invalido");
      return;
    }

    const employee = {
      'name': name,
      'last_name': lastName,
      'email': email,
      'phone': phone,
    }

    const response = await addEmployee(employee);
    if (response === undefined) {
      setError("Tenemos un inconveniente por favor intente más tarde");
      return;
    }
    if (response.status === 401) {
      setError(response.data.response);
    } else if (response.status === 200) {
      setError(null);
      //reset form
      e.target.reset();

      setIsModalAddEmployeeOpen(false);
    } else {
      setError("Tenemos un inconveniente por favor intente más tarde");
    }
  }
  return (
    <Modal show={isModalAddEmployeeOpen}>
      <div className="flex flex-col p-8">
        <div className="flex justify-between items-center mb-5">
          <div className="break-all font-bold justify-center flex flex-auto ">Agregar Empleado</div>
          <button
            onClick={() => setIsModalAddEmployeeOpen(false)}
            className=" ml-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="gray"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label >Nombre:</label>
          <input id="name" required placeholder="Camilo" type='text' className="rounded-xl w-full" />
          <label >Apellido:</label>
          <input id='lastName' required placeholder="Ramirez" type='text' className="rounded-xl w-full" />
          <label >Email:</label>
          <input id='email' required placeholder="camilo@mail.com" type='text' className="rounded-xl w-full" />
          <label >Teléfono:</label>
          <input id='phone' required placeholder="3244355554" type='text' className="rounded-xl w-full" />
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          <input type="submit" className="w-full bg-gray-800 font-semibold p-2 border border-gray-400 mt-2" value="Agregar" />
        </form>
        <button className="bg-gray-800 hover:bg-red-800 text-white font-semibold p-2 border border-gray-400 mt-2"
          onClick={() => setIsModalAddEmployeeOpen(false)}
        >
          Cancelar
        </button>
      </div>

    </Modal>
  );
};

export default ModalAddEmployee;
