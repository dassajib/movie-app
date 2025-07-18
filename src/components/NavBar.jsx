import { useState } from "react"
import { Link } from "react-router-dom"
import { BiCameraMovie } from "react-icons/bi"
import { FiMenu, FiX } from "react-icons/fi"
import { useAuth } from "../context/AuthContext"

const NavBar = () => {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link
            to="/movies"
            className="flex items-center gap-2 text-xl font-extrabold tracking-wide hover:text-blue-500 transition"
            aria-label="MovieHub Home"
          >
            <BiCameraMovie size={26} />
            <span>MovieHub</span>
          </Link>

          <div className="hidden md:flex gap-6 text-lg font-medium">
            <Link to="/movies" className="hover:text-blue-400 transition">Movies</Link>
            <Link to="/watchlist" className="hover:text-blue-400 transition">Watchlist</Link>
          </div>
        </div>

        <div className="hidden md:flex items-center min-h-[40px]">
          {user ? (
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Logout"
              style={{ minWidth: '100px' }}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Login"
            >
              Login
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
            {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4 text-center text-lg font-medium">
          <Link to="/movies" className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>Movies</Link>
          <Link to="/watchlist" className="block hover:text-blue-400" onClick={() => setMenuOpen(false)}>Watchlist</Link>

          {user ? (
            <button
              onClick={() => {
                logout()
                setMenuOpen(false)
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default NavBar