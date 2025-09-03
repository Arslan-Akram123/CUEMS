// src/pages/admin/EditUniversityPage.jsx
import { Link, useParams } from 'react-router-dom';
import { FiChevronLeft, FiHome } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const EditUniversityPage = () => {
    const { universityId } = useParams();
    const [universityToEdit, setUniversityToEdit] = useState({
        name: '',
        shortName: '',
        description: '',
        logo: null
    });
    const navigate = useNavigate();
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUniversityToEdit({ ...universityToEdit, [name]: value });
    };
    const handleLogoChange = (e) => {
        setUniversityToEdit({ ...universityToEdit, logo: e.target.files[0] });
    };
    useEffect(() => {
        fetch(`http://localhost:8001/universities/getUniversity/${universityId}`,{credentials: 'include'})
            .then((response) => response.json())
            .then((data) => {
                setUniversityToEdit(data);
            })
            .catch((error) => {
                console.error('Error fetching university data:', error);
            });
    }, []);



    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', universityToEdit.name);
        formData.append('shortName', universityToEdit.shortName);
        formData.append('description', universityToEdit.description);
        formData.append('logo', universityToEdit.logo);

        setMessage(null);
        setMessageType('');

        try {
            const response = await fetch(`http://localhost:8001/universities/updateUniversity/${universityId}`, {
                method: 'PUT',
                credentials: 'include',
                body: formData
            });
            const result = await response.json();
            if (response.ok) {
                setMessage(result.message || 'University updated successfully!');
                setMessageType('success');
                setTimeout(() => {
                        setMessage(null);
                        setMessageType('');
                    navigate('/admin/universities');
                }, 1200);
            } else {
                setMessage(result.error || 'Failed to update university.');
                setMessageType('error');
                setTimeout(() => {
                    setMessage(null);
                    setMessageType('');
                }, 1200);
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
            const response = await fetch(`http://localhost:8001/universities/deleteUniversity/${universityId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const result = await response.json();
            if (response.ok) {
                setMessage(result.message || 'University deleted successfully!');
                setMessageType('success');
                setTimeout(() => {
                    navigate('/admin/universities');
                }, 1200);
            } else {
                setMessage(result.message || 'Failed to delete university.');
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
                    <FiHome /> Edit University
                </h1>
                <Link
                    to="/admin/universities"
                    className="flex items-center gap-2 bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300"
                >
                    <FiChevronLeft /> Back
                </Link>
            </div>

            {message && (
                <div className={`mb-4 p-3 rounded text-center font-semibold ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}

            <form className="bg-white p-8 rounded-lg shadow-md space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">University Name</label>
                    <input type="text" id="name"
                    name='name'
                     value={universityToEdit.name}
                     onChange={handleInputChange}
                      className="w-full px-2 py-2 border-1  focus:outline-teal-500 border-teal-500 rounded-md shadow-sm"/>
                </div>
                 <div>
                    <label htmlFor="shortName" className="block text-sm font-medium text-gray-700 mb-1">Short Name (e.g., 'mul', 'ucp')</label>
                    <input type="text" id="shortName"
                    name='shortName'
                     value={universityToEdit.shortName}
                     onChange={handleInputChange}
                      className="w-full px-2 py-2 border-1  focus:outline-teal-500 border-teal-500 rounded-md shadow-sm"/>
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea id="description" name='description' rows={4} value={universityToEdit.description}
                     onChange={handleInputChange} className="w-full px-2 py-2 border-1  focus:outline-teal-500 border-teal-500 rounded-md shadow-sm"></textarea>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Logo</label>
                    <img src={`/uploads/universities/${universityToEdit.logo}`} alt="Current Logo" className="h-20 w-20 object-contain rounded-md bg-gray-100 p-1"/>
                    <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mt-4">Upload New Logo</label>
                    <input type="file" accept="image/*" id="logo" name='logo'
                     onChange={handleLogoChange}
                     className="mt-1 border-1 border-teal-500 rounded-2xl block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700  focus:outline-teal-500 hover:file:bg-teal-100"/>
                </div>
                <div className="flex justify-end gap-3">
                    <button type="submit" className="bg-teal-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-teal-700">
                        Update University
                    </button>
                     <button type="button" onClick={handleDelete} className="bg-red-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-red-700">
                        Delete University
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUniversityPage;