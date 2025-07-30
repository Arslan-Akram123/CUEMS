// src/pages/EventsListPage.jsx

import UserLayout from '../components/UserLayout';
import EventCard from '../components/EventCard';
import { Link } from 'react-router-dom';

// In a real application, this data would come from an API call
const mockEvents = [
  { id: 1, title: "Baxter Spears", price: 522, category: "Sports", startDate: "1979-10-21", startTime: "16:49", imageUrl: "https://via.placeholder.com/400x200.png/008080/FFFFFF?Text=Event+1" },
  { id: 2, title: "Roth Mcdowell", price: 150, category: "Human Development", startDate: "1970-03-19", startTime: "09:44", imageUrl: "https://via.placeholder.com/400x200.png/3B82F6/FFFFFF?Text=Event+2" },
  { id: 3, title: "Imogene Gillespie", price: 509, category: "Sports", startDate: "2012-10-26", startTime: "00:21", imageUrl: "https://via.placeholder.com/400x200.png/EF4444/FFFFFF?Text=Event+3" },
  { id: 4, title: "Colby Nolan", price: 354, category: "Sports", startDate: "2017-06-25", startTime: "15:14", imageUrl: "https://via.placeholder.com/400x200.png/F97316/FFFFFF?Text=Event+4" },
  // Add more mock events if you like
];


const EventsListPage = () => {
  return (
    // asdasdasdasdasdasdas
    <UserLayout>
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar for Filters */}
        <aside className="w-full md:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-md "> {/* sticky top value depends on header height */}
            <h2 className="text-xl font-bold mb-4">Search & Filter</h2>
            
            <div className="mb-6">
              <label htmlFor="search" className="sr-only">Search</label>
              <input type="text" id="search" placeholder="Search events..." className="w-full px-2 py-2 border border-teal-500 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500 focus:outline-teal-500" />
            </div>

          

            <Link to="/home" className="mt-8 w-full block text-center bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors">
              ← Back to Dashboard
            </Link>
          </div>
        </aside>

        {/* Right Main Content for Events Grid */}
        <main className="w-full md:w-3/4">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Events List</h1>
            <p className="text-gray-500"><Link to="/home">Dashboard</Link> / Events-List</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </main>

      </div>
    </UserLayout>
  );
};

export default EventsListPage;