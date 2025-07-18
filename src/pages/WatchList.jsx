import MovieCard from "../components/MovieCard"
import { useAuth } from "../context/AuthContext"

const Watchlist = () => {
  const { watchlist } = useAuth()

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Watchlist</h2>
      {watchlist.length === 0 ? (
        <p>No movies in your watchlist.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {watchlist.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      )}
    </div>
  )
}

export default Watchlist