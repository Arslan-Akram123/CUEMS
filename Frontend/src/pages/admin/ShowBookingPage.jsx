// src/pages/admin/ShowBookingPage.jsx
import { Link, useParams } from 'react-router-dom';
import { FiCheck, FiX, FiChevronLeft } from 'react-icons/fi';

// Reusable component for displaying a read-only field
const InfoField = ({ label, value }) => (
    <div>
        <label className="block text-sm font-medium text-gray-500">{label}</label>
        <div className="mt-1 p-2 bg-gray-100 border border-gray-200 rounded-md">{value || '---'}</div>
    </div>
);

// Mock data - in a real app, you would fetch all this with a single API call using the bookingId
const mockBookingDetails = {
    id: 7,
    bookingNo: '7813537050113551',
    subscribers: 3,
    status: 'pending',
    notes: 'wqdc ref refw fg',
    member: { name: 'test', email: 'testuser@gmail.com', role: 'user', image: 'https://via.placeholder.com/150/CBD5E1/84848D?text=User' },
    event: { title: 'Baxter Spears', category: '---', status: '---', sponsors: '---', location: 'Lorem labore et dolo', price: '522', description: 'Excepteur laborum l', startDate: '1979-10-21', endDate: '1993-06-23', startTime: '16:49', endTime: '20:02', image: 'https://via.placeholder.com/150' },
};

const ShowBookingPage = () => {
    const { bookingId } = useParams();
    // For now, we use the single mock object. In a real app, you'd find the booking by ID.
    const booking = mockBookingDetails;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Show Booking</h1>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2  bg-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-600"><FiCheck /> Confirm</button>
                    <button className="flex items-center gap-2 bg-red-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-800"><FiX /> Cancel</button>
                    <Link to="/admin/dashboard" className="flex items-center gap-2 bg-yellow-400 text-yellow-900 font-bold py-2 px-4 rounded-lg hover:bg-yellow-500"><FiChevronLeft /> Back</Link>
                </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md space-y-8">
                {/* Booking Info */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">Booking Information</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <InfoField label="Booking No" value={booking.bookingNo} />
                        <InfoField label="Total Subscribers" value={booking.subscribers} />
                        <InfoField label="Status" value={booking.status} />
                        <div className="md:col-span-3">
                            <InfoField label="Notes" value={booking.notes} />
                        </div>
                    </div>
                </section>
                
                {/* Member Info */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">Member Information</h2>
                    <div className="grid md:grid-cols-3 gap-6 items-start">
                        <div className="flex flex-col items-center">
                            <img src={booking.member.image} alt="Member" className="h-32 w-32 rounded-full object-cover bg-gray-200" />
                            <label className="mt-2 text-sm font-medium text-gray-700">Image</label>
                        </div>
                        <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
                            <InfoField label="Name" value={booking.member.name} />
                            <InfoField label="Email" value={booking.member.email} />
                            <InfoField label="Role" value={booking.member.role} />
                            {/* Add other member fields if necessary */}
                        </div>
                    </div>
                </section>
                
                {/* Event Info */}
                 <section>
                    <h2 className="text-xl font-semibold mb-4 border-b pb-2">Event Information</h2>
                    <div className="grid md:grid-cols-3 gap-6 items-start">
                        <div className="flex flex-col items-center">
                            <img src={booking.event.image} alt="Event" className="h-32 w-32 object-contain bg-gray-100 p-2 rounded-md" />
                            <label className="mt-2 text-sm font-medium text-gray-700">Image</label>
                        </div>
                         <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
                            <InfoField label="Title" value={booking.event.title} />
                            <InfoField label="Category" value={booking.event.category} />
                            <InfoField label="Sponsors" value={booking.event.sponsors} />
                            <InfoField label="Location" value={booking.event.location} />
                            <InfoField label="Price" value={`$${booking.event.price}`} />
                            <InfoField label="Total Subscribers" value={booking.event.subscribers} />
                         </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ShowBookingPage;