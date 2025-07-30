// src/components/EventCard.jsx

import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  // Destructure props for easier access
  const { id, title, price, category, startDate, startTime, imageUrl } = event;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="relative">
        <img 
          className="h-48 w-full object-cover" 
          src={imageUrl} 
          alt={`Image for ${title}`} 
        />
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 truncate">{title}</h3>
        
        <div className="mt-2 space-y-1 text-sm text-gray-600 flex-grow">
          <p><span className="font-semibold">Price:</span> ${price}</p>
          <p><span className="font-semibold">Category:</span> {category}</p>
          <p><span className="font-semibold">Start Date:</span> {startDate}</p>
          <p><span className="font-semibold">Start Time:</span> {startTime}</p>
        </div>

        <div className="mt-4">
          <Link 
            to={`/events/${id}`} 
            className="w-full block text-center bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors"
          >
            More Info
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;