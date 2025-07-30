// src/components/Footer.jsx
import Logo from './Logo';
import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';

const Footer = () => {
    // Helper component for footer links
    const FooterLink = ({ to, children }) => (
        <Link to={to} className="text-gray-400 hover:text-teal-500 transition-colors text-sm md:text-base">
            {children}
        </Link>
    );

    return (
        <footer className="bg-gray-800 text-white pt-12 pb-8 px-2 sm:px-4">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content - Flex Container */}
                <div className="flex justify-center flex-wrap gap-4 md:gap-8">
                    {/* Column 1: My Account */}
                    <div className=" min-w-[150px]">
                        <h3 className="font-bold text-lg mb-4 text-gray-200">My Account</h3>
                        <ul className="space-y-3">
                            <li><FooterLink to="/signup">Sign Up</FooterLink></li>
                            <li><FooterLink to="/features">Features</FooterLink></li>
                        </ul>
                    </div>

                    {/* Column 2: FAQs */}
                    <div className=" min-w-[150px]">
                        <h3 className="font-bold text-lg mb-4 text-gray-200">FAQs</h3>
                        <ul className="space-y-3">
                            <li><FooterLink to="/faq/general">General</FooterLink></li>
                            <li><FooterLink to="/support">Support</FooterLink></li>
                        </ul>
                    </div>

                    {/* Column 3: Company */}
                    <div className=" min-w-[150px] ">
                        <h3 className="font-bold text-lg mb-4 text-gray-200">Company</h3>
                        <ul className="space-y-3">
                            <li><FooterLink to="/about">About</FooterLink></li>
                            <li><FooterLink to="/terms">Terms</FooterLink></li>
                        </ul>
                    </div>

                    {/* Column 4: More */}
                    <div className=" min-w-[150px]">
                        <h3 className="font-bold text-lg mb-4 text-gray-200">More</h3>
                        <ul className="space-y-3">
                            <li><FooterLink to="/contact">Contact Us</FooterLink></li>
                            <li><FooterLink to="/privacy">Privacy Policy</FooterLink></li>
                        </ul>
                    </div>

                    {/* Column 5: Logo */}
                    <div className="max-w-[200px] md:min-w-[150px]   flex items-center justify-center bg-white p-4 rounded-lg shadow-md">
                        <Logo className="h-12 w-16" />
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between">
                    <p className="text-gray-400 text-sm text-center sm:text-left order-2 sm:order-1 mt-4 sm:mt-0">
                        Copyright © 2025 CUEMS.net, Inc. All Rights Reserved.
                    </p>
                    <div className="flex gap-6 order-1 sm:order-2">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-pink-500 transition-colors text-xl">
                            <FiInstagram />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-blue-600 transition-colors text-xl">
                            <FiFacebook />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-400 hover:text-sky-400 transition-colors text-xl">
                            <FiTwitter />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;