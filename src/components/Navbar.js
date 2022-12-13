import "../css/navbar.css";



export function Navbar({ username }) {
  const logout = () => {
    localStorage.removeItem("logged");
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    window.location.assign("/");
  };
  return (
    <header className="nav-header font-bold p-2 mb-3 shadow-black-500">
      <p className="nav-p">{username}</p>
      <h1 className="nav-h1"> Fall detection</h1>
      <button onClick={()=>logout()} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Salir</button>
    </header>
  );
}
