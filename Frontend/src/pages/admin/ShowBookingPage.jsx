// src/pages/admin/ShowBookingPage.jsx
import { Link, useParams } from 'react-router-dom';
import { FiCheck, FiX, FiChevronLeft } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Reusable component for displaying a read-only field
const InfoField = ({ label, value }) => (
    <div>
        <label className="block text-sm font-medium text-gray-500">{label}</label>
        <div className="mt-1 p-2 bg-gray-100 border border-gray-200 rounded-md">{value || '---'}</div>
    </div>
);



const ShowBookingPage = () => {
    const { bookingId } = useParams();
    const [booking, setBooking] = useState([]);
    const [msg, setMsg] = useState({ type: '', text: '' });
   const navigate = useNavigate();
    useEffect(() => {
        fetch(`http://localhost:8001/eventsbook/getBooking/${bookingId}`,
             { credentials: 'include' }
            ).then(res => res.json())
            .then(data => setBooking(data))
            .catch(err => console.error(err));
    }, []);

    const handleConfirmBooking = (bookingId) => {
        fetch(`http://localhost:8001/eventsbook/confirmBooking/${bookingId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                setMsg({ type: 'error', text: data.error });
                setTimeout(() => {
                    setMsg({ type: '', text: '' });
                }, 2500);
            } else {
                setMsg({ type: 'success', text: 'Booking confirmed successfully.' });
                setTimeout(() => {
                    setMsg({ type: '', text: '' });
                    navigate('/admin/dashboard');
                }, 2500);
            }
        })
        .catch(err => {
            setMsg({ type: 'error', text: 'Error confirming booking.' });
            setTimeout(() => {
                setMsg({ type: '', text: '' });
            }, 2500);
        });
    }

    const handleCancelBooking = (bookingId) => {
        fetch(`http://localhost:8001/eventsbook/cancelBooking/${bookingId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                setMsg({ type: 'error', text: data.error });
                setTimeout(() => {
                    setMsg({ type: '', text: '' });
                }, 2500);
            } else {
                setMsg({ type: 'success', text: 'Booking cancelled successfully.' });
                setTimeout(() => {
                    setMsg({ type: '', text: '' });
                    navigate('/admin/dashboard');
                }, 2500);
            }
        })
        .catch(err => {
            setMsg({ type: 'error', text: 'Error cancelling booking.' });
            setTimeout(() => {
                setMsg({ type: '', text: '' });
            }, 2500);
        });
    }
    return (
        <div>
            {msg.text && (
                <div className={`mb-4 px-4 py-2 rounded text-center font-semibold ${msg.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {msg.text}
                </div>
            )}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Show Booking</h1>
                <div className="flex gap-4">
                    <button onClick={() => handleConfirmBooking(bookingId)} className="flex items-center gap-2  bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600"><FiCheck /> Confirm</button>
                    <button onClick={() => handleCancelBooking(bookingId)} className="flex items-center gap-2 bg-red-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-800"><FiX /> Cancel</button>
                    <Link to="/admin/dashboard" className="flex items-center gap-2 bg-yellow-400 text-yellow-900 font-bold py-2 px-4 rounded-lg hover:bg-yellow-500"><FiChevronLeft /> Back</Link>
                </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md space-y-8">
                {/* Booking Info */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">Booking Information</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <InfoField label="Booking No" value={bookingId} />
                        {/* <InfoField label="Total Subscribers" value={booking.subscribers} /> */}
                        <InfoField label="Status" value={booking?.status} />
                        <div className="md:col-span-3">
                            <InfoField label="Notes" value={booking?.bookingNotes} />
                        </div>
                    </div>
                </section>
                
                {/* Member Info */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">Member Information</h2>
                    <div className="grid md:grid-cols-3 gap-6 items-start">
                        <div className="flex flex-col items-center">
                            <img src={`/uploads/${booking?.user?.profileImageURL}`} alt="Member" className="h-48 w-48 rounded-full object-cover bg-gray-200" />
                            {/* <label className="mt-2 text-sm font-medium text-gray-700">Image</label> */}
                        </div>
                        <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
                            <InfoField label="Name" value={booking?.user?.fullName} />
                            <InfoField label="Email" value={booking?.user?.email} />
                            <InfoField label="Role" value={booking?.user?.role} />
                            {/* Add other member fields if necessary */}
                        </div>
                    </div>
                </section>
                
                {/* Event Info */}
                 <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">Event Information</h2>
                    <div className="grid md:grid-cols-3 gap-6 items-start">
                        <div className="flex flex-col items-center">
                            <img src={`/uploads/events/${booking?.event?.image}`} alt="Event" className="h-60 w-60 object-contain bg-gray-100 p-2 rounded-md" />
                            {/* <label className="mt-2 text-sm font-medium text-gray-700">Image</label> */}
                        </div>
                         <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
                            <InfoField label="Title" value={booking?.event?.name} />
                            <InfoField label="Category" value={booking?.event?.category} />
                            {/* <InfoField label="Sponsors" value={booking.event.sponsors} /> */}
                            <InfoField label="Location" value={booking?.event?.location} />
                            <InfoField label="Price" value={`$${booking?.event?.price}`} />
                            <InfoField label="Total Subscribers" value={
                [booking?.event?.totalSubscribers, booking?.event?.bookings, booking?.event?.reservedSeats]
                  .map(x => Number(x) || 0)
                  .reduce((a, b) => a + b, 0)
              } />
                         </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ShowBookingPage;