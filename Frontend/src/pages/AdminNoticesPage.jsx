import UserLayout from '../components/UserLayout';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const AdminNoticesPage = () => {
    const [notices, setNotices] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8001/notices/getNotificationOfUSer', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                setNotices(data);
            })
            .catch(error => {
                console.error('Error fetching notices:', error);
            });
    }, []);

    const markAsRead = async (noticeId) => {
        try {
            await fetch('http://localhost:8001/notices/markAsRead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ noticeId })
            });

            // Update frontend state
            setNotices(prev =>
                prev.map(n =>
                    n._id === noticeId ? { ...n, isRead: true } : n
                )
            );
        } catch (err) {
            console.error('Failed to mark as read', err);
        }
    };

    return (
        <UserLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="bg-teal-50 p-6 rounded-lg shadow-md mb-8 border-l-4 border-teal-500">
                    <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
                    <p className="text-gray-500"><Link to="/home">Dashboard</Link> / Notifications</p>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-x-auto">
                    <table className="min-w-[700px] w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-4 px-6 text-left text-sm font-bold text-gray-600 uppercase">Title</th>
                                <th className="py-4 px-6 text-left text-sm font-bold text-gray-600 uppercase">Description</th>
                                <th className="py-4 px-6 text-left text-sm font-bold text-gray-600 uppercase">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {notices.length > 0 ? notices.map((notice) => {
                                
                                return (
                                    <tr
                                        key={notice._id}
                                        className={`cursor-pointer hover:bg-gray-50 transition-all duration-150 
  ${!notice.isRead ? 'bg-green-100 font-semibold text-gray-900' : 'bg-white text-gray-600'}`}

                                        onClick={() => {
                                            if (!notice.isRead) {
                                                markAsRead(notice._id);
                                            }
                                        }}
                                    >
                                        <td className="py-4 px-6 text-gray-800 align-top break-words">{notice.title}</td>
                                        <td className="py-4 px-6 text-gray-600 align-top break-words">{notice.description}</td>
                                        <td className="py-4 px-6 text-gray-500 align-top whitespace-nowrap">
                                            {new Date(notice.createdAt).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).replace(',', '')}
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan="3" className="py-4 px-6 text-center text-gray-500">No notices found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </UserLayout>
    );
};

export default AdminNoticesPage;
