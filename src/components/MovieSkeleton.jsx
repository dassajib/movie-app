const MovieSkeleton = () => {
    return (
        <div className="animate-pulse bg-white shadow rounded-lg overflow-hidden">
            <div className="bg-gray-300 h-[300px] w-full" />
            <div className="p-3 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <div className="flex justify-between">
                    <div className="h-3 bg-gray-300 rounded w-1/4" />
                    <div className="h-3 bg-gray-300 rounded w-1/4" />
                </div>
            </div>
        </div>
    )
}

export default MovieSkeleton
