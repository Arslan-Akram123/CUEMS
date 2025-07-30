// src/pages/admin/ConfirmBookingsPage.jsx
import { Link } from 'react-router-dom';
import BookingsTable from '../../components/admin/BookingsTable';
import { FiChevronLeft, FiCheckCircle } from 'react-icons/fi';

// We reuse the same full list of bookings
const allBookings = [
    { id: 1, bookingNo: '7956860243590764', member: 'test', event: 'Karleigh Ramos', subscribers: 1, status: 'cancel', date: '219 days ago' },
    { id: 2, bookingNo: '852270968071633', member: 'test', event: 'Hedwig Hartman', subscribers: 1, status: 'confirm', date: '253 days ago' },
    { id: 3, bookingNo: '3275627859926799', member: 'test', event: 'Richard Ford', subscribers: 1, status: 'cancel', date: '193 days ago' },
    { id: 4, bookingNo: '3253511849926560', member: 'test', event: 'Imogene Gillespie', subscribers: 1, status: 'confirm', date: '203 days ago' },
    { id: 5, bookingNo: '5307751946657033', member: 'test', event: 'Become a Web Developer', subscribers: 1, status: 'confirm', date: '424 days ago' },
    { id: 6, bookingNo: '4421866326601162', member: 'test', event: 'Colby Nolan', subscribers: 2, status: 'confirm', date: '219 days ago' },
];

// Filter the bookings to only include confirmed ones
const confirmedBookings = allBookings.filter(b => b.status === 'confirm');

const ConfirmBookingsPage = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <FiCheckCircle /> Confirm Bookings
                </h1>
                <Link
                    to="/admin/bookings"
                    className="flex items-center gap-2 bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    <FiChevronLeft /> Back
                </Link>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Confirm_Bookings</h2>
            {/* We pass the filtered list to our reusable table component */}
            <BookingsTable bookings={confirmedBookings} showSearch={false} />
        </div>
    );
};

export default ConfirmBookingsPage;