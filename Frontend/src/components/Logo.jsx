// src/components/Logo.jsx

// We don't need to import React anymore in modern setups.
// The component is a function that returns JSX.

const Logo = () => {
  return (
    // Main container using flexbox to align items
    <div className="flex items-center gap-3">
      
      {/* The teal square icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-500">
        <span className="text-3xl font-bold text-white">E</span>
      </div>

      {/* The text part of the logo */}
      <div className="flex flex-col justify-center">
        <span className="text-xl font-bold tracking-wider text-gray-800">
          EVENTOPS
        </span>
        <span className="text-lg text-center font-medium text-teal-500">
          HUB
        </span>
      </div>
      
    </div>
  );
};

export default Logo;