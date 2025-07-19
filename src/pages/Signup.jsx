import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { app } from '../firebase'
import toast from 'react-hot-toast'
import PageWrapper from '../components/PageWrapper'
import { FiEye, FiEyeOff } from 'react-icons/fi'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const auth = getAuth(app)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      toast.success('Account created successfully! Please log in.')
      navigate('/login')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <PageWrapper>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-500 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white/30 backdrop-blur-md shadow-lg rounded-xl p-8 w-full max-w-md space-y-6"
        >
          <h2 className="text-3xl font-bold text-white text-center drop-shadow">
            Create Your Account
          </h2>

          <div>
            <label className="text-white text-sm block mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-white/30 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
          </div>

          <div className="relative">
            <label className="text-white text-sm block mb-1">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-white/30 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] text-white/80 hover:text-white transition focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow"
          >
            Sign Up
          </button>

          <p className="text-center text-white text-sm">
            Already have an account?{' '}
            <Link to="/login" className="underline font-medium hover:text-gray-200">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </PageWrapper>
  )
}

export default Signup