# Car Listing Application

A server-side rendering car listing application built with Next.js that allows users to view, search, and filter cars based on various criteria.

## Features

- **Home Page**
  - Display a list of cars with basic details (image, make, model, year, price)
  - Pagination for handling large number of car listings
  - Search bar to filter cars by make, model, and year

- **Car Details Page**
  - Detailed information about selected cars
  - Image carousel for multiple car images
  - Back button to return to home page

- **Filtering and Sorting**
  - Filter cars by make, model, year, and price range
  - Sort by price, year, or mileage (ascending or descending)

- **Responsive Design**
  - Works well on desktop, tablet, and mobile devices

## Tech Stack

- **Next.js** - React framework with App Router
- **Tailwind CSS** - For styling
- **Lucide React** - For icons

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/car-listing-app.git
   cd car-listing-app
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

\`\`\`
/app
  /page.jsx (Home page with car listings)
  /cars
    /[id]
      /page.jsx (Car details page)
  /components
    /CarCard.jsx
    /CarList.jsx
    /SearchBar.jsx
    /FilterPanel.jsx
    /Pagination.jsx
    /ImageCarousel.jsx
  /lib
    /api.js (Functions to fetch data)
\`\`\`

## API Integration

The application uses a mock API to fetch car listings and details:
- API Endpoint: `https://arpitjoshi.github.io/8e4474f3-d675-44c2-ba12-ccfacfa97c8b.json`

## Design Choices

1. **Server-Side Rendering**: Utilized Next.js for improved SEO and initial load performance.

2. **Component Structure**: Modular components for better code organization and reusability.

3. **Responsive Design**: Used Tailwind CSS for a mobile-first approach ensuring the application works well on all device sizes.

4. **State Management**: Used React's useState and useEffect hooks for managing application state.

5. **Filtering and Sorting**: Implemented client-side filtering and sorting for better user experience with immediate feedback.

## Deployment

The application can be deployed to Vercel with the following steps:

1. Push your code to a GitHub repository.

2. Import the repository to Vercel.

3. Vercel will automatically detect Next.js and deploy your application.

## License

This project is licensed under the MIT License.
