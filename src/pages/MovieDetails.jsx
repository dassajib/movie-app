import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { AiOutlineStar, AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai'

const MovieDetails = () => {
  const [movie, setMovie] = useState(null)
  const { user, toggleWatchlist, isInWatchlist } = useAuth()
  const { id } = useParams()
  const navigate = useNavigate()

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.error(err))
  }, [id])

  if (!movie) return <p className="p-8 text-center text-gray-600">Loading...</p>

  const inWatchlist = isInWatchlist(movie.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:text-blue-800 font-semibold transition"
      >
        ← Back
      </button>

      <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-2xl shadow-lg p-6">
        <div className="w-full lg:w-96 mx-auto">
          <img
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            alt={movie.title}
            className="rounded-xl w-full h-auto object-cover shadow-md"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">{movie.title}</h1>

            <div className="text-gray-700 space-y-4 text-sm sm:text-base">
              <p>
                <span className="font-semibold">Genres:</span>{' '}
                {movie.genres.map((g) => g.name).join(', ')}
              </p>
              <p>
                <span className="font-semibold">Release Date:</span> {movie.release_date}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold flex items-center gap-1">
                  <AiOutlineStar className="text-yellow-400" /> Rating:
                </span>
                {movie.vote_average} / 10
              </p>
              <p className="leading-relaxed">
                <span className="font-semibold">Overview:</span> {movie.overview}
              </p>
            </div>
          </div>

          {user && (
            <div className="mt-6">
              <button
                onClick={() => toggleWatchlist(movie)}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-white font-semibold shadow-lg transition
                  ${inWatchlist
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'}
                `}
              >
                {inWatchlist ? (
                  <>
                    <AiOutlineCheck size={20} />
                    Remove from Watchlist
                  </>
                ) : (
                  <>
                    <AiOutlinePlus size={20} />
                    Add to Watchlist
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieDetails