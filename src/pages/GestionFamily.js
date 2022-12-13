import React, { useState, useContext } from "react";
import ModalAddFamily from "../components/ModalAddFamily.js";
import ModalEditFamily from "../components/ModalEditFamily.js";
import ModalConfirmDelete from "../components/ModalConfirmDelete.js";
import { Link } from "react-router-dom";



import MyUserContext from "../context/UserContext.js";

const GestionFamily = () => {
  const { useUsers, setUser } = useContext(MyUserContext);
  const { users, isError, isLoading } = useUsers();


  const [isModalAddFamilyOpen, setIsModalAddFamilyOpen] = useState(false);
  const [isModalEditFamilyOpen, setIsModalEditFamilyOpen] = useState(false);
  const [isModalConfirmDeleteOpen, setIsModalConfirmDeleteOpen] = useState(false);
  return (
    <div>
      <ModalAddFamily
        isModalAddFamilyOpen={isModalAddFamilyOpen}
        setIsModalAddFamilyOpen={setIsModalAddFamilyOpen}
      />
      <ModalEditFamily
        isModalEditFamilyOpen={isModalEditFamilyOpen}
        setIsModalEditFamilyOpen={setIsModalEditFamilyOpen}
      />

      <ModalConfirmDelete
        isModalConfirmDeleteOpen={isModalConfirmDeleteOpen}
        setIsModalConfirmDeleteOpen={setIsModalConfirmDeleteOpen}
      />

      <div className="flex flex-row justify-between items-center px-5 pt-4 mb-4">
        <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>

        </Link>
        <h1 className="text-lg">Gestion de Familiares</h1>

        <button
          className="bg-gray-800 hover:bg-gray-600 text-white font-semibold py-3 px-2 border border-gray-400 rounded shadow "
          onClick={() => setIsModalAddFamilyOpen(true)}
        >
          Agregar Familiar
        </button>
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
            {users ? users.length > 0 ? users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td><button className="w-full bg-gray-400 py-1 px-3 rounded-lg" onClick={async () => { await setUser(user); setIsModalEditFamilyOpen(true) }}>Editar</button></td>
                <td><button className="bg-red-400 w-full py-1 px-3 rounded-lg" onClick={() => { setUser(user); setIsModalConfirmDeleteOpen(true) }}>Eliminar</button></td>
              </tr>
            )) : <tr><td>No hay usuarios</td></tr> : <tr><td>Cargando...</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GestionFamily;
