// src/pages/admin/AdminEventsPage.jsx
import { Link } from 'react-router-dom'; // Make sure Link is imported
import { FiPlus, FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';

const mockAdminEvents = [
    { id: 1, name: "International Workshop", category: "Technology", date: "2025-02-26", status: "Active" },
    { id: 2, name: "LUMS Live Session", category: "Music", date: "2025-04-08", status: "Active" },
    { id: 3, name: "CSS Mentorship", category: "Education", date: "2025-03-28", status: "Inactive" },
    { id: 4, name: "Annual Sports Week", category: "Sports", date: "2025-03-16", status: "Active" },
    { id: 5, name: "Fintech Event Award", category: "Technology", date: "2024-12-03", status: "Completed" },
];

const AdminEventsPage = () => {
    const getStatusClass = (status) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800';
            case 'Inactive': return 'bg-yellow-100 text-yellow-800';
            case 'Completed': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl sm:text-3xl font-bold text-gray-800">Manage Events</h1>
                <Link 
                    to="/admin/events/create"
                    className="flex items-center gap-1 sm:gap-2 bg-teal-500 text-white sm:font-bold py-1 sm:py-2 px-2 sm:px-4 rounded-lg hover:bg-teal-600 transition-colors"
                >
                    <FiPlus /> Create Event
                </Link>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="flex items-center">
                    <FiSearch className="text-gray-400 mr-3 text-3xl" />
                    <input type="text" placeholder="Search events by name..." className="w-full border-0 rounded-md   focus:ring-0 focus:outline-none" />
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {mockAdminEvents.map((event, index) => (
                            <tr key={event.id}>
                                <td className="py-4 px-6 whitespace-nowrap">{index + 1}</td>
                                <td className="py-4 px-6 whitespace-nowrap font-medium text-gray-900">{event.name}</td>
                                <td className="py-4 px-6 whitespace-nowrap">{event.category}</td>
                                <td className="py-4 px-6 whitespace-nowrap">{event.date}</td>
                                <td className="py-4 px-6 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(event.status)}`}>
                                        {event.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap flex items-center gap-4">
                                    <Link to={`/admin/events/edit/${event.id}`} className="text-blue-600 hover:text-blue-900"><FiEdit size={18} /></Link>
                                    {/* <button className="text-red-600 hover:text-red-900"><FiTrash2 size={18} /></button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminEventsPage;