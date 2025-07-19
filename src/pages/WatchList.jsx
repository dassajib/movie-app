import MovieCard from "../components/MovieCard"
import PageWrapper from "../components/PageWrapper"
import ScrollAnimation from "../components/ScrollAnimation"
import { useAuth } from "../context/AuthContext"

const Watchlist = () => {
  const { watchlist } = useAuth()

  return (
    <PageWrapper>
      <ScrollAnimation>
        <div className="p-4 flex flex-col items-center justify-center min-h-[200px]">
          <h2 className="text-2xl font-bold mb-4 text-center">Your Watchlist</h2>
          {watchlist.length === 0 ? (
            <p className="text-center">No movies in your watchlist.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {watchlist.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </ScrollAnimation>
    </PageWrapper>
  )
}

export default Watchlist