// import axios from 'axios'

// const API_KEY = import.meta.env.VITE_TMDB_API_KEY
// const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     Authorization: `Bearer ${API_KEY}`,
//     Accept: 'application/json',
//   },
// })

// export const fetchPopularMovies = async () => {
//   const res = await axiosInstance.get('/movie/popular')
//   return res.data.results
// }

// export const fetchTrendingMovies = async () => {
//   const res = await axiosInstance.get('/trending/movie/day')
//   return res.data.results
// }

// export const searchMovies = async (query) => {
//   const res = await axiosInstance.get(`/search/movie?query=${encodeURIComponent(query)}`)
//   return res.data.results
// }


import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
})

export const fetchPopularMovies = async () => {
  const res = await axiosInstance.get('/movie/popular', {
    params: { api_key: API_KEY },
  })
  return res.data.results
}

export const fetchTrendingMovies = async () => {
  const res = await axiosInstance.get('/trending/movie/day', {
    params: { api_key: API_KEY },
  })
  return res.data.results
}

export const searchMovies = async (query) => {
  const res = await axiosInstance.get('/search/movie', {
    params: { api_key: API_KEY, query },
  })
  return res.data.results
}