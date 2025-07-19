import { useState, useEffect } from 'react'

import { fetchPopularMovies, fetchTrendingMovies, searchMovies } from '../services/movieService'

export const useMovies = () => {
  const [popular, setPopular] = useState([])
  const [trending, setTrending] = useState([])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState({
    popular: false,
    trending: false,
    search: false,
  })
  const [error, setError] = useState('')

  const loadPopular = async () => {
    setLoading((prev) => ({ ...prev, popular: true }))
    try {
      const data = await fetchPopularMovies()
      setPopular(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading((prev) => ({ ...prev, popular: false }))
    }
  }

  const loadTrending = async () => {
    setLoading((prev) => ({ ...prev, trending: true }))
    try {
      const data = await fetchTrendingMovies()
      setTrending(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading((prev) => ({ ...prev, trending: false }))
    }
  }

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setError('Please enter a search term.')
      setResults([])
      return
    }
    setError('')
    setLoading((prev) => ({ ...prev, search: true }))
    try {
      const data = await searchMovies(query)
      setResults(data)
      if (data.length === 0) {
        setError(`No results found for "${query}"`)
      }
    } catch (err) {
      console.error(err)
      setError('Failed to fetch search results')
    } finally {
      setLoading((prev) => ({ ...prev, search: false }))
    }
  }  

  useEffect(() => {
    loadPopular()
    loadTrending()
  }, [])

  return {
    popular,
    trending,
    results,
    loading,
    error,
    handleSearch,
  }
}
