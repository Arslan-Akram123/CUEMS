// src/pages/admin/EditUniversityPage.jsx
import { Link, useParams } from 'react-router-dom';
import { FiChevronLeft, FiHome } from 'react-icons/fi';

const mockUniversities = [
  { id: 1, name: 'Islamiya University Bahawalpur', description: 'The university boasts a dedicated team of faculty members...', pathId: 'iub', imageUrl: 'https://via.placeholder.com/100/0284C7/FFFFFF?Text=IUB' },
  { id: 2, name: 'Lums University', description: 'LUMS is an extraordinary place for learning, discovery and transformation.', pathId: 'lums', imageUrl: 'https://via.placeholder.com/100/166534/FFFFFF?Text=LUMS' },
  { id: 3, name: 'Minhaj University', description: 'MIHS offers a variety of undergraduate and postgraduate programs in...', pathId: 'minhaj', imageUrl: 'https://via.placeholder.com/100/7C3AED/FFFFFF?Text=MIHS' },
  { id: 4, name: 'University of Central Punjab', description: 'Founded in 2002, the University of Central Punjab (UCP) is...', pathId: 'ucp', imageUrl: 'https://via.placeholder.com/100/DB2777/FFFFFF?Text=UCP' },
];

const EditUniversityPage = () => {
    const { universityId } = useParams();
    const universityToEdit = mockUniversities.find(u => u.id === parseInt(universityId));

    if (!universityToEdit) {
        return (
            <div>
                <h1 className="text-2xl font-bold">University not found</h1>
                <Link to="/admin/universities" className="text-teal-600 hover:underline">Return to Universities List</Link>
            </div>
        );
    }
    
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <FiHome /> Edit University
                </h1>
                <Link
                    to="/admin/universities"
                    className="flex items-center gap-2 bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300"
                >
                    <FiChevronLeft /> Back
                </Link>
            </div>

            <form className="bg-white p-8 rounded-lg shadow-md space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">University Name</label>
                    <input type="text" id="name" defaultValue={universityToEdit.name} className="w-full px-2 py-2 border-1  focus:outline-teal-500 border-teal-500 rounded-md shadow-sm"/>
                </div>
                 <div>
                    <label htmlFor="pathId" className="block text-sm font-medium text-gray-700 mb-1">Path ID (e.g., 'iub', 'lums')</label>
                    <input type="text" id="pathId" defaultValue={universityToEdit.pathId} className="w-full px-2 py-2 border-1  focus:outline-teal-500 border-teal-500 rounded-md shadow-sm"/>
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea id="description" rows={4} defaultValue={universityToEdit.description} className="w-full px-2 py-2 border-1  focus:outline-teal-500 border-teal-500 rounded-md shadow-sm"></textarea>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Logo</label>
                    <img src={universityToEdit.imageUrl} alt="Current Logo" className="h-20 w-20 object-contain rounded-md bg-gray-100 p-1"/>
                    <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mt-4">Upload New Logo</label>
                    <input type="file" id="logo" className="mt-1 border-1 border-teal-500 rounded-2xl block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700  focus:outline-teal-500 hover:file:bg-teal-100"/>
                </div>
                <div className="flex justify-end gap-3">
                    <button type="submit" className="bg-teal-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-teal-700">
                        Update University
                    </button>
                     <button type="submit" className="bg-red-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-red-700">
                        Delete University
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUniversityPage;