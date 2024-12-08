// import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
    currentPage: number
    maxPageNum: number
    onPageChange: (page_num: number) => void
}

const Pagination = ({currentPage, maxPageNum, onPageChange}:  PaginationProps) => {
  const itemsPerPage = 20;
  const pages = Array.from({length: Math.ceil(maxPageNum / itemsPerPage)}, (_, i) => i + 1)
//   const visiblePages = pages.slice(
//     currentPage + 1,
//     currentPage + 6
//   )


  return (
    <div>
      {/* <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
      </button> */}

      {pages.map((page) => (
        <button 
            className={`
                w-10 h-10 rounded-lg transition-colors duration-200
                ${currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
                }
            `}
            key={page}
            onClick={() => (onPageChange(page))}
        >
            {page}
        </button>
      ))}  

      {/* <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === maxPageNum}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5" />
      </button> */}
    </div>
  )
}

export default Pagination;