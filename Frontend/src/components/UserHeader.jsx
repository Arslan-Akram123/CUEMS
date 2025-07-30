// src/components/UserHeader.jsx
import { useEffect, useState, useRef } from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import { FiSearch, FiUser, FiBell, FiBookOpen, FiLogOut  } from 'react-icons/fi';
import { useProfile } from '../context/ProfileContext/ProfileContext';
const UserHeader = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const userMenuRef = useRef(null);
    const notificationRef = useRef(null);
    const { formData, setFormData, fetchProfileData } = useProfile();
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        fetchProfileData();
    },[]);

    useEffect(() => {
        fetch('http://localhost:8001/category/getCategories',{ credentials: 'include',})
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);
    // Close user menu and notification dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target) && isUserMenuOpen) {
                setIsUserMenuOpen(false);
            }
            if (notificationRef.current && !notificationRef.current.contains(event.target) && isNotificationOpen) {
                setIsNotificationOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isUserMenuOpen, isNotificationOpen]);
    const handleSignOut = () => {
        setIsUserMenuOpen(false);
       
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
        });
            window.location.href = '/login';
        })
        .catch(error => {
            console.error('Error logging out:', error);
        })
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-40">
            {/* === MAIN CONTAINER - Changed layout logic here === */}
            <div className="container mx-auto px-4">
                
                {/* --- TOP ROW (Always visible) --- */}
                {/* On small screens, it's a row with space-between. On medium screens, it becomes part of the larger flex layout. */}
                <div className="flex items-center justify-between gap-3 h-20 md:h-auto md:py-4">
                    
                    {/* LOGO */}
                    <Link to="/home"><Logo /></Link>

                    {/* SEARCH BAR - This is the biggest change */}
                    {/* It's hidden on small screens in this row, but visible in the row below */}
                    <div className="relative w-full max-w-xl hidden md:block">
                        <input type="text" placeholder="Search Here ..." className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"/>
                        <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>

                    {/* USER ICONS & DROPDOWN */}
                    <div className="flex items-center gap-4">
                        <div className="relative" ref={notificationRef}>
                            <button onClick={() => setIsNotificationOpen(prev => !prev)} className="relative">
                                <FiBell className="h-8 mt-2 w-8 text-gray-600 hover:text-teal-600 cursor-pointer" />
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">1</span>
                            </button>
                            {isNotificationOpen && (
                                <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                                    <div className="p-4 border-b">
                                        <h4 className="font-semibold">You have 1 notification</h4>
                                    </div>
                                    <div className="py-2">
                                        <div className="flex justify-between items-center px-4 py-2 hover:bg-gray-100">
                                            <p className="text-sm text-gray-700">1) your booking is confirmed!</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <div className="relative" ref={userMenuRef}>
                            <button onClick={() => setIsUserMenuOpen(prevState => !prevState)} className="flex items-center gap-2">
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
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-50 border border-gray-200 py-1">
                                    <Link
                                        to="/profile"
                                        onClick={() => setIsUserMenuOpen(false)}
                                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <FiUser className="mr-3" /> Profile
                                    </Link>
                                    <Link to="/my-bookings" onClick={() => setIsUserMenuOpen(false)} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <FiBookOpen className="mr-3" /> Booking
                                    </Link>
                                    <button
                                      type="button"
                                      onClick={() => handleSignOut()}
                                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      <FiLogOut className="mr-3" /> Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- BOTTOM ROW (Mobile-only Search Bar) --- */}
                {/* This div is only visible on small screens (block) and hidden on medium and larger screens (md:hidden) */}
                <div className="pb-4 md:hidden">
                    <div className="relative w-full">
                         <input type="text" placeholder="Search Here ..." className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"/>
                        <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                </div>

            </div>

            {/* Bottom part of the header - Category Navigation (No changes needed here) */}
            <div className="border-t border-gray-200 bg-teal-600 text-white">
                <nav
                    className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-teal-400 scrollbar-track-teal-100"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                >
                    <div className="flex items-center justify-start md:justify-center space-x-6 px-4 min-w-max">
                        {categories.length > 0 ? categories.map((category) => (
                            <Link
                                key={category._id}
                                to={`/category/${category.name}`}
                                className="py-2 px-3 whitespace-nowrap hover:bg-teal-700 rounded-md transition-colors"
                                tabIndex={0}
                            >
                                {category.name}
                            </Link>
                        )): null}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default UserHeader;