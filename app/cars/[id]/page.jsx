"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { fetchCarById } from "@/lib/api"
import ImageCarousel from "@/components/ImageCarousel"
import { ArrowLeft } from "lucide-react"

export default function CarDetails({ params }) {
  const router = useRouter()
 const unwrappedParams = React.use(params)
  const { id } = unwrappedParams
  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getCar = async () => {
      try {
        const data = await fetchCarById(id)
        setCar(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching car details:", error)
        setLoading(false)
      }
    }

    getCar()
  }, [id])

  const handleBack = () => {
    router.push("/")
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <button onClick={handleBack} className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to listings
        </button>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold">Car not found</h2>
          <p className="mt-2 text-gray-600">The car you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <button onClick={handleBack} className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to listings
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <ImageCarousel images={car.image} />

        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            <h1 className="text-3xl font-bold mb-2 md:mb-0">
              {car.make} {car.model}
            </h1>
            <p className="text-2xl font-bold text-gray-700">${car.price.toLocaleString()}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Car Details</h2>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Year:</span>
                  <span className="font-medium">{car.year}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Color:</span>
                  <span className="font-medium">{car.color}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Mileage:</span>
                  <span className="font-medium">{car.mileage.toLocaleString()} miles</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Fuel Type:</span>
                  <span className="font-medium">{car.fuelType}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Transmission:</span>
                  <span className="font-medium">{car.transmission}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Previous Owners:</span>
                  <span className="font-medium">{car.owners}</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Engine & Performance</h2>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Engine:</span>
                  <span className="font-medium">{car.engine}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Horsepower:</span>
                  <span className="font-medium">{car.horsepower} hp</span>
                </li>
              </ul>

              <h2 className="text-xl font-semibold mt-6 mb-4">Features</h2>
              <ul className="list-disc pl-5 space-y-1">
                {car.features.map((feature, index) => (
                  <li key={index} className="text-gray-700">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
