// src/components/AuthLayout.jsx
import Logo from './Logo';

const AuthLayout = ({ children, title }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-200 bg-white p-8 shadow-md">
        
       
        <div className="flex flex-col items-center">
          
         
          <Logo />

          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h2>
        </div>

        {children}

      </div>
    </div>
  );
};

export default AuthLayout;