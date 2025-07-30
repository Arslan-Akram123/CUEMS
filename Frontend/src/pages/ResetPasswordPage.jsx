import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthLayout from '../components/AuthLayout';

const ResetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [formMessage, setFormMessage] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormMessage(null);
        setFieldErrors({});

        try {
            const res = await fetch('http://localhost:8001/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok || data.error) {
                setFieldErrors({ email: data.error });
                setFormMessage({ type: 'error', text: data.error || 'Password reset failed' });

                // Automatically clear error message after 1.5 seconds
                setTimeout(() => setFormMessage(null), 2500);
                return;
            }

            setFormMessage({ type: 'success', text: data.message });

            
            setTimeout(() => {
                setFormMessage(null);
                navigate('/login');
            }, 2500);

        } catch (error) {
            setFormMessage({ type: 'error', text: 'An error occurred' });
            setTimeout(() => setFormMessage(null), 2500);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);

        
        if (fieldErrors.email) {
            setFieldErrors((prev) => ({ ...prev, email: null }));
        }

        
        if (formMessage) {
            setFormMessage(null);
        }
    };

    return (
        <AuthLayout title="Reset Your Password">
            {formMessage && (
                <div
                    className={`text-center px-2 py-2 text-sm ${
                        formMessage.type === 'error'
                            ? 'text-red-500 bg-red-100 border border-red-300'
                            : 'text-green-600 bg-green-100 border border-green-300'
                    }`}
                >
                    {formMessage.text}
                </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email-address" className="sr-only">Email address</label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm"
                            placeholder="example@gmail.com"
                        />
                        {fieldErrors.email && (
                            <p className="text-sm text-red-600">{fieldErrors.email}</p>
                        )}
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-teal-500 py-2 px-4 text-sm font-medium text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    >
                        Reset Password
                    </button>
                </div>

                <p className="mt-2 text-center text-sm text-gray-600">
                    <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500">
                        Cancel
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default ResetPasswordPage;
