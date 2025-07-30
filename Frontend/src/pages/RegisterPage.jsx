import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import AuthLayout from '../components/AuthLayout';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [formMessage, setFormMessage] = useState(null); 
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const togglePasswordVisibility = () => {
  setShowPassword(prev => !prev);
};

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setFieldErrors(prev => ({
      ...prev,
      [e.target.name]: '', 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setFormMessage(null);

    try {
      const res = await fetch('http://localhost:8001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        // Set specific errors
        const errorText = data.error || 'Registration failed';
        const lowerError = errorText.toLowerCase();

        if (lowerError.includes('email')) {
          setFieldErrors({ email: errorText });
        } else if (lowerError.includes('password')) {
          setFieldErrors({ password: errorText });
        } else {
          setFormMessage({ type: 'error', text: errorText });
        }

        return;
      }

     
      setFormMessage({ type: 'success', text: data.message });
      setTimeout(() => navigate('/login'), 2500);

    } catch (err) {
      console.error('Client-side error:', err);
      setFormMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <AuthLayout title="Register">
      {formMessage && (
        <p className={`text-center px-2 py-2  text-sm mb-2 ${formMessage.type === 'error' ? 'text-red-500 bg-red-100 border border-red-300' : 'text-green-600 bg-green-100 border border-green-300'}`}>
          {formMessage.text}
        </p>
      )}

      <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4 border-0">
         <div className="flex flex-col gap-1">
  <label htmlFor="Full-name" className="sr-only">Full Name</label>
  <input
    id="Full-name"
    name="fullName"
    type="text"
    value={formData.fullName}
    onChange={handleChange}
    required
    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm"
    placeholder="Full Name"
  />
</div>

<div className="flex flex-col gap-1 mt-4">
  <label htmlFor="email-address" className="sr-only">Email address</label>
  <input
    id="email-address"
    name="email"
    type="email"
    value={formData.email}
    onChange={handleChange}
    required
    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm"
    placeholder="example@gmail.com"
  />
  {fieldErrors.email && (
    <p className="text-sm text-red-600">{fieldErrors.email}</p>
  )}
</div>


<div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500">
  <input
    id="password"
    name="password"
    type={showPassword ? 'text' : 'password'}
    value={formData.password}
    onChange={handleChange}
    required
    className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 sm:text-sm"
    placeholder="********"
  />
  
  <button
    type="button"
    onClick={togglePasswordVisibility}
    className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
    tabIndex={-1}
  >
    {showPassword ? <FiEyeOff /> : <FiEye />}
  </button>
</div>

{fieldErrors.password && (
  <p className="mt-1 text-sm text-red-600">{fieldErrors.password}</p>
)}



</div>

        <div className="space-y-3">
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-teal-500 py-2 px-4 text-sm font-medium text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>

        <p className="mt-2 text-center text-sm text-gray-600">
          Already a member?{' '}
          <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
