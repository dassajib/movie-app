import { motion } from 'framer-motion'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPages = () => {
        const delta = 1
        const range = []
        const pages = []

        const left = Math.max(2, currentPage - delta)
        const right = Math.min(totalPages - 1, currentPage + delta)

        if (left > 2) range.push('...')
        for (let i = left; i <= right; i++) {
            range.push(i)
        }
        if (right < totalPages - 1) range.push('...')

        // always include first and last page
        pages.push(1, ...range, totalPages)

        // remove duplicate
        return pages.filter((v, i, arr) => arr.indexOf(v) === i)
    }

    const pages = getPages()

    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1)
    }

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1)
    }

    return (
        <nav
            className="mt-8 flex justify-center items-center gap-2 flex-wrap px-4"
            aria-label="Pagination Navigation"
        >
            {/* prev btn */}
            <motion.button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-md border text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                whileTap={{ scale: 0.95 }}
                aria-label="Previous Page"
            >
                Prev
            </motion.button>

            {/* page number */}
            {pages.map((page, index) =>
                typeof page === 'string' ? (
                    <span
                        key={`ellipsis-${index}`}
                        className="px-3 py-2 text-gray-400 text-sm select-none"
                    >
                        …
                    </span>
                ) : (
                    <motion.button
                        key={`page-${page}`}
                        onClick={() => onPageChange(page)}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        aria-current={page === currentPage ? 'page' : undefined}
                        className={`min-w-[40px] px-3 py-2 rounded-md border text-sm font-medium transition ${page === currentPage
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
                            }`}
                    >
                        {page}
                    </motion.button>
                )
            )}

            {/* next btn */}
            <motion.button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-md border text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                whileTap={{ scale: 0.95 }}
                aria-label="Next Page"
            >
                Next
            </motion.button>
        </nav>
    )
}

export default Pagination
