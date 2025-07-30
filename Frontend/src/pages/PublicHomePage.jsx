// src/pages/PublicHomePage.jsx
import { Link } from 'react-router-dom';
import Logo from '../components/Logo'; // We'll reuse our existing Logo component
import homePageImage from '../assets/homelogo.jpeg'; // We'll need to add this image

// A simple header for this page
const PublicHeader = () => (
    <header className="absolute top-0 left-0 w-full p-6 ">
        <div className="container mx-auto ">
            <Logo />
        </div>
    </header>
);

const PublicHomePage = () => {
    return (
        <div className="bg-white min-h-screen flex flex-col justify-center">
            <PublicHeader />
            <main className="container mx-auto px-6 py-16 flex-grow flex items-center mt-10">
                <div className="flex flex-col md:grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Side: Text Content */}
                    <div className="text-center md:text-left order-1">
                        <h1 className="text-3xl md:text-4xl font-bold text-teal-500 tracking-wider">
                            EVENTOPS HUB
                        </h1>
                        <p className="mt-4  text-gray-600 ">
                            Welcome to [EVENTOPS HUB]. It is a centralized platform or system that serves as the central hub for all event-related operations and logistics, your all-in-one solution for flawless event planning and execution. Whether you're organizing conferences, corporate meetings, weddings, or any other type of event, our Event Management System is here to simplify the process and ensure your events are a resounding success.
                        </p>
                        <Link
                            to="/login"
                            className="mt-8 inline-block bg-teal-500 text-white  text-lg py-1 px-2 rounded-lg shadow-lg hover:bg-teal-600 transition-transform transform hover:scale-105"
                        >
                            Login / Demo User
                        </Link>
                    </div>

                    {/* Right Side: Image */}
                    <div className="w-full order-2 mt-10 md:mt-0">
                        <img 
                            src={homePageImage} 
                            alt="Event management illustration" 
                            className="w-3/4 h-auto mx-auto"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PublicHomePage;