// src/pages/admin/AdminNoticesPage.jsx
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiBell } from 'react-icons/fi';

const AdminNoticesPage = () => {
  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
                <FiBell /> Create Notice
            </h1>
            {/* <Link
                to="/admin/dashboard" // Link back to dashboard for simplicity
                className="flex items-center gap-2 bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300"
            >
                <FiChevronLeft /> Back
            </Link> */}
        </div>
        
        <form className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-700 border-b pb-3">Enter Information</h2>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input type="text" id="title" name="title" placeholder="Enter Notice Title" className="w-full px-2 py-2 border-1 border-teal-500 rounded-md shadow-sm  focus:outline-teal-500 focus:border-teal-500 focus:ring-teal-500" />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea id="description" name="description" rows={6} placeholder="Enter your Description here..." className="w-full border-teal-500 px-2 py-2 border-1 rounded-md shadow-sm focus:border-teal-500 focus:outline-teal-500 focus:ring-teal-500"></textarea>
                </div>
                <div className="text-right">
                    <button type="submit" className="bg-teal-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-teal-700">
                        Send Notice
                    </button>
                </div>
            </div>
        </form>
    </div>
  );
};

export default AdminNoticesPage;