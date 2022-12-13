import React, { useContext, useState } from "react";
import MyUserContext from "../context/UserContext";

const Login = () => {
  const { login } = useContext(MyUserContext);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const email = e.target.email.value;
    const password = e.target.password.value;

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      setError("El formato del email es invalido");
      return;
    }
    /* if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    } */
    const response = await login(email, password);
    if (response === undefined) {
      setError("Tenemos un inconveniente por favor intente más tarde");
      return;
    }
    if (response.status === 401) {
      setError(response.data.response);
      return;
    } else if(response.status === 200) {
      setError(null);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("logged", true);
      localStorage.setItem("userName", response.data.user_name);
      localStorage.setItem("role", response.data.role);
      window.location.href = "/";
    } else{
      setError("Tenemos un inconveniente por favor intente más tarde");
    }
  }
  return (
    <section className="h-screen">
      <div className="px-6 h-full text-gray-800">
        <div
          className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
        >
          <div
            className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
          >
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="text-lg mb-0 mr-4">Ingresa</p>

              </div>

              <br />


              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="email"
                  placeholder="Correo"
                />
              </div>


              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="password"
                  placeholder="Contraseña"
                />
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}

              {/* <div className="flex justify-between items-center mb-6">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                id="exampleCheck2"
              />
              <label className="form-check-label inline-block text-gray-800" for="exampleCheck2"
                >Recuerdame</label>
              
            </div>
            {/* <a href="#!" className="text-gray-800">Olvidaste la contraseña?</a> 
          </div> */}

              <div className="text-center lg:text-left">
                <input
                  type="submit"
                  value={"Ingresar"}
                  className=" px-7 py-3 bg-blue-600 w-full font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                />

              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
