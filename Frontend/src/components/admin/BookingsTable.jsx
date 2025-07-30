// src/components/admin/BookingsTable.jsx
import { FiEye, FiSearch } from 'react-icons/fi';

const BookingsTable = ({ bookings, showSearch = true }) => {
    
    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'confirm': return 'bg-green-100 text-green-800';
            case 'cancel': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            {showSearch && (
                <div className="flex justify-end mb-4">
                    <div className="relative w-full md:w-1/3">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Search Bookings..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Booking No</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Events</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Total Subscribers</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Manage</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-sm">
                        {bookings.map((booking, index) => (
                            <tr key={booking.id}>
                                <td className="py-4 px-4">{index + 1}</td>
                                <td className="py-4 px-4 font-mono">{booking.bookingNo}</td>
                                <td className="py-4 px-4">{booking.member}</td>
                                <td className="py-4 px-4">{booking.event}</td>
                                <td className="py-4 px-4 text-center">{booking.subscribers}</td>
                                <td className="py-4 px-4">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(booking.status)}`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="py-4 px-4">{booking.date}</td>
                                <td className="py-4 px-4">
                                    <button className="bg-teal-500 text-white flex items-center gap-2 py-1 px-3 rounded-md hover:bg-teal-600">
                                        <FiEye /> Show
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

             {/* Pagination */}
             <div className="flex justify-between items-center mt-4 text-sm">
                <p className="text-gray-600">Showing 1 to {bookings.length} of {bookings.length} entries</p>
                <div className="flex items-center">
                    <button className="px-3 py-1 border rounded-l-md bg-white hover:bg-gray-50">«</button>
                    <button className="px-3 py-1 border-t border-b bg-teal-500 text-white">1</button>
                    <button className="px-3 py-1 border rounded-r-md bg-white hover:bg-gray-50">»</button>
                </div>
            </div>
        </div>
    );
};

export default BookingsTable;