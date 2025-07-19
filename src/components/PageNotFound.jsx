import { Link } from "react-router-dom"
import PageWrapper from "../components/PageWrapper"

const PageNotFound = () => {
    return (
        <PageWrapper>
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
                <h1 className="text-9xl font-extrabold mb-6 select-none">404</h1>
                <p className="text-2xl sm:text-3xl mb-4 font-semibold">
                    Oops! Page Not Found
                </p>
                <p className="text-gray-300 max-w-md mb-8">
                    The page you are looking for does not exist
                </p>
                <Link
                    to="/movies"
                    className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition shadow-lg"
                >
                    Go Back Home
                </Link>
            </div>
        </PageWrapper>
    )
}

export default PageNotFound