// src/pages/admin/AdminUniversitiesPage.jsx
import { Link } from 'react-router-dom';
import { FiPlus, FiEdit } from 'react-icons/fi';

const mockUniversities = [
  { id: 1, name: 'Islamiya University Bahawalpur', description: 'The university boasts a dedicated team of faculty members...', pathId: 'iub', imageUrl: 'https://via.placeholder.com/100/0284C7/FFFFFF?Text=IUB' },
  { id: 2, name: 'Lums University', description: 'LUMS is an extraordinary place for learning, discovery and transformation.', pathId: 'lums', imageUrl: 'https://via.placeholder.com/100/166534/FFFFFF?Text=LUMS' },
  { id: 3, name: 'Minhaj University', description: 'MIHS offers a variety of undergraduate and postgraduate programs in...', pathId: 'minhaj', imageUrl: 'https://via.placeholder.com/100/7C3AED/FFFFFF?Text=MIHS' },
  { id: 4, name: 'University of Central Punjab', description: 'Founded in 2002, the University of Central Punjab (UCP) is...', pathId: 'ucp', imageUrl: 'https://via.placeholder.com/100/DB2777/FFFFFF?Text=UCP' },
];

const AdminUniversitiesPage = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl sm:text-3xl font-bold text-gray-800">Universities</h1>
                <Link 
                    to="/admin/universities/create" // Changed from "#" to the correct path
                    className="flex items-center gap-2 bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600"
                >
                    <FiPlus /> Add New
                </Link>
            </div>
      
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Information Universities</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Descriptions</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Path ID</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Manage</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-sm">
                            {mockUniversities.map((uni, index) => (
                                <tr key={uni.id}>
                                    <td className="py-4 px-4">{index + 1}</td>
                                    <td className="py-4 px-4 font-semibold">{uni.name}</td>
                                    <td className="py-4 px-4 max-w-sm truncate">{uni.description}</td>
                                    <td className="py-4 px-4 font-mono">{uni.pathId}</td>
                                    <td className="py-4 px-4">
                                        <img src={uni.imageUrl} alt={uni.name} className="h-12 w-12 object-contain rounded-md" />
                                    </td>
                                   <td className="py-4 px-4">
                                    <Link 
                                        to={`/admin/universities/edit/${uni.id}`}
                                        className="bg-teal-600 text-white flex items-center gap-2 py-1 px-3 rounded-md hover:bg-teal-700">
                                        <FiEdit size={14} /> Manage
                                     </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUniversitiesPage;