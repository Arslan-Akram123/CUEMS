// src/pages/EventDetailPage.jsx
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import UserLayout from '../components/UserLayout';
import ReviewCard from '../components/ReviewCard';
import { FiStar, FiCalendar, FiClock, FiMapPin, FiUsers, FiTag } from 'react-icons/fi';

// In a real app, this data would come from an API. We'll use it to find the event by ID.
const mockEvents = [
  { id: 1, title: "Baxter Spears", price: 522, category: "Sports", startDate: "1979-10-21", endDate: "1993-06-23", startTime: "16:49", endTime: "20:02", imageUrl: "https://via.placeholder.com/1200x600.png/008080/FFFFFF?Text=Event+Banner", description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", location: "Lorem labore et dolo", sponsor: "Global Tech", maxSubscribers: 60, createdBy: "Muhammad Arslan" },
  { id: 2, title: "Roth Mcdowell", price: 150, category: "Human Development", startDate: "1970-03-19", endDate: "1970-03-20", startTime: "09:44", endTime: "17:00", imageUrl: "https://via.placeholder.com/1200x600.png/3B82F6/FFFFFF?Text=Event+Banner", description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.", location: "Doloribus minima err", sponsor: "Innovate Corp", maxSubscribers: 100, createdBy: "Jane Doe" },
  // Add other events to match EventsListPage.jsx for complete linking
];

// Mock reviews for the event
const mockReviews = [
  { id: 1, user: "test", time: "21 seconds ago", rating: 4, comment: "ardfdg btrth b" }
];


const EventDetailPage = () => {
  // Get the 'eventId' from the URL (e.g., '/events/1' -> eventId will be '1')
  const { eventId } = useParams();
  
  // Find the event from our mock data. In a real app, you'd make an API call here.
  const event = mockEvents.find(e => e.id === parseInt(eventId));
  
  // State for the comment form
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

  // If the event is not found, show a message
  if (!event) {
    return (
      <UserLayout>
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold">Event not found!</h1>
          <Link to="/events" className="text-teal-600 hover:underline mt-4 inline-block">
            ← Back to all events
          </Link>
        </div>
      </UserLayout>
    );
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend API
    console.log({ comment: newComment, rating: newRating });
    alert(`Comment Submitted!\nRating: ${newRating}\nComment: ${newComment}`);
    // Clear the form
    setNewComment("");
    setNewRating(0);
  }

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          
          {/* Top Section: Title and Price */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{event.title}</h1>
              <p className="text-md text-gray-500 mt-1">Created By: {event.createdBy}</p>
            </div>
            <p className="text-4xl font-bold text-teal-600 mt-4 md:mt-0">
              ${event.price}
            </p>
          </div>

          <hr className="my-4" />

          {/* Main Content: Image and Details */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <img src={event.imageUrl} alt={event.title} className="w-full h-auto object-cover rounded-lg" />
            </div>
            
            {/* Details Sidebar */}
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center gap-3"><FiTag className="h-5 w-5 text-teal-600" /><p><span className="font-semibold">Category:</span> {event.category}</p></div>
              <div className="flex items-center gap-3"><FiClock className="h-5 w-5 text-teal-600" /><p><span className="font-semibold">Start Time:</span> {event.startTime}</p></div>
              <div className="flex items-center gap-3"><FiClock className="h-5 w-5 text-teal-600" /><p><span className="font-semibold">End Time:</span> {event.endTime}</p></div>
              <div className="flex items-center gap-3"><FiMapPin className="h-5 w-5 text-teal-600" /><p><span className="font-semibold">Location:</span> {event.location}</p></div>
              <div className="flex items-center gap-3"><FiCalendar className="h-5 w-5 text-teal-600" /><p><span className="font-semibold">Start Date:</span> {event.startDate}</p></div>
              <div className="flex items-center gap-3"><FiCalendar className="h-5 w-5 text-teal-600" /><p><span className="font-semibold">End Date:</span> {event.endDate}</p></div>
              <div className="flex items-center gap-3"><FiUsers className="h-5 w-5 text-teal-600" /><p><span className="font-semibold">Sponsor:</span> {event.sponsor}</p></div>
              <p className="text-lg font-bold text-teal-600">Maximum Subscribers: {event.maxSubscribers}</p>
              
              <button className="w-full bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 transition-colors text-lg">
                Book Now
              </button>
            </div>
          </div>
          
          {/* Description Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">{event.description}</p>
          </div>

          <hr className="my-8" />

          {/* Booking & Comments Section */}
          <div className="text-center">
             <div className="text-xl">
              <span>Members Already Booking: <span className="font-bold text-red-500">0</span></span>
              <span className="mx-4">|</span>
              <span>Remaining Number: <span className="font-bold text-red-500">{event.maxSubscribers}</span></span>
            </div>
            <button
                onClick={handleCommentSubmit}
                className="mt-4 bg-teal-500 text-white font-bold py-2 px-6 rounded-full hover:bg-teal-600 transition-colors"
            >
                Add Comment
            </button>
          </div>
          
          {/* Reviews Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-2">Reviews</h2>
            {mockReviews.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {mockReviews.map(review => <ReviewCard key={review.id} review={review} />)}
              </div>
            ) : (
              <p className="text-gray-500">No Reviews Found.</p>
            )}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default EventDetailPage;