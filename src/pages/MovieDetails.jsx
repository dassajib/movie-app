import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import {
  AiOutlineStar,
  AiOutlinePlus,
  AiOutlineCheck,
} from 'react-icons/ai'
import { useAuth } from '../context/AuthContext'
import PageWrapper from "../components/PageWrapper"

const MovieDetails = () => {
  const [movie, setMovie] = useState(null)
  const { user, toggleWatchlist, isInWatchlist } = useAuth()
  const { id } = useParams()
  const navigate = useNavigate()

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY
  const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.error(err))
  }, [id])

  const handleWatchlistToggle = () => {
    toggleWatchlist(movie)
    toast.success(inWatchlist ? 'Removed from Watchlist' : 'Added to Watchlist')
  }

  if (!movie)
    return (
      <p className="p-8 text-center text-gray-600 text-lg font-medium">
        Loading movie details...
      </p>
    )

  const inWatchlist = isInWatchlist(movie.id)

  return (
    <PageWrapper>
      <div className="relative bg-gradient-to-br from-gray-900 via-slate-800 to-gray-950 min-h-screen text-white">
        {/* backdrop img blur */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <button
            onClick={() => navigate(-1)}
            className="mb-8 text-blue-400 hover:text-white font-semibold transition duration-200 underline underline-offset-4"
          >
            ← Back
          </button>

          <div className="flex flex-col lg:flex-row gap-10 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 lg:p-10">
            <div className="w-full lg:w-80 shrink-0 mx-auto">
              <img
                src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                alt={movie.title}
                className="rounded-xl w-full h-auto object-cover shadow-xl border-4 border-white/20"
              />
            </div>

            {/* details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-white drop-shadow">
                  {movie.title}
                </h1>

                {movie.tagline && (
                  <p className="text-lg italic text-blue-200 mb-4">
                    “{movie.tagline}”
                  </p>
                )}

                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genres.map((g) => (
                    <span
                      key={g.id}
                      className="bg-blue-600/80 px-3 py-1 rounded-full text-xs font-semibold shadow hover:scale-105 transition"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm sm:text-base text-white/90">
                  <p>
                    <span className="font-semibold">Release Date:</span>{' '}
                    {movie.release_date}
                  </p>

                  <p className="flex items-center gap-2">
                    <AiOutlineStar className="text-yellow-400" />
                    <span className="font-semibold">Rating:</span>{' '}
                    {movie.vote_average} / 10
                  </p>

                  <p>
                    <span className="font-semibold">Runtime:</span>{' '}
                    {movie.runtime} minutes
                  </p>

                  <p>
                    <span className="font-semibold">Budget:</span>{' '}
                    {movie.budget > 0
                      ? `$${movie.budget.toLocaleString()}`
                      : 'N/A'}
                  </p>

                  <p>
                    <span className="font-semibold">Revenue:</span>{' '}
                    {movie.revenue > 0
                      ? `$${movie.revenue.toLocaleString()}`
                      : 'N/A'}
                  </p>

                  <p>
                    <span className="font-semibold">Languages:</span>{' '}
                    {movie.spoken_languages
                      .map((lang) => lang.english_name)
                      .join(', ')}
                  </p>

                  <p className="col-span-2">
                    <span className="font-semibold">Production:</span>{' '}
                    {movie.production_companies.length > 0
                      ? movie.production_companies
                        .map((c) => c.name)
                        .join(', ')
                      : 'N/A'}
                  </p>

                  {movie.homepage && (
                    <p className="col-span-2">
                      <span className="font-semibold">Official Site:</span>{' '}
                      <a
                        href={movie.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 underline hover:text-white"
                      >
                        {movie.homepage}
                      </a>
                    </p>
                  )}

                  <p className="col-span-2 mt-4 leading-relaxed text-white">
                    <span className="font-semibold block mb-1">
                      Overview:
                    </span>
                    {movie.overview}
                  </p>
                </div>
              </div>

              {/* watchlist btn */}
              {user && (
                <div className="mt-8">
                  <button
                    onClick={handleWatchlistToggle}
                    className={`group w-full sm:w-auto flex items-center justify-center gap-2 rounded-full px-5 sm:px-6 py-3 sm:py-3.5 font-semibold shadow-md transition-all duration-300 text-white text-sm sm:text-base
                  ${inWatchlist
                        ? 'bg-red-600 hover:bg-red-700 active:scale-95'
                        : 'bg-green-600 hover:bg-green-700 active:scale-95'
                      }`}
                  >
                    {inWatchlist ? (
                      <>
                        <AiOutlineCheck size={20} className="transition-transform group-hover:scale-110" />
                        <span>Remove from Watchlist</span>
                      </>
                    ) : (
                      <>
                        <AiOutlinePlus size={20} className="transition-transform group-hover:scale-110" />
                        <span>Add to Watchlist</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default MovieDetails
