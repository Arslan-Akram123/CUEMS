// src/pages/LatestBookingsPage.jsx
import { Link } from 'react-router-dom';
import UserLayout from '../components/UserLayout';
import { FiSearch, FiCalendar } from 'react-icons/fi';

// Mock data for recent bookings across the platform
const mockLatestBookings = [
    { id: 1, eventName: 'Become a Web Developer', eventId: 5, member: 'test', date: '1 days ago', status: 'confirmed' },
    { id: 2, eventName: 'International Workshop', eventId: 1, member: 'jane.d', date: '1 days ago', status: 'confirmed' },
    { id: 3, eventName: 'LUMS Live Session', eventId: 2, member: 'john.s', date: '2 days ago', status: 'confirmed' },
    { id: 4, eventName: 'Annual Sports Week', eventId: 4, member: 'sara.c', date: '3 days ago', status: 'confirmed' },
    { id: 5, eventName: 'CSS Mentorship', eventId: 3, member: 'mike.r', date: '4 days ago', status: 'confirmed' },
];

const LatestBookingsPage = () => {
    return (
        <UserLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 justify-between items-center mb-4 border-b pb-4">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
                           <FiCalendar /> Latest Bookings
                        </h1>
                         <div className="relative w-full md:w-1/3">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search bookings..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        {mockLatestBookings.length > 0 ? (
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                                    {mockLatestBookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td className="py-4 px-4 font-semibold">
                                                <Link to={`/events/${booking.eventId}`} className="text-teal-600 hover:underline">
                                                    {booking.eventName}
                                                </Link>
                                            </td>
                                            <td className="py-4 px-4">{booking.member}</td>
                                            <td className="py-4 px-4">{booking.date}</td>
                                            <td className="py-4 px-4">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                             <div className="text-center py-16">
                                <p className="text-red-500 font-semibold">No Booking Data Available</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4 text-sm">
                        <p className="text-gray-600">Showing 1 to {mockLatestBookings.length} of {mockLatestBookings.length} entries</p>
                         <div className="flex items-center">
                            <button className="px-3 py-1 border rounded-l-md bg-white hover:bg-gray-50">«</button>
                            <button className="px-3 py-1 border-t border-b bg-teal-500 text-white">1</button>
                            <button className="px-3 py-1 border rounded-r-md bg-white hover:bg-gray-50">»</button>
                        </div>
                    </div>

                </div>
            </div>
        </UserLayout>
    );
};

export default LatestBookingsPage;