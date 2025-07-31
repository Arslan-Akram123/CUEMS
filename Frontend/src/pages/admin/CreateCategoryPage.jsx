// src/pages/admin/CreateCategoryPage.jsx
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiTag } from 'react-icons/fi';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCategoryPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatusMessage({ type: '', text: '' });
        fetch('http://localhost:8001/category/addCategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        })
        .then(async response => {
            const data = await response.json();
            if (response.ok) {
                setStatusMessage({ type: 'success', text: data.message || 'Category created successfully!' });
                setTimeout(() => {
                    setStatusMessage({ type: '', text: '' });
                    navigate('/admin/categories');
                    // window.location.href = '/admin/categories';
                }, 2500);
            } else {
                setStatusMessage({ type: 'error', text: data.message || 'Failed to create category.' });
                setTimeout(() => setStatusMessage({ type: '', text: '' }), 2500);
            }
        })
        .catch(error => {
            setStatusMessage({ type: 'error', text: 'Network error. Try again.' });
            setTimeout(() => setStatusMessage({ type: '', text: '' }), 2500);
        });
    };
  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <FiTag /> Create Category
            </h1>
            <Link
                to="/admin/categories"
                className="flex items-center gap-2 bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300"
            >
                <FiChevronLeft /> Back
            </Link>
        </div>
        
        <form className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto" onSubmit={handleSubmit}>
            {statusMessage.text && (
                <div className={`mb-6 p-4 rounded-md text-sm font-medium ${statusMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {statusMessage.text}
                </div>
            )}
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-700 border-b pb-3">Enter Information</h2>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" id="name" name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                     placeholder="Enter Category Name" className="w-full border-1 py-2 px-2 border-teal-500 rounded-md  focus:outline-teal-500 shadow-sm focus:border-teal-500 focus:ring-teal-500" />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea id="description" name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                     rows={4} placeholder="Enter your Description here..." className="w-full border-1 py-2 px-2 border-teal-500  focus:outline-teal-500 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"></textarea>
                </div>
                <div className="text-right">
                    <button type="submit" className="bg-teal-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-teal-700">
                        Add Category
                    </button>
                </div>
            </div>
        </form>
    </div>
  );
};

export default CreateCategoryPage;