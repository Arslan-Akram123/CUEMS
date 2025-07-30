// src/components/admin/AdminHeader.jsx
import { FiBell, FiUser, FiLogOut, FiMenu, FiTrash2, FiClock } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../../context/ProfileContext/ProfileContext';


const AdminHeader = ({ onMenuButtonClick }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // New state for the notification dropdown
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const { formData, fetchProfileData, setFormData } = useProfile();
    const notificationRef = useRef(null);
    const profileRef = useRef(null);
    // Mock notification data
    const notifications = [
        { id: 1, user: 'testuser@gmail.com' }
    ];


    useEffect(() => {
        fetchProfileData();
    }, []);

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target) &&
                isNotificationOpen
            ) {
                setIsNotificationOpen(false);
            }
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target) &&
                isDropdownOpen
            ) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isNotificationOpen, isDropdownOpen]);

    function handleLogout() {
        setIsDropdownOpen(false);
       
        fetch('http://localhost:8001/auth/logout', {
            method: 'POST',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            console.log('Logout successful:', data);
        localStorage.clear();
        setFormData({
            fullName: '',
            street: '',
            country: '',
            city: '',
            state: '',
            postalCode: '',
            phoneNumber: '',
            email: '',
            profileImage: ''
        })
            window.location.href = '/login';
        })
        .catch(error => {
            console.error('Error logging out:', error);
        }) 
    }

    return (
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between lg:justify-end px-6">
            
            <button onClick={onMenuButtonClick} className="lg:hidden text-gray-500 focus:outline-none">
                <FiMenu size={24} />
            </button>
            
            <div className="flex items-center gap-6">
                {/* --- NOTIFICATION DROPDOWN --- */}
                <div className="relative" ref={notificationRef}>
                    <button onClick={() => setIsNotificationOpen(prevState => !prevState)} className="relative">
                        <FiBell className="h-8 mt-2 w-8 text-gray-500" />
                        {notifications.length > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                {notifications.length}
                            </span>
                        )}
                    </button>
                    {/* The notification dropdown panel */}
                    {isNotificationOpen && (
                        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                            <div className="p-4 border-b">
                                <h4 className="font-semibold">You have {notifications.length} booking</h4>
                            </div>
                            <div className="py-2">
                                {notifications.map(notif => (
                                    <div key={notif.id} className="flex justify-between items-center px-4 py-2 hover:bg-gray-100">
                                        <p className="text-sm text-gray-700">{notif.id})-{notif.user}</p>
                                        <div className="flex gap-3 text-gray-400">
                                            <FiTrash2 className="cursor-pointer hover:text-red-500"/>
                                            <FiClock className="cursor-pointer hover:text-blue-500"/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                
                {/* User Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                    <button onClick={() => setIsDropdownOpen(prevState => !prevState)} className="flex items-center gap-2">
                                <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                                  {formData.profileImage ? (
                                    typeof formData.profileImage === 'string' ? (
                                      <img src={`/uploads/${formData.profileImage}`} alt="Profile" className="h-12 w-12 object-cover" />
                                    ) : (
                                      <img src={URL.createObjectURL(formData.profileImage)} alt="Profile" className="h-12 w-12 object-cover" />
                                    )
                                  ) : (
                                    <FiUser className="h-7 w-7 text-gray-600" />
                                  )}
                                </span>
                                <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white"></span>
                            </button>
                    {isDropdownOpen && (
                         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                            <Link to="/admin/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <FiUser className="mr-3" /> Profile
                            </Link>
                            <button
                              type="button"
                              onClick={handleLogout}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <FiLogOut className="mr-3 text-red-500" /> <span className='text-red-500'>Logout</span>
                            </button>
    
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;