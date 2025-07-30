// src/pages/LoginPage.jsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import { FiCloudLightning, FiEye, FiEyeOff } from 'react-icons/fi';
import { jwtDecode } from 'jwt-decode';


const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formMessage, setFormMessage] = useState(null); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setFieldErrors((prev) => ({
      ...prev,
      [e.target.name]: '',
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage(null);
    setFieldErrors({});

    try {
      const res = await fetch('http://localhost:8001/auth/login', {
        method: 'POST',
        
        headers: {
          'Content-Type': 'application/json',
        },
         credentials: 'include',
        body: JSON.stringify(formData),
      });

  if (!res.ok) {
     const errorMsg = data.error?.toLowerCase() || '';

  if (errorMsg.includes('email')) {
    setFieldErrors({ email: data.error });
  } else if (errorMsg.includes('password')) {
    setFieldErrors({ password: data.error });
  } else if (errorMsg.includes('activate')) {
    
    setFormMessage({ type: 'error', text: data.error });
  } else {
    setFormMessage({ type: 'error', text: data.error || 'Login failed' });
  }
  return;
}
     const data = await res.json();
    localStorage.setItem('token', data.token);
    setFormMessage({ type: 'success', text: data.message });

try {
  const localtoken = localStorage.getItem('token');
  console.log('Local token:', localtoken);
  if (!localtoken) {
    navigate('/login');
  }
  const decoded = jwtDecode(localtoken);
  console.log('Decoded token:', decoded);

  const redirectPath =
    decoded.role === 'Admin' ? '/admin/dashboard' : '/home';

  setTimeout(() => navigate(redirectPath), 1500);

} catch (decodeError) {
  console.error('Token decode error:', decodeError);
  setFormMessage({ type: 'error', text: 'Login succeeded but failed to redirect based on role.' });
}

     

    } catch (err) {
      console.error('Client error:', err);
      setFormMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <AuthLayout title="Login">
      {formMessage && (
        <p className={`text-center  text-sm px-2 py-2 mb-2 ${formMessage.type === 'error' ? 'text-red-500 bg-red-100 border border-red-300' : 'text-green-600 bg-green-100 border border-green-300'}`}>
          {formMessage.text}
        </p>
      )}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4 border-0">
         <div className="flex flex-col gap-1">
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


    <div className="flex items-center border border-gray-300 rounded-md px-2 py-2 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500">
  <label htmlFor="password" className="sr-only">Password</label>
  
  <input
    id="password"
    name="password"
    type={showPassword ? 'text' : 'password'}
    value={formData.password}
    onChange={handleChange}
    required
    className="flex-1 border-none outline-none bg-transparent text-gray-900 placeholder-gray-500 sm:text-sm"
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

        <div className="flex items-center justify-end">
          <Link to="/forgot-password" className="text-sm font-medium text-teal-600 hover:text-teal-500">
            Forgot Your Password?
          </Link>
        </div>

        <div className="space-y-3">
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-teal-500 py-2 px-4 text-sm font-medium text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Login
          </button>
          {/* <Link to="/home">
            <button
              type="button"
              className="group relative flex w-full justify-center rounded-md border border-teal-500 py-2 px-4 text-sm font-medium text-teal-600 hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Explore The App
            </button>
          </Link> */}
        </div>

        <p className="mt-2 text-center text-sm text-gray-600">
          Not a member?{' '}
          <Link to="/register" className="font-medium text-teal-600 hover:text-teal-500">
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
