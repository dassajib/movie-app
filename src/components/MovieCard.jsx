import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, release_date, vote_average } = movie
  const { user, toggleWatchlist, isInWatchlist } = useAuth()
  const navigate = useNavigate()

  const handleWatchlistClick = (e) => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
    } else {
      toggleWatchlist(movie)
    }
  }

  return (
    <div className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
      <Link to={`/movie/${id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          alt={title}
          className="w-full h-[400px] object-cover transform group-hover:scale-105 transition duration-300"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

        <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded shadow">
          ⭐ {vote_average?.toFixed(1) || 'N/A'}
        </div>

        <button
          onClick={handleWatchlistClick}
          className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 hover:bg-white text-red-600 font-medium text-xs px-3 py-1 rounded-full shadow transition"
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
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition duration-300 text-white">
          <h3 className="text-lg font-semibold truncate">{title}</h3>
          <p className="text-sm text-gray-200 mb-2">{release_date?.slice(0, 4) || 'Unknown Year'}</p>

          <Link
            to={`/movie/${id}`}
            className="inline-block mt-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded-full transition"
          >
            Details
          </Link>
        </div>
      </Link>
    </div>
  )
}

export default MovieCard
