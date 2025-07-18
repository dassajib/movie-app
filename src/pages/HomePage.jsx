import { useState } from 'react'
import { FaFire } from 'react-icons/fa'
import { BiSolidMoviePlay } from 'react-icons/bi'
import { motion } from 'framer-motion'

import { useMovies } from '../hooks/useMovies'
import MovieCard from '../components/MovieCard'
import MovieSkeleton from '../components/MovieSkeleton'

const HomePage = () => {
  const [query, setQuery] = useState('')
  const {
    popular,
    trending,
    results,
    loading,
    error,
    handleSearch,
  } = useMovies()

  const onSearch = () => {
    handleSearch(query)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-2"
    >
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto bg-white rounded-xl shadow-md p-4 sm:p-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm sm:text-base"
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          aria-label="Search movies"
        />
        <button
          onClick={onSearch}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold text-sm sm:text-base"
          aria-label="Search"
        >
          Search
        </button>
      </div>

      {/* Loading Skeleton */}
      {(loading.search || loading.popular || loading.trending) && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {[...Array(10)].map((_, index) => (
            <MovieSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-center text-red-600 font-semibold text-lg">{error}</p>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <section className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 border-b-2 border-blue-600 pb-2">
            Search Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}

      {/* Trending Movies */}
      <section className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold mb-4 sm:mb-5 border-b-2 border-orange-500 pb-2">
          <FaFire size={24} className="text-orange-500" />
          Trending Movies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {trending.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Popular Movies */}
      <section className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold mb-4 sm:mb-5 border-b-2 border-blue-600 pb-2">
          <BiSolidMoviePlay size={24} className="text-blue-600" />
          Popular Movies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {popular.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </motion.div>
  )
}

export default HomePage