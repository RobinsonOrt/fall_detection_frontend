import React, { useContext, useState } from "react";
import { Modal } from "flowbite-react";
import MyUserContext from "../context/UserContext";

const ModalConfirmDelete = ({
  isModalConfirmDeleteOpen,
  setIsModalConfirmDeleteOpen,
}) => {
  const { deleteUser, user } = useContext(MyUserContext);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    const response = await deleteUser(user.user_id);
    if (response === undefined) {
      setError("Tenemos un inconveniente por favor intente más tarde");
      return;
    }
    if (response.status === 401) {
      setError(response.data.response);
    } else if (response.status === 200) {
      setError(null);
      setIsModalConfirmDeleteOpen(false);
    } else {
      setError("Tenemos un inconveniente por favor intente más tarde");
    }
    
  };
  return (
    <Modal show={isModalConfirmDeleteOpen}>
      <div className="flex flex-col   p-4" >
        <div className="flex justify-between items-center mb-5">
          <div className="break-all font-bold justify-center flex flex-auto ">Eliminar</div>
          <button
            onClick={() => setIsModalConfirmDeleteOpen(false)}
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
        <h1 className="p-2  justify-center flex ">¿Seguro?, esta acción es irreversible</h1>
        <br></br>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <button onClick={()=>{handleDelete()}} className="bg-gray-800 hover:bg-red-800 text-white font-semibold p-2 border border-gray-400" >Eliminar</button>
        <button className="bg-gray-800 hover:bg-red-800 text-white font-semibold p-2 border border-gray-400"   
            onClick={() => setIsModalConfirmDeleteOpen(false)}
          >
            Cancelar
          </button>
      </div>
      
    </Modal>
  );
};

export default ModalConfirmDelete;