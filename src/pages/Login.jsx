import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { app } from '../firebase'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import toast from 'react-hot-toast'
import PageWrapper from '../components/PageWrapper'
import { getFirebaseAuthErrorMessage } from '../utils/errorMessages'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const auth = getAuth(app)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Logged in successfully!')
      navigate('/movies')
    } catch (error) {
      const errMessage = getFirebaseAuthErrorMessage(error.code)
      toast.error(errMessage)
    }
  }

  return (
    <PageWrapper>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white/30 backdrop-blur-md shadow-lg rounded-xl p-8 w-full max-w-md space-y-6"
        >
          <h2 className="text-3xl font-bold text-white text-center drop-shadow">Welcome Back</h2>

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
            className="w-full py-2 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow"
          >
            Log In
          </button>

          <p className="text-center text-white text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="underline font-medium hover:text-gray-200">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </PageWrapper>
  )
}

export default Login