"use client"

import { useState, useEffect } from "react"
import CarList from "@/components/CarList"
import SearchBar from "@/components/SearchBar"
import FilterPanel from "@/components/FilterPanel"
import Pagination from "@/components/Pagination"
import { fetchCars } from "@/lib/api"

export default function Home() {
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    make: "",
    year: "",
    priceRange: { min: 0, max: 100000 },
    sortBy: "price",
    sortOrder: "asc",
  })

  const carsPerPage = 6

  useEffect(() => {
    const getCars = async () => {
      try {
        const data = await fetchCars()
        setCars(data)
        setFilteredCars(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching cars:", error)
        setLoading(false)
      }
    }

    getCars()
  }, [])

  useEffect(() => {
    let result = [...cars]

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (car) =>
          car.make.toLowerCase().includes(query) ||
          car.model.toLowerCase().includes(query) ||
          car.year.toString().includes(query),
      )
    }

    // Apply filters
    if (filters.make) {
      result = result.filter((car) => car.make === filters.make)
    }

    if (filters.year) {
      result = result.filter((car) => car.year.toString() === filters.year)
    }

    // Apply price range
    result = result.filter((car) => car.price >= filters.priceRange.min && car.price <= filters.priceRange.max)

    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[filters.sortBy]
      const bValue = b[filters.sortBy]

      if (filters.sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredCars(result)
    setCurrentPage(1)
  }, [searchQuery, filters, cars])

  // Get current cars for pagination
  const indexOfLastCar = currentPage * carsPerPage
  const indexOfFirstCar = indexOfLastCar - carsPerPage
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Get unique makes and years for filters
  const makes = [...new Set(cars.map((car) => car.make))]
  const years = [...new Set(cars.map((car) => car.year))].sort((a, b) => b - a)

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Car Listings</h1>

        <div className="mb-6">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterPanel filters={filters} setFilters={setFilters} makes={makes} years={years} />
          </div>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <>
                {currentCars.length > 0 ? (
                  <>
                    <CarList cars={currentCars} />
                    <Pagination
                      carsPerPage={carsPerPage}
                      totalCars={filteredCars.length}
                      paginate={paginate}
                      currentPage={currentPage}
                    />
                  </>
                ) : (
                  <div className="text-center py-10">
                    <h2 className="text-xl font-semibold">No cars found</h2>
                    <p className="text-gray-600 mt-2">Try adjusting your search or filters</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
