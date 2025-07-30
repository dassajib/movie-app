import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
})

export const fetchPopularMovies = async (page = 1) => {
  const res = await axiosInstance.get('/movie/popular', {
    params: {
      api_key: API_KEY,
      page,
    },
  })
  return res.data
}

export const fetchTrendingMovies = async (page = 1) => {
  const res = await axiosInstance.get('/trending/movie/day', {
    params: {
      api_key: API_KEY,
      page,
    },
  })
  return res.data
}

export const searchMovies = async (query) => {
  const res = await axiosInstance.get('/search/movie', {
    params: {
      api_key: API_KEY,
      query,
    },
  })
  return res.data
}