// src/pages/admin/EditEventPage.jsx
import { Link, useParams } from 'react-router-dom';
import { FiChevronLeft, FiUpload, FiEdit } from 'react-icons/fi';

// In a real app, this data would come from an API call
const mockAdminEvents = [
    { id: 1, name: "International Workshop", category: "Technology", date: "2025-02-26", location: "Online", subscribers: 150, price: 50, description: "A workshop on modern web technologies." },
    { id: 2, name: "LUMS Live Session", category: "Music", date: "2025-04-08", location: "LUMS Campus", subscribers: 200, price: 0, description: "Live music session featuring local bands." },
    { id: 3, name: "CSS Mentorship", category: "Education", date: "2025-03-28", location: "Online", subscribers: 75, price: 25, description: "A session for CSS aspirants." },
];

// Reusable form input component
const FormInput = ({ label, id, type = "text", placeholder, defaultValue }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input type={type} id={id} name={id} placeholder={placeholder} defaultValue={defaultValue} className="w-full border-teal-500 rounded-md shadow-sm focus:border-teal-500 py-2 px-2 border-1  focus:outline-teal-500 focus:ring-teal-500" />
    </div>
);

const EditEventPage = () => {
    // Get the event ID from the URL
    const { eventId } = useParams();
    
    // Find the specific event to edit from our mock data
    const eventToEdit = mockAdminEvents.find(e => e.id === parseInt(eventId));

    // If no event is found for the ID, show a message
    if (!eventToEdit) {
        return (
            <div>
                <h1 className="text-2xl font-bold">Event not found</h1>
                <Link to="/admin/events" className="text-teal-600 hover:underline">Return to Events List</Link>
            </div>
        );
    }
    
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

            <form className="bg-white p-8 rounded-lg shadow-md space-y-8">
                {/* Basic Info & Image */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <FormInput label="Name" id="name" placeholder="Enter event name" defaultValue={eventToEdit.name} />
                        <FormInput label="Location" id="location" placeholder="Enter event location" defaultValue={eventToEdit.location} />
                        <FormInput label="Total Subscribers" id="totalSubscribers" type="number" placeholder="e.g., 100" defaultValue={eventToEdit.subscribers} />
                        <FormInput label="Price" id="price" type="number" placeholder="e.g., 25" defaultValue={eventToEdit.price} />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500">
                                        <span>Upload an image</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Date and Time */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Date and Time Zone</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormInput label="Start Date" id="startDate" type="date" defaultValue={eventToEdit.date} />
                        <FormInput label="End Date" id="endDate" type="date" />
                        <FormInput label="Start Time" id="startTime" type="time" />
                        <FormInput label="End Time" id="endTime" type="time" />
                    </div>
                </div>

                {/* Category and Description */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select id="category" name="category" defaultValue={eventToEdit.category} className="w-full border-1 py-2 px-2  focus:outline-teal-500 border-teal-500 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500">
                        <option>Select Category</option>
                        <option>Technology</option>
                        <option>Music</option>
                        <option>Sports</option>
                        <option>Education</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea id="description" name="description" rows={4} className="w-full py-2 px-2 border-1  focus:outline-teal-500 border-teal-500 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500" defaultValue={eventToEdit.description}></textarea>
                </div>

                <div className="flex justify-end gap-4">
                    <button type="button" className="bg-red-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-600">
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