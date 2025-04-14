import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";



const NavBar = () => {
  const { handleLogout, isAuthenticated } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-center items-center w-full">
        <ul className="flex space-x-6 text-white">
          <li>
            <Link to="/" className="hover:bg-indigo-500 px-3 py-2 rounded-md text-lg font-medium">
              Home
            </Link>
          </li>
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/login" className="hover:bg-indigo-500 px-3 py-2 rounded-md text-lg font-medium">
                  Se connecter
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:bg-indigo-500 px-3 py-2 rounded-md text-lg font-medium">
                  S'inscrire
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                  <Link to="/addRecipe" className="hover:bg-indigo-500 px-3 py-2 rounded-md text-lg font-medium">
                    Ajouter
                  </Link>
                </li>
              <li>
                <Link
                  onClick={handleLogout}  // On appelle handleLogout au clic
                  className="hover:bg-indigo-500 px-3 py-2 rounded-md text-lg font-medium"
                >
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;

