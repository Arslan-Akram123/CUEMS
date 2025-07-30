// src/pages/admin/CreateEventPage.jsx
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiUpload, FiPlus } from 'react-icons/fi';

// A reusable form input component to reduce repetition
const FormInput = ({ label, id, type = "text", placeholder }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input type={type} id={id} name={id} placeholder={placeholder} className="w-full border-teal-500  focus:outline-teal-500 px-2 py-2 border-1 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500" />
    </div>
);

const CreateEventPage = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <FiPlus /> Create Event
                </h1>
                <Link
                    to="/admin/events"
                    className="flex items-center gap-2 bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    <FiChevronLeft /> Back
                </Link>
            </div>

            {/* Progress Bar (Static for now) */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
                <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: '50%' }}></div>
            </div>

            <form className="bg-white p-8 rounded-lg shadow-md space-y-8">
                {/* Basic Info & Image */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <FormInput label="Name" id="name" placeholder="Enter event name" />
                        <FormInput label="Location" id="location" placeholder="Enter event location" />
                        <FormInput label="Total Subscribers" id="totalSubscribers" type="number" placeholder="e.g., 100" />
                        <FormInput label="Price" id="price" type="number" placeholder="e.g., 25" />
                    </div>
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none">
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
                        <FormInput label="Start Date" id="startDate" type="date" />
                        <FormInput label="End Date" id="endDate" type="date" />
                        <FormInput label="Start Time" id="startTime" type="time" />
                        <FormInput label="End Time" id="endTime" type="time" />
                    </div>
                </div>

                {/* Category and Description */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select id="category" name="category" className="w-full border-teal-500 py-2 px-2 rounded-md shadow-sm border-1  focus:outline-teal-500 focus:border-teal-500 focus:ring-teal-500">
                        <option>Select Category</option>
                        <option>Technology</option>
                        <option>Music</option>
                        <option>Sports</option>
                        <option>Education</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea id="description" name="description" rows={4} className="w-full border-1 py-2 px-2 border-teal-500 rounded-md shadow-sm focus:border-teal-500  focus:outline-teal-500 focus:ring-teal-500" placeholder="Write a brief description of the event..."></textarea>
                </div>

                {/* Save Button */}
                <div className="text-right">
                    <button type="submit" className="bg-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-700 transition-colors">
                        Save Event
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateEventPage;