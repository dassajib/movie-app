import { useState } from 'react'
import { FaFire } from 'react-icons/fa'
import { BiSolidMoviePlay } from 'react-icons/bi'
import { motion } from 'framer-motion'

import { useMovies } from '../hooks/useMovies'
import MovieCard from '../components/MovieCard'
import MovieSkeleton from '../components/MovieSkeleton'
import PageWrapper from '../components/PageWrapper'
import ScrollAnimation from '../components/ScrollAnimation'
import Pagination from '../components/Pagination'

const HomePage = () => {
  const [query, setQuery] = useState('')
  const {
    popular,
    trending,
    results,
    loading,
    error,
    handleSearch,

    popularPage,
    trendingPage,
    totalPopularPages,
    totalTrendingPages,
    setPopularPage,
    setTrendingPage,
  } = useMovies()

  // search handler triggered on button click or enter key
  const onSearch = () => {
    handleSearch(query)
  }

  return (
    <PageWrapper>
      {/* movie search */}
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
        <motion.button
          onClick={onSearch}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 15px rgba(59,130,246,0.4)' }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow font-semibold text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Search"
        >
          Search
        </motion.button>
      </div>

      {/* loading skeleton */}
      {(loading.search || loading.popular || loading.trending) && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {[...Array(10)].map((_, index) => (
            <MovieSkeleton key={index} />
          ))}
        </div>
      )}

      {/* search results */}
      {query.trim() && !loading.search && (
        <>
          {error ? (
            <p className="text-center text-red-600 font-semibold text-base sm:text-lg">{error}</p>
          ) : results.length > 0 && (
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
        </>
      )}

      {/* trending movies */}
      <ScrollAnimation threshold={0} triggerOnce>
        <section id="trending-section" className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold mb-4 sm:mb-5 border-b-2 border-orange-500 pb-2">
            <FaFire size={24} className="text-orange-500" />
            Trending Movies
          </h2>
          {trending?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                {trending.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
              <Pagination
                currentPage={trendingPage}
                totalPages={totalTrendingPages}
                onPageChange={(page) => {
                  setTrendingPage(page)
                  document.getElementById('trending-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
              />
            </>
          ) : (
            <p>No trending movies found.</p>
          )}
        </section>
      </ScrollAnimation>

      {/* popular movies */}
      <ScrollAnimation threshold={0} triggerOnce>
        <section id="popular-section" className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <h2 className="flex items-center gap-3 text-xl sm:text-2xl font-bold mb-4 sm:mb-5 border-b-2 border-blue-600 pb-2">
            <BiSolidMoviePlay size={24} className="text-blue-600" />
            Popular Movies
          </h2>
          {popular?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                {popular.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
              <Pagination
                currentPage={popularPage}
                totalPages={totalPopularPages}
                onPageChange={(page) => {
                  setPopularPage(page)
                  document.getElementById('popular-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
              />
            </>
          ) : (
            <p>No popular movies found.</p>
          )}
        </section>
      </ScrollAnimation>
    </PageWrapper>
  )
}

export default HomePage