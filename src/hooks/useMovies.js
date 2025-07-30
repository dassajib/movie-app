import { useState, useEffect } from 'react'

import {
  fetchPopularMovies,
  fetchTrendingMovies,
  searchMovies,
} from '../services/movieService'

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

  // pagination states
  const [popularPage, setPopularPage] = useState(1)
  const [trendingPage, setTrendingPage] = useState(1)
  const [totalPopularPages, setTotalPopularPages] = useState(1)
  const [totalTrendingPages, setTotalTrendingPages] = useState(1)

  const loadPopular = async (page = 1) => {
    setLoading((prev) => ({ ...prev, popular: true }))
    try {
      const data = await fetchPopularMovies(page)
      setPopular(data.results)
      setTotalPopularPages(data.total_pages > 20 ? 20 : data.total_pages)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading((prev) => ({ ...prev, popular: false }))
    }
  }

  const loadTrending = async (page = 1) => {
    setLoading((prev) => ({ ...prev, trending: true }))
    try {
      const data = await fetchTrendingMovies(page)
      setTrending(data.results)
      setTotalTrendingPages(data.total_pages > 20 ? 20 : data.total_pages)
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
      setResults(data.results)
      if (data.results.length === 0) {
        setError(`No results found for "${query}"`)
      }
    } catch (err) {
      console.error(err)
      setError('Failed to fetch search results')
    } finally {
      setLoading((prev) => ({ ...prev, search: false }))
    }
  }

  // reload when page changes
  useEffect(() => {
    loadPopular(popularPage)
  }, [popularPage])

  useEffect(() => {
    loadTrending(trendingPage)
  }, [trendingPage])

  // initial load
  useEffect(() => {
    loadPopular(popularPage)
    loadTrending(trendingPage)
  }, [])

  return {
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
  }
}