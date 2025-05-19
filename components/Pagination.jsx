"use client"

export default function Pagination({ carsPerPage, totalCars, paginate, currentPage }) {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalCars / carsPerPage); i++) {
    pageNumbers.push(i)
  }

  if (pageNumbers.length <= 1) return null

  return (
    <div className="flex justify-center mt-8">
      <ul className="flex space-x-1">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded-md ${
                currentPage === number ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
