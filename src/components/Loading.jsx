const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-gray-600">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm">Loading content...</p>
        </div>
    )
}

export default Loading