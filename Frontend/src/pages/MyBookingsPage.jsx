// src/pages/MyBookingsPage.jsx
import { Link } from 'react-router-dom';
import UserLayout from '../components/UserLayout';
import { FiChevronLeft, FiSearch, FiBookOpen } from 'react-icons/fi';
import { useState, useEffect } from 'react';


const MyBookingsPage = () => {
    const [userBookings, setUserBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    

    useEffect(()=>{
        fetch('http://localhost:8001/eventsbook/getAllUserBookings', { credentials: 'include' })
            .then(res => res.json())
            .then(data => setUserBookings(data))
            .catch(err => console.error(err));
    },[])


    return (
        <UserLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                       <FiBookOpen /> My Bookings
                    </h1>
                    <Link
                        to="/home" // Link back to the user dashboard
                        className="flex items-center gap-2 bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300"
                    >
                        <FiChevronLeft /> Back
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-700">Total Bookings</h2>
                        <div className="relative w-full md:w-1/3">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                placeholder="Search by Event Name..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>
                    
                    {/* Table or No Data Message */}
                    <div className="overflow-x-auto">
                        {
                            (() => {
                                const filtered = userBookings
                                    .sort((a, b) => new Date(b.event.endDate) - new Date(a.event.endDate))
                                    .filter(b =>
                                        searchTerm === '' || b.event.name.toLowerCase().includes(searchTerm.toLowerCase())
                                    );
                                return filtered.length > 0 ? (
                                    <table className="min-w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
                                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">End Date</th>
                                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 text-sm">
                                            {filtered.map((booking) => (
                                                <tr key={booking._id}>
                                                    <td className="py-4 px-4 font-semibold">
                                                        <Link to={`/events/${booking.event._id}`} className="text-teal-600 hover:underline">
                                                            {booking.event.name}
                                                        </Link>
                                                    </td>
                                                    <td className="py-4 px-4">{booking.user.fullName}</td>
                                                    <td className="py-4 px-4">{booking.event.endDate ? new Date(booking.event.endDate).toLocaleDateString() : 'N/A'}</td>
                                                    <td className="py-4 px-4">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                                                            {booking.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <button
                                                            className={`px-2 py-2 inline-flex text-xs leading-5 font-semibold rounded-md bg-green-100 text-green-800 ${booking.status === 'cancelled' || booking.status === 'pending' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                            disabled={booking.status === 'cancelled' || booking.status === 'pending'}
                                                        >
                                                            Add Payment
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="text-center py-16">
                                        <p className="text-red-500 font-semibold">No Booking Data Available</p>
                                    </div>
                                );
                            })()
                        }
                    </div>

                    {/* Pagination */}
                    {/* <div className="flex justify-between items-center mt-4 text-sm">
                        <p className="text-gray-600">Showing 1 to {userBookings.length} of {userBookings.length} entries</p>
                        <div className="flex items-center">
                            <button className="px-3 py-1 border rounded-l-md bg-white hover:bg-gray-50">«</button>
                            <button className="px-3 py-1 border-t border-b bg-teal-500 text-white">1</button>
                            <button className="px-3 py-1 border rounded-r-md bg-white hover:bg-gray-50">»</button>
                        </div>
                    </div> */}
                </div>
            </div>
        </UserLayout>
    );
};

export default MyBookingsPage;