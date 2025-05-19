"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function FilterPanel({ filters, setFilters, makes, years }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleMakeChange = (e) => {
    setFilters({ ...filters, make: e.target.value })
  }

  const handleYearChange = (e) => {
    setFilters({ ...filters, year: e.target.value })
  }

  const handlePriceChange = (min, max) => {
    setFilters({ ...filters, priceRange: { min, max } })
  }

  const handleSortChange = (e) => {
    setFilters({ ...filters, sortBy: e.target.value })
  }

  const handleSortOrderChange = (order) => {
    setFilters({ ...filters, sortOrder: order })
  }

  const resetFilters = () => {
    setFilters({
      make: "",
      year: "",
      priceRange: { min: 0, max: 100000 },
      sortBy: "price",
      sortOrder: "asc",
    })
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4 md:hidden">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-gray-700">
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} md:block space-y-6`}>
        <div>
          <h3 className="font-medium mb-2">Make</h3>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.make}
            onChange={handleMakeChange}
          >
            <option value="">All Makes</option>
            {makes.map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="font-medium mb-2">Year</h3>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.year}
            onChange={handleYearChange}
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="font-medium mb-2">Price Range</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              className={`p-2 text-sm rounded-md ${
                filters.priceRange.min === 0 && filters.priceRange.max === 25000
                  ? "bg-gray-200 font-medium"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => handlePriceChange(0, 25000)}
            >
              Under $25,000
            </button>
            <button
              className={`p-2 text-sm rounded-md ${
                filters.priceRange.min === 25000 && filters.priceRange.max === 50000
                  ? "bg-gray-200 font-medium"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => handlePriceChange(25000, 50000)}
            >
              $25,000 - $50,000
            </button>
            <button
              className={`p-2 text-sm rounded-md ${
                filters.priceRange.min === 50000 && filters.priceRange.max === 75000
                  ? "bg-gray-200 font-medium"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => handlePriceChange(50000, 75000)}
            >
              $50,000 - $75,000
            </button>
            <button
              className={`p-2 text-sm rounded-md ${
                filters.priceRange.min === 75000 && filters.priceRange.max === 100000
                  ? "bg-gray-200 font-medium"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={() => handlePriceChange(75000, 100000)}
            >
              Over $75,000
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Sort By</h3>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filters.sortBy}
                onChange={handleSortChange}
              >
                <option value="price">Price</option>
                <option value="year">Year</option>
                <option value="mileage">Mileage</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <button
                className={`flex-1 p-2 text-sm rounded-md ${
                  filters.sortOrder === "asc" ? "bg-gray-200 font-medium" : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => handleSortOrderChange("asc")}
              >
                Low to High
              </button>
              <button
                className={`flex-1 p-2 text-sm rounded-md ${
                  filters.sortOrder === "desc" ? "bg-gray-200 font-medium" : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => handleSortOrderChange("desc")}
              >
                High to Low
              </button>
            </div>
          </div>
        </div>

        <button onClick={resetFilters} className="w-full p-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
          Reset Filters
        </button>
      </div>
    </div>
  )
}
