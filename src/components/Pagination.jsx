import { motion } from 'framer-motion'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <div className="mt-6 flex justify-center items-center gap-2 flex-wrap">
            {pages.map((page) => (
                <motion.button
                    key={page}
                    onClick={() => onPageChange(page)}
                    whileTap={{ scale: 0.9 }}
                    className={`px-4 py-2 rounded-lg border font-semibold transition ${page === currentPage
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
                        }`}
                >
                    {page}
                </motion.button>
            ))}
        </div>
    )
}

export default Pagination