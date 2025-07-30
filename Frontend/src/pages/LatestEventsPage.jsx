// src/pages/LatestEventsPage.jsx
import UserLayout from '../components/UserLayout';
import { Link } from 'react-router-dom';

// We can reuse a similar card structure, but create it locally for this page.
const LatestEventCard = ({ event }) => (
    <div className="relative pl-8">
        <div className="absolute left-0 top-0 -translate-x-1/2 bg-white rounded-full h-8 w-8 flex items-center justify-center overflow-hidden">
            <img src={event.imageUrl} alt={event.title} className="h-full w-full object-cover" />
        </div>
        <div className="absolute left-0 top-4 bottom-0 w-0.5 bg-teal-500"></div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 ml-4">
            <h3 className="font-bold text-lg">{event.title}</h3>
            <div className="mt-2 space-y-1 text-sm text-gray-700">
                <p><span className="font-semibold">Location:</span> {event.location}</p>
                <p><span className="font-semibold">Description:</span> {event.description}</p>
                <p><span className="font-semibold">Start Date:</span> {event.startDate}</p>
                <p><span className="font-semibold">Start Time:</span> {event.startTime}</p>
                <p><span className="font-semibold">Category:</span> {event.category}</p>
            </div>
            <Link to={`/events/${event.id}`} className="text-teal-600 hover:underline font-semibold mt-2 inline-block">
                More Info
            </Link>
        </div>
    </div>
);


const mockLatestEvents = [
    { id: 6, title: 'ali birthday event', location: 'sanawan', description: 'please join us', startDate: '2025-07-05', startTime: '13:35', category: 'Music', imageUrl: 'https://via.placeholder.com/50/FBCFE8/9D174D?text=A' },
    { id: 2, title: 'Richard Ford', location: 'Doloribus minima err', description: 'Nisi debitis aperiam', startDate: '1987-05-13', startTime: '19:22', category: 'Human Development', imageUrl: 'https://via.placeholder.com/50/FECACA/991B1B?text=R' },
    { id: 3, title: 'Imogene Gillespie', location: 'Vero mollitia dolore', description: 'Dolorem ex doloribus', startDate: '2012-10-26', startTime: '00:21', category: 'Sports', imageUrl: 'https://via.placeholder.com/50/BFDBFE/4338CA?text=I' },
    { id: 4, title: 'Roth Mcdowell', location: 'Sunt dolore autem q', description: 'Vel et quibusdam eo', startDate: '1970-03-19', startTime: '09:44', category: 'Human Development', imageUrl: 'https://via.placeholder.com/50/E0E7FF/4338CA?text=R' },
];

const LatestEventsPage = () => {
    return (
         <UserLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Latest Events</h1>
                    <p className="text-gray-500"><Link to="/home">Dashboard</Link> / Latest-Events</p>
                </div>

                <div className="space-y-8">
                    {mockLatestEvents.map(event => (
                        <LatestEventCard key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </UserLayout>
    );
};

export default LatestEventsPage;