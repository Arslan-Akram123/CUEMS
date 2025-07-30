// src/pages/AdminNoticesPage.jsx
import UserLayout from '../components/UserLayout';
import { Link } from 'react-router-dom';
// Mock data representing notices fetched from the server
const mockNotices = [
    { id: 1, title: "Security Issues", content: "The goal of a ransomware attack is to gain exclusive control of critical data. The hacker encrypts and holds your data hostage and then demands a ransom payment in exchange for the decryption key you need to access the files.", date: "2024-07-10" },
    { id: 2, title: "Net ni laga Hostel leave notice", content: "hgadfgsa sdafjfdafdafjdsfjsfjdsfjfjdsfjdssdfjfvdsjf", date: "2024-07-09" },
    { id: 3, title: "4564646", content: "uydtstoyv tfy ty ftyfuf", date: "2024-07-08" },
    { id: 4, title: "maintance", content: "our site is under maintenance so we need few time to finish bugs and hope you will got good user experience after that", date: "2024-07-05" },
    { id: 5, title: "event s Delay", content: "asdas afdfsdfsdf", date: "2024-07-02" },
    { id: 6, title: "Site Maintenance", content: "Nobody likes an unavailable website. But if you must take your site offline, a clear and well-designed maintenance page can turn around a bad experience.", date: "2024-06-28" },
];


const AdminNoticesPage = () => {
    return (
        <UserLayout>
            <div className="container mx-auto px-4 py-8">
                {/* Header section of the page content */}
                <div className="bg-teal-50 p-6 rounded-lg shadow-md mb-8 border-l-4 border-teal-500">
                    <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
                    <p className="text-gray-500"><Link to="/home">Dashboard</Link> / Notifications</p>
                </div>

                {/* Notices Table - Responsive */}
                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <table className="min-w-[700px] w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-4 px-6 text-left text-sm font-bold text-gray-600 uppercase whitespace-nowrap">Title</th>
                                <th className="py-4 px-6 text-left text-sm font-bold text-gray-600 uppercase whitespace-nowrap">Notifications</th>
                                <th className="py-4 px-6 text-left text-sm font-bold text-gray-600 uppercase whitespace-nowrap">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {mockNotices.map((notice) => (
                                <tr key={notice.id} className="hover:bg-gray-50">
                                    <td className="py-4 px-6 font-semibold text-gray-800 align-top max-w-xs break-words">{notice.title}</td>
                                    <td className="py-4 px-6 text-gray-600 leading-relaxed max-w-md break-words">{notice.content}</td>
                                    <td className="py-4 px-6 text-gray-500 align-top whitespace-nowrap">{notice.date || 'null'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </UserLayout>
    );
};

export default AdminNoticesPage;