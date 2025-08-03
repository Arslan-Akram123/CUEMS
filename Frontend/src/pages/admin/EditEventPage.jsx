// src/pages/admin/EditEventPage.jsx

import { Link, useParams, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiUpload, FiEdit } from 'react-icons/fi';
import { useState, useEffect } from 'react';

const FormInput = ({ label, id, type = "text", placeholder, value, onChange }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input type={type} id={id} name={id} placeholder={placeholder} value={value} onChange={onChange} className="w-full border-teal-500 rounded-md shadow-sm focus:border-teal-500 py-2 px-2 border-1  focus:outline-teal-500 focus:ring-teal-500" />
    </div>
);

const EditEventPage = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState({
        name: '',
        location: '',
        totalSubscribers: '',
        price: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        category: '',
        description: '',
        image: null
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Helper to format date to YYYY-MM-DD
        const formatDate = (dateStr) => {
            if (!dateStr) return '';
            const d = new Date(dateStr);
            if (isNaN(d.getTime())) return '';
            // Get YYYY-MM-DD
            return d.toISOString().slice(0, 10);
        };
        fetch(`http://localhost:8001/events/getEvent/${eventId}`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                setEventData({
                    name: data.name || '',
                    location: data.location || '',
                    totalSubscribers: data.totalSubscribers || '',
                    price: data.price || '',
                    startDate: formatDate(data.startDate),
                    endDate: formatDate(data.endDate),
                    startTime: data.startTime || '',
                    endTime: data.endTime || '',
                    category: data.category || '',
                    description: data.description || '',
                    image: null
                });
                if (data.image) {
                    setImagePreview(`/uploads/events/${data.image}`);
                }
            })
            .catch(err => {
                setMessage('Failed to fetch event data.');
                setMessageType('error');
            });
    }, [evntId]);

    useEffect(() => {
        fetch('http://localhost:8001/category/getCategories', {
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setEventData(prev => ({ ...prev, image: file }));
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setMessageType('');

        // Validation: end date >= start date
        const startDate = eventData.startDate ? new Date(eventData.startDate) : null;
        const endDate = eventData.endDate ? new Date(eventData.endDate) : null;
        if (startDate && endDate && endDate < startDate) {
            setMessage('End date must be equal to or greater than start date.');
            setMessageType('error');
            setTimeout(() => {
                setMessage(null);
                setMessageType('');
            }, 1500);
            return;
        }

        // Validation: end time > start time (if same date)
        if (startDate && endDate && eventData.startTime && eventData.endTime && endDate.getTime() === startDate.getTime()) {
            // Parse times as minutes since midnight
            const [sh, sm] = eventData.startTime.split(':').map(Number);
            const [eh, em] = eventData.endTime.split(':').map(Number);
            const startMinutes = sh * 60 + (sm || 0);
            const endMinutes = eh * 60 + (em || 0);
            if (endMinutes <= startMinutes) {
                setMessage('End time must be greater than start time for the same date.');
                setMessageType('error');
                setTimeout(() => {
                    setMessage(null);
                    setMessageType('');
                }, 1500);
                return;
            }
        }

        const formData = new FormData();
        Object.entries(eventData).forEach(([key, value]) => {
            if (key === 'image' && value) {
                formData.append('image', value);
            } else if (key !== 'image') {
                formData.append(key, value);
            }
        });
        try {
            const response = await fetch(`http://localhost:8001/events/updateEvent/${eventId}`, {
                method: 'PUT',
                credentials: 'include',
                body: formData
            });
            const result = await response.json();
            if (response.ok) {
                setMessage(result.message || 'Event updated successfully!');
                setMessageType('success');
                setTimeout(() => {
                    navigate('/admin/events');
                }, 1200);
            } else {
                setMessage(result.message || 'Failed to update event.');
                setMessageType('error');
            }
        } catch (error) {
            setMessage('Network error. Try again.');
            setMessageType('error');
        }
    };

    const handleDelete = async () => {
        setMessage(null);
        setMessageType('');
        try {
            const response = await fetch(`http://localhost:8001/events/deleteEvent/${eventId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const result = await response.json();
            if (response.ok) {
                setMessage(result.message || 'Event deleted successfully!');
                setMessageType('success');
                setTimeout(() => {
                    navigate('/admin/events');
                }, 1200);
            } else {
                setMessage(result.message || 'Failed to delete event.');
                setMessageType('error');
            }
        } catch (error) {
            setMessage('Network error. Try again.');
            setMessageType('error');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <FiEdit /> Edit Event
                </h1>
                <Link
                    to="/admin/events"
                    className="flex items-center gap-2 bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    <FiChevronLeft /> Back
                </Link>
            </div>

            {message && (
                <div className={`mb-4 p-3 rounded text-center font-semibold ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}

            <form className="bg-white p-8 rounded-lg shadow-md space-y-8" onSubmit={handleSubmit}>
                {/* Basic Info & Image */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <FormInput label="Name" id="name" value={eventData.name} onChange={handleInputChange} />
                        <FormInput label="Location" id="location" value={eventData.location} onChange={handleInputChange} />
                        <FormInput label="Total Subscribers" id="totalSubscribers" type="number" value={eventData.totalSubscribers} onChange={handleInputChange} />
                        <FormInput label="Price" id="price" type="number" value={eventData.price} onChange={handleInputChange} />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500">
                                    <span>Upload an image</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                                </label>
                                {imagePreview && (
                                    <img src={imagePreview} alt="Preview" className="mt-2 mx-auto max-h-32 rounded" />
                                )}
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Date and Time */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Date and Time Zone</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormInput label="Start Date" id="startDate" type="date" value={eventData.startDate} onChange={handleInputChange} />
                        <FormInput label="End Date" id="endDate" type="date" value={eventData.endDate} onChange={handleInputChange} />
                        <FormInput label="Start Time" id="startTime" type="time" value={eventData.startTime} onChange={handleInputChange} />
                        <FormInput label="End Time" id="endTime" type="time" value={eventData.endTime} onChange={handleInputChange} />
                    </div>
                </div>

                {/* Category and Description */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select id="category" name="category" value={eventData.category} onChange={handleInputChange} className="w-full border-1 py-2 px-2  focus:outline-teal-500 border-teal-500 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500">
                        <option value="">Select Category</option>
                        {categories && categories.length > 0 && categories.map(cat => (
                            <option key={cat._id || cat.id || cat.name} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea id="description" name="description" rows={4} className="w-full py-2 px-2 border-1  focus:outline-teal-500 border-teal-500 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500" value={eventData.description} onChange={handleInputChange}></textarea>
                </div>

                <div className="flex justify-end gap-4">
                    <button type="button" className="bg-red-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-600" onClick={handleDelete}>
                        Delete Event
                    </button>
                    <button type="submit" className="bg-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-700">
                        Update Event
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEventPage;