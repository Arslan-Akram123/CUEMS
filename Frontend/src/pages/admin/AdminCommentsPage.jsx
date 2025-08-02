// src/pages/admin/AdminCommentsPage.jsx
import { FiSearch, FiStar } from 'react-icons/fi';
import ToggleSwitch from '../../components/admin/ToggleSwitch';
import { useState, useEffect, use } from 'react';
const mockComments = [
    { id: 1, comment: "Super Excellent Event", member: "test", event: "Become a Web Developer", rating: 5, status: true, date: "23 days ago", managed: true },
    { id: 2, comment: "A bit disorganized but informative.", member: "jane.doe", event: "LUMS Live Session", rating: 3, status: true, date: "32 days ago", managed: false }, 
];

// Helper to render star ratings
const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
        <FiStar
            key={index}
            className={`inline-block h-4 w-4 ${
            index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
        />
    ));
};

const AdminCommentsPage = () => {
    const [comments, setComments] = useState([]);
useEffect(() => {
    fetch('http://localhost:8001/comments/getAllComments', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setComments(Array.isArray(data) ? data : []);
      })
      .catch(() => setComments([]));
})

  return (
    <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">New Comments</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="sm:text-xl font-semibold text-gray-700 hidden sm:block">Information Comments</h2>
                <div className="relative w-full sm:w-1/3">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                </div>
            </div>

            {/* Comments Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Comment</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Events</th>
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Ratings-5/5</th>
                            {/* <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th> */}
                            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            {/* <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Manage</th> */}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 text-sm">
                        {comments.map((item, index) => (
                            <tr key={item._id}>
                                <td className="py-4 px-4">{index + 1}</td>
                                <td className="py-4 px-4 max-w-xs truncate">{item.comment}</td>
                                <td className="py-4 px-4">{item.user.fullName}</td>
                                <td className="py-4 px-4">{item.event.name}</td>
                                <td className="py-4 px-4">{renderStars(item.rating)}</td>
                                {/* <td className="py-4 px-4">
                                    <ToggleSwitch initialState={item.status} />
                                </td> */}
                                <td className="py-4 px-4">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}</td>
                                {/* <td className="py-4 px-4">
                                    <ToggleSwitch initialState={item.managed} />
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination */}
            {/* <div className="flex justify-between items-center mt-4 text-sm">
                <p className="text-gray-600">Showing 1 to {comments.length} of {comments.length} entries</p>
                <div className="flex items-center">
                    <button className="px-3 py-1 border rounded-md bg-white hover:bg-gray-50">«</button>
                    <button className="px-3 py-1 border rounded-md bg-teal-500 text-white mx-1">1</button>
                    <button className="px-3 py-1 border rounded-md bg-white hover:bg-gray-50">»</button>
                </div>
            </div> */}
        </div>
    </div>
  );
};

export default AdminCommentsPage;