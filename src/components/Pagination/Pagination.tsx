import React from "react"

export interface PaginationProps {
  noOfPages: number
  currentPage: number
  onPageChange?: (pageNumber: number) => void
}

function Pagination({
  noOfPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const pageNumbers = Array.from({ length: noOfPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center space-x-2">
      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-500 hover:bg-gray-200"
          } px-4 py-2 rounded-md`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  )
}

export default Pagination
