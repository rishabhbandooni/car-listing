export async function fetchCars() {
  try {
    const response = await fetch("https://arpitjoshi.github.io/8e4474f3-d675-44c2-ba12-ccfacfa97c8b.json")

    if (!response.ok) {
      throw new Error("Failed to fetch cars")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching cars:", error)
    return []
  }
}

export async function fetchCarById(id) {
  try {
    const response = await fetch("https://arpitjoshi.github.io/8e4474f3-d675-44c2-ba12-ccfacfa97c8b.json")

    if (!response.ok) {
      throw new Error("Failed to fetch car details")
    }

    const data = await response.json()
    return data.find((car) => car.id.toString() === id.toString()) || null
  } catch (error) {
    console.error("Error fetching car details:", error)
    return null
  }
}
