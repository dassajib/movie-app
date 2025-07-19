import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import toast from 'react-hot-toast'
import PageWrapper from './PageWrapper'
import { motion } from 'framer-motion'

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, release_date, vote_average } = movie
  const { user, toggleWatchlist, isInWatchlist } = useAuth()
  const navigate = useNavigate()

  const handleWatchlistClick = (e) => {
    e.preventDefault()

    if (!user) {
      navigate('/login')
      toast.error('Please login to manage your watchlist.')
    } else {
      const added = !isInWatchlist(id)
      toggleWatchlist(movie)
      toast.success(
        added
          ? `"${title}" added to watchlist`
          : `"${title}" removed from watchlist`
      )
    }
  }

  return (
    <PageWrapper>
      <motion.div
        whileHover={{ scale: 1.03, boxShadow: "0 15px 25px rgba(0,0,0,0.3)" }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative group rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-lg"
      >
        <Link to={`/movie/${id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w300${poster_path}`}
            alt={title}
            className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110"
          />
        </Link>

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

        <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded shadow">
          ⭐ {vote_average?.toFixed(1) || 'N/A'}
        </div>

        {/* watchlist btn */}
        <motion.button
          onClick={handleWatchlistClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 hover:bg-white text-red-600 font-medium text-xs px-3 py-1 rounded-full shadow transition-all duration-300 transform"
          aria-label={isInWatchlist(id) ? "Remove from watchlist" : "Add to watchlist"}
        >
          {isInWatchlist(id) ? (
            <>
              <FaHeart size={12} />
              <span>In Watchlist</span>
            </>
          ) : (
            <>
              <FaRegHeart size={12} />
              <span>Watchlist</span>
            </>
          )}
        </motion.button>

        {/* movie details */}
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition duration-300 text-white">
          <h3 className="text-lg font-semibold truncate">{title}</h3>
          <p className="text-sm text-gray-200 mb-2">
            {release_date?.slice(0, 4) || 'Unknown Year'}
          </p>

          <Link
            to={`/movie/${id}`}
            className="absolute top-10 right-2 flex items-center gap-1 bg-white/90 hover:bg-white text-red-600 font-medium text-xs px-3 py-1 rounded-full shadow transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Details
          </Link>
        </div>
      </motion.div>
    </PageWrapper>
  )
}

export default MovieCard