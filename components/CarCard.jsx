import Image from "next/image"
import Link from "next/link"

export default function CarCard({ car }) {
  return (
    <Link href={`/cars/${car.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 h-full">
        <div className="relative h-48 w-full">
          <Image
            src={car.image[0] || "/placeholder.svg"}
            alt={`${car.make} ${car.model}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold">
            {car.make} {car.model}
          </h2>
          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-600">{car.year}</p>
            <p className="font-bold text-gray-800">${car.price.toLocaleString()}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
              {car.mileage.toLocaleString()} miles
            </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">{car.transmission}</span>
            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">{car.fuelType}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
