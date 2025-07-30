// src/pages/admin/AdminUsersPage.jsx
import ToggleSwitch from '../../components/admin/ToggleSwitch';

const mockUsers = [
    { id: 1, username: "Ansa Bano", email: "ansashafique200@gmail.com", role: "user", date: "3 days ago", status: false },
    { id: 2, username: "M.Arslan", email: "marslan.devtech@gmail.com", role: "admin", date: "2 days ago", status: true },
   
];

const AdminUsersPage = () => {

    const getStatusClass = (status) => {
        return status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Users</h1>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Information Users</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">Make Admin</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-sm">
                            {mockUsers.map((user, index) => (
                                <tr key={user.id}>
                                    <td className="py-4 px-4">{index + 1}</td>
                                    <td className="py-4 px-4 font-semibold">{user.username}</td>
                                    <td className="py-4 px-4">{user.email}</td>
                                    <td className="py-4 px-4 capitalize">{user.role}</td>
                                    <td className="py-4 px-4">{user.date}</td>
                                    <td className="py-4 px-4">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(user.status)}`}>
                                            {user.status ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <ToggleSwitch initialState={user.role === 'admin'} />
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

export default AdminUsersPage;