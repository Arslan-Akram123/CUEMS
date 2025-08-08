// src/pages/CheckoutPage.jsx
import { useLocation, Link, useNavigate } from 'react-router-dom';
import UserLayout from '../components/UserLayout';
import { FiLock, FiCreditCard, FiCalendar, FiChevronLeft } from 'react-icons/fi';
import { useState } from 'react';
const CheckoutPage = () => {
    // Get booking info passed from the previous page
    const location = useLocation();
    const navigate = useNavigate();
    const { booking } = location.state || {}; // booking object with event details

    // If no booking data is passed, redirect back
    if (!booking) {
        return (
            <UserLayout>
                <div className="container mx-auto text-center py-20">
                    <h1 className="text-2xl font-bold">Booking information is missing.</h1>
                    <Link to="/my-bookings" className="text-teal-600 hover:underline mt-4 inline-block">
                        &larr; Go back to My Bookings
                    </Link>
                </div>
            </UserLayout>
        );
    }
    
    // Simulate payment processing
    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        // Here you would call your backend to create a Stripe payment intent
        console.log("Processing payment for booking:", booking._id);
        alert(`Simulating successful payment for "${booking.event.name}"!`);
        // Navigate back to my-bookings page after "payment"
        navigate('/my-bookings');
    };

    return (
        <UserLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
                        <Link to="/my-bookings" className="flex items-center gap-2 bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-200">
                           <FiChevronLeft /> Back to Bookings
                        </Link>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-md">
                        {/* Order Summary */}
                        <div className="border-b pb-6 mb-6">
                            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
                            <div className="flex justify-between items-center text-gray-600">
                                <p>Event: <span className="font-medium text-gray-800">{booking.event.name}</span></p>
                                <p className="font-bold text-xl text-gray-800">${booking.event.price}</p>
                            </div>
                        </div>

                        {/* Payment Form */}
                        <form onSubmit={handlePaymentSubmit}>
                            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="card-name" className="block text-sm font-medium text-gray-700">Name on Card</label>
                                    <input type="text" id="card-name" placeholder="John M. Doe" required className="mt-1 block w-full border-teal-500
                                    focus:outline-teal-500 focus:ring-teal-500 px-2 py-2 border-1 rounded-md shadow-sm"/>
                                </div>
                                
                                {/* This div simulates Stripe's secure card element */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Card Details</label>
                                    <div className="mt-1 p-3 border border-gray-300 rounded-md flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 gap-2">
                                        <FiCreditCard className="text-gray-400"/>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            placeholder="XXXX XXXX XXXX 4242"
                                            maxLength={19}
                                            pattern="[0-9 ]{16,19}"
                                            required
                                            className="text-gray-700  border-teal-500
                                    focus:outline-teal-500 focus:ring-teal-500  px-2 py-1 rounded-md border w-full  sm:w-40 sm:flex-1"
                                        />
                                        <input
                                            type="text"
                                            name="expiry"
                                            placeholder="MM / YY"
                                            maxLength={7}
                                            pattern="(0[1-9]|1[0-2])\s?/\s?[0-9]{2,4}"
                                            required
                                            className="text-gray-700 px-2 py-1 rounded-md border  focus:ring-teal-500 focus:outline-teal-500 border-teal-500 w-full sm:w-20"
                                        />
                                        <input
                                            type="text"
                                            name="cvc"
                                            placeholder="CVC"
                                            maxLength={4}
                                            pattern="[0-9]{3,4}"
                                            required
                                            className="text-gray-700 px-2 py-1 rounded-md border  focus:ring-teal-500 focus:outline-teal-500 border-teal-500 w-full sm:w-14"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8">
                                <button type="submit" className="w-full flex items-center justify-center gap-3 bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700">
                                    <FiLock />
                                    Pay ${booking.event.price}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default CheckoutPage;