import UserLayout from '../components/UserLayout';
import { useState } from 'react';

const ContactPage = () => {
    const [contactData, setContactData] = useState({  
        message: ''
    });
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setMessageType('');
        try {
            const response = await fetch('http://localhost:8001/contactus/createContactUs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(contactData)
            });
            const result = await response.json();
            if (response.ok) {
                setMessage('Message sent successfully!');
                setMessageType('success');
                setTimeout(() => {
                    setMessage(null);
                    setContactData({ message: '' });
                    setMessageType('');
                }, 2500);
            } else {
                setMessage(result.message || 'Failed to send message.');
                setMessageType('error');
                setTimeout(() => {
                    setMessage(null);
                    setMessageType('');
                }, 1500);
            }
        } catch (error) {
            setMessage('Network error. Try again.');
            setMessageType('error');
            setTimeout(() => {
                setMessage(null);
                setMessageType('');
            }, 1500);
        }
    }

    return (
        <UserLayout>
            <div className="container mx-auto px-4 py-16 ">
                <div className="max-w-xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Have a question or want to partner with us? Fill out the form below and we'll get back to you as soon as possible.
                    </p>
                </div>
                <form className="mt-12 max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6" onSubmit={handleContactSubmit}>
                     {message && (
                        <div className={`mt-4 p-3 rounded ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message}
                        </div>
                    )}
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea
                            id="message"
                            name='message'
                            rows={5}
                            required
                            className="mt-1 w-full border border-teal-300 rounded-md shadow-sm px-2 py-2 focus:outline-teal-500"
                            placeholder="Type your message here..."
                            value={contactData.message}
                            onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                        ></textarea>
                    </div>
                    <div className="text-right">
                        <button type="submit" className="bg-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-700">
                            Send Message
                        </button>
                    </div>
                   
                </form>
            </div>
        </UserLayout>
    );
};

export default ContactPage;