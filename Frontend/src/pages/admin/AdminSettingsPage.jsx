// src/pages/admin/AdminSettingsPage.jsx
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiSettings } from 'react-icons/fi';
import Logo from '../../components/Logo'; // Reuse our Logo component

// Helper for form inputs
const SettingInput = ({ label, id, value }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
        <input type="text" name={id} id={id} defaultValue={value} className="mt-1 w-full border-teal-500 px-2 py-2 border-1 focus:outline-teal-500 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"/>
    </div>
);

const AdminSettingsPage = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl sm:text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <FiSettings /> Software Settings
                </h1>
                <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-2 bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300"
                >
                    <FiChevronLeft /> Back
                </Link>
            </div>

            <form className="space-y-8">
                {/* Site Basic Details */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-6">Site Basic Details</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <SettingInput label="App Name" id="appName" value="EVENTOPS HUB" />
                        <SettingInput label="Site Title" id="siteTitle" value="CUEMS" />
                        <SettingInput label="Site Email" id="siteEmail" value="marslan.devtech@gmail.com" />
                        <SettingInput label="Site Phone" id="sitePhone" value="03065058102" />
                        <div className="md:col-span-2">
                           <SettingInput label="Site Address" id="siteAddress" value="Ali Town Thokar Niaz Baig" />
                        </div>
                    </div>
                </div>

                {/* Social Details */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-6">Social Details</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <SettingInput label="Twitter" id="twitter" value="https://twitter.com/" />
                        <SettingInput label="Youtube" id="youtube" value="https://youtube.com/" />
                        <SettingInput label="Facebook" id="facebook" value="https://facebook.com/" />
                    </div>
                </div>

                {/* Images & Logos */}
                 {/* <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-6">Images & Logos</h2>
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Site Main Image</label>
                           <div className="w-full h-40 bg-gray-100 rounded-md flex items-center justify-center">
                               
                               <img src="https://via.placeholder.com/300x150/818CF8/FFFFFF?Text=Main+Image" alt="Main Site" className="max-h-full max-w-full rounded-md"/>
                           </div>
                           <button type="button" className="mt-2 text-sm font-medium text-teal-600">Upload Image</button>
                        </div>
                         <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Site Logo</label>
                           <div className="w-full p-4 bg-gray-100 rounded-md flex items-center justify-center">
                               <Logo />
                           </div>
                           <SettingInput label="Site Logo Text" id="logoText" value="E" />
                        </div>
                    </div>
                </div> */}

                {/* Site Status & Description */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-6">Site Status & Description</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                         <SettingInput label="Site Status" id="siteStatus" value="Active" />
                         <SettingInput label="Site Close Message" id="siteCloseMsg" value="" />
                         <div className="md:col-span-2">
                             <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700">Site Description</label>
                             <textarea id="siteDescription" rows={3} className="mt-1 w-full border-teal-500 focus:outline-teal-500 rounded-md px-2 py-2 border-1" defaultValue="Welcome to [EVENTOPS HUB], it is a centralized platform or system..."></textarea>
                         </div>
                         <div className="md:col-span-2">
                            <SettingInput label="Footer Text" id="footerText" value="Copyright © 2025 CUEMS.net, Inc. All Rights Reserved." />
                         </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="bg-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-700">
                        Update Setting
                    </button>
                </div>
            </form>
        </div>
    );
};


export default AdminSettingsPage;