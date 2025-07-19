import { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { BiCameraMovie } from "react-icons/bi"
import { FiMenu, FiX } from "react-icons/fi"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"
import { motion, AnimatePresence } from "framer-motion"

const NavBar = () => {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully")
    setMenuOpen(false)
  }

  // Lock scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  // Close menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [menuOpen])

  const drawerVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 25,
      },
    },
    exit: {
      x: "100%",
      transition: { duration: 0.25, ease: "easeInOut" },
    },
  }

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* menu */}
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
            <Link to="/movies" className="hover:text-blue-400 transition">
              Movies
            </Link>
            <Link to="/watchlist" className="hover:text-blue-400 transition">
              Watchlist
            </Link>
          </div>
        </div>

        {/* login logout buttons */}
        <div className="hidden md:flex items-center min-h-[40px]">
          {user ? (
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(220,38,38,0.4)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Logout"
              style={{ minWidth: "100px" }}
            >
              Logout
            </motion.button>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 8px 15px rgba(59,130,246,0.4)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ minWidth: "100px" }}
            >
              <Link
                to="/login"
                className="block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
                aria-label="Login"
              >
                Login
              </Link>
            </motion.div>
          )}
        </div>

        {/* moblie menu */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            className="text-white"
          >
            {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* mobile menu sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* sidebar content */}
            <motion.div
              ref={menuRef}
              key="mobile-drawer"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={drawerVariants}
              className="fixed top-0 right-0 w-72 h-full z-50 bg-black/70 backdrop-blur-md border-l border-white/20 text-white p-8 shadow-xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-bold tracking-wide">Menu</h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close Menu"
                  className="text-white hover:text-red-500 transition"
                >
                  <FiX size={28} />
                </button>
              </div>

              <nav className="flex flex-col gap-8 text-lg font-semibold">
                <Link
                  to="/movies"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-blue-400 transition"
                >
                  Movies
                </Link>

                <Link
                  to="/watchlist"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-blue-400 transition"
                >
                  Watchlist
                </Link>
              </nav>

              <div className="mt-auto">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full mt-10 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-3 rounded-lg shadow-lg transition"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full text-center mt-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg shadow-lg transition"
                  >
                    Login
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default NavBar