// src/pages/CheckoutPage.jsx
import { useLocation, Link, useNavigate } from 'react-router-dom';
import UserLayout from '../components/UserLayout';
import { FiLock, FiCreditCard, FiCalendar, FiChevronLeft } from 'react-icons/fi';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';

// Initialize Stripe with your test publishable key
const stripePromise = loadStripe('pk_test_51RwvGYRo8LdWoFWrUiYbAYKBh0HehUgcGry8oA2oCIJakF2SZG5DzznHWYdPpLNZnBAV05tzcTuUxQOAjVHR4a9K00xsyQfRG1');

const CheckoutForm = ({ booking, onSuccessfulPayment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [nameOnCard, setNameOnCard] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return; // Stripe.js hasn't loaded yet
    }

    setProcessing(true);
    setError(null);

    try {
      // 1. Create payment intent on backend
      const response = await fetch('http://localhost:8001/stripe/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(booking.event.price * 100), // Convert to cents
          currency: 'usd',
          metadata: {
            bookingId: booking._id,
            eventName: booking.event.name
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      // 2. Confirm the payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: nameOnCard,
          },
        }
      });

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        // Payment succeeded!
        onSuccessfulPayment();
      }
    } catch (err) {
      setError(err.message);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 text-red-500">{error}</div>
        )}
      <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="card-name" className="block text-sm font-medium text-gray-700">
            Name on Card
          </label>
          <input 
            type="text" 
            id="card-name" 
            placeholder="John M. Doe" 
            required 
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
            className="mt-1 block w-full border-teal-500 focus:outline-teal-500 focus:ring-teal-500 px-2 py-2 border-1 rounded-md shadow-sm"
          />
        </div>
        
        {/* Stripe Card Element */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Card Details</label>
          <div className="mt-1 p-3 border border-gray-300 rounded-md bg-gray-50">
            <CardElement 
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
                hidePostalCode: false // Set to true if you don't want to collect postal code
              }}
            />
          </div>
        </div>
      </div>
      
    

      <div className="mt-8">
        <button 
          type="submit" 
          disabled={!stripe || processing}
          className={`w-full flex items-center justify-center gap-3 bg-teal-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 ${(!stripe || processing) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <FiLock />
          {processing ? 'Processing...' : `Pay $${booking.event.price}`}
        </button>
      </div>
    </form>
  );
};


const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};

  // Success and error message state
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

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

  async function handleSuccessfulPayment() {
    fetch('http://localhost:8001/eventsbook/complete-booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        bookingId: booking._id,
        eventId: booking.event._id,
      })
    })
    .then(response => response.json())
    .then(data => {
      setSuccessMsg(`Payment successful for "${booking.event.name}"!`);
      setTimeout(() => setSuccessMsg(''), 2500);
      setTimeout(() => navigate('/my-bookings'), 2500);
    })
    .catch(error => {
      setErrorMsg('Payment failed. Please try again.');
      setTimeout(() => setErrorMsg(''), 2500);
      console.error(error);
    });
  }

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

          {/* Success and Error Messages */}
          {successMsg && (
            <div className="mb-4 p-3 rounded bg-green-100 text-green-800 font-semibold text-center">
              {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className="mb-4 p-3 rounded bg-red-100 text-red-800 font-semibold text-center">
              {errorMsg}
            </div>
          )}

          <div className="bg-white p-8 rounded-lg shadow-md">
            {/* Order Summary */}
            <div className="border-b pb-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
              <div className="flex justify-between items-center text-gray-600">
                <p>Event: <span className="font-medium text-gray-800">{booking.event.name}</span></p>
                <p className="font-bold text-xl text-gray-800">${booking.event.price}</p>
              </div>
            </div>

            {/* Stripe Elements Provider */}
            <Elements stripe={stripePromise}>
              <CheckoutForm 
                booking={booking} 
                onSuccessfulPayment={handleSuccessfulPayment}
              />
            </Elements>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default CheckoutPage;