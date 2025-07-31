// src/pages/admin/DashboardPage.jsx
import { Link } from 'react-router-dom';
import { FiUsers, FiCalendar, FiBook ,FiBookmark, FiMessageCircle, FiGrid, FiEye,FiAward  } from 'react-icons/fi';

// Helper component for the statistic cards
const StatCard = ({ icon, title, value, color }) => {
    const colorClasses = {
        orange: 'bg-orange-100 text-orange-600',
        blue: 'bg-blue-100 text-blue-600 border-blue-500',
        red: 'bg-red-100 text-red-600',
        teal: 'bg-teal-100 text-teal-600',
        indigo: 'bg-indigo-100 text-indigo-600 border-indigo-500',
        purple: 'bg-purple-100 text-purple-600 border-purple-500',
    };

    return (
        <div className={`bg-white p-6 rounded-lg shadow-md flex items-center gap-6 border-b-4 ${colorClasses[color]}`}>
            <div className={`p-3 rounded-full ${colorClasses[color]}`}>
                {icon}
            </div>
            <div>
                <p className="text-4xl font-bold text-gray-800">{value}</p>
                <p className="text-gray-500">{title}</p>
            </div>
        </div>
    );
};

// Mock data for the new pending booking
const newBookings = [
    { id: 7, bookingNo: '7813537050113551', member: 'test', event: 'Baxter Spears', subscribers: 3, status: 'pending', date: '1 days ago' }
];

const DashboardPage = () => {
    const stats = [
        { icon: <FiUsers size={32}/>, title: 'Total Users', value: 5, color: 'orange' },
        { icon: <FiCalendar size={32}/>, title: 'Total Events', value: 10, color: 'blue' },
        { icon: <FiBookmark size={32}/>, title: 'Total Bookings', value: 8, color: 'red' },
        { icon: <FiMessageCircle size={32}/>, title: 'Total Comments', value: 3, color: 'teal' },
        { icon: <FiGrid size={32}/>, title: 'Total Categories', value: 7, color: 'indigo' },
        { icon: <FiAward  size={32}/>, title: 'Total Universities', value: 12, color: 'purple' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map(stat => (
                    <StatCard key={stat.title} {...stat} />
                ))}
            </div>
            {/* === NEW BOOKINGS SECTION === */}
            {newBookings.length > 0 ? (
                <div className="mt-10">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">New Bookings</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Booking No</th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Events</th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Manage</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                                    {newBookings.map((booking, index) => (
                                        <tr key={booking.id}>
                                            <td className="py-4 px-4">{index + 1}</td>
                                            <td className="py-4 px-4 font-mono">{booking.bookingNo}</td>
                                            <td className="py-4 px-4">{booking.member}</td>
                                            <td className="py-4 px-4">{booking.event}</td>
                                            <td className="py-4 px-4">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <Link to={`/admin/bookings/show/${booking.id}`} className="bg-teal-500 text-white flex items-center gap-2 py-1 px-3 rounded-md hover:bg-teal-600">
                                                    <FiEye /> Show
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-8 bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                    <p className="text-red-700">Notification not Available</p>
                </div>
            )}
            
        </div>
    );
};

export default DashboardPage;