// src/pages/MyBookingsPage.jsx
import { Link } from 'react-router-dom';
import UserLayout from '../components/UserLayout';
import { FiChevronLeft, FiSearch, FiBookOpen } from 'react-icons/fi';

const MyBookingsPage = () => {
    // We'll use an empty array to match the "No Booking Data Available" screenshot
    const userBookings = [];

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
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>
                    
                    {/* Table or No Data Message */}
                    <div className="overflow-x-auto">
                        {userBookings.length > 0 ? (
                            <table className="min-w-full">
                                {/* Table headers would go here */}
                            </table>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-red-500 font-semibold">No Booking Data Available</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-4 text-sm">
                        <p className="text-gray-600">Showing 0 to 0 of 0 entries</p>
                        <div className="flex items-center">
                            <button disabled className="px-3 py-1 border rounded-l-md bg-gray-100 cursor-not-allowed">«</button>
                            <button disabled className="px-3 py-1 border-t border-b bg-gray-200 cursor-not-allowed">1</button>
                            <button disabled className="px-3 py-1 border rounded-r-md bg-gray-100 cursor-not-allowed">»</button>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default MyBookingsPage;