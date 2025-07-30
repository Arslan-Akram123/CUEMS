// src/pages/UniversityComparativeDataPage.jsx
import { useState } from 'react';
import UserLayout from '../components/UserLayout';
import {Link} from 'react-router-dom'
// Mock data for all universities combined
const allEvents = [
    { id: '66258a3e5a9282d6a6dd6ba5', campus: 'Iub', title: '3rd National Webinar under the Umbrella of "RAPID Technology Transfer Grant (RTTG)"', date: '2023-01-17', description: 'Another Webinar under the Umbrella of "RAPID Technology Transfer Grant (RTTG)"' },
    { id: '66258a3f5a9282d6a6dd6ba8', campus: 'Iub', title: '2nd National Webinar under the Umbrella of "RAPID Technology Transfer Grant (RTTG)"', date: '2023-01-12', description: 'Another National Webinar was held today under the Umbrella of "RAPID Technology Transfer Grant (RTTG)"' },
    { id: '66258938f320bfb55004294c', campus: 'Minhaj', title: 'Best sports Event Award 2020', date: 'December 3, 2020', description: 'Minhaj University Lahore wins BEST FINTECH EVENT Award, awarded by Fintech Community, Turkey. Deputy Chairman BOG, Dr. Hussain Mohi ud Din Qadri addressed the ceremony held virtually and received the award.' },
    { id: '66258938f320bfb55004294c', campus: 'Minhaj', title: 'Best sports Event Award 2020', date: 'December 3, 2020', description: 'Minhaj University Lahore wins BEST FINTECH EVENT Award, awarded by Fintech Community, Turkey. Deputy Chairman BOG, Dr. Hussain Mohi ud Din Qadri addressed the ceremony held virtually and received the award.' },
    { id: '66258f586e3c63dcdbfabd36c', campus: 'Lums', title: 'LUMS Live Session 61: Pakistani Music: Yesterday, Today and Tomorrow sports', date: 'April 08, 2021', description: '6:00 pm' },
    { id: '66258f666e3c63dcdbfabd442', campus: 'Lums', title: 'LUMS Live Session 22: A Dive into the World of Pakistani Music sports', date: 'November 03, 2020', description: '4:00 pm' },
];

const UniversityComparativeDataPage = () => {
    const [category, setCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setHasSearched(true);
        if (category === 'events' && searchTerm) {
            const filteredEvents = allEvents.filter(event =>
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setResults(filteredEvents);
        } else {
            setResults([]);
        }
    };

    const getPlaceholderText = () => {
        switch(category) {
            case 'events': return 'Search Event...';
            case 'programs': return 'Search Program...';
            case 'fee-structure': return 'Search Fee...';
            default: return 'Search...';
        }
    };

    return (
        <UserLayout>
            <div className="container mx-auto px-4 py-8">
                {/* --- Search Filter Section - REVISED FOR RESPONSIVENESS --- */}
                <div className="bg-teal-50 p-6 rounded-lg shadow-md mb-8">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        {/* Title Section */}
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">University Comparative Data</h1>
                            <p className="text-gray-500"><Link to="/home">Dashboard</Link> / Comparative-Data</p>
                        </div>
                        {/* Filter Form Section */}
                        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row sm:items-center gap-2 w-aut   md:w-auto">
                            <label htmlFor="category" className="sr-only sm:not-sr-only sm:font-semibold sm:text-gray-700">Category</label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                            >
                                <option value="">Select</option>
                                <option value="events">Events</option>
                                <option value="programs">Programs</option>
                                <option value="fee-structure">Fee Structure</option>
                            </select>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={getPlaceholderText()}
                                className="flex-grow border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                            />
                            <button type="submit" className="bg-teal-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-teal-600">
                                Search
                            </button>
                        </form>
                    </div>
                </div>

                {/* Responsive Results Table */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-x-auto">
                    <table className="min-w-[900px] w-full text-sm">
                        <thead className="bg-gray-100 border-b-2 border-gray-200 sticky top-0 z-10">
                            <tr>
                                <th className="py-3 px-2 md:px-4 text-left font-semibold text-gray-600 whitespace-nowrap">id</th>
                                <th className="py-3 px-2 md:px-4 text-left font-semibold text-gray-600 whitespace-nowrap">campus</th>
                                <th className="py-3 px-2 md:px-4 text-left font-semibold text-gray-600 whitespace-nowrap">title</th>
                                <th className="py-3 px-2 md:px-4 text-left font-semibold text-gray-600 whitespace-nowrap">date</th>
                                <th className="py-3 px-2 md:px-4 text-left font-semibold text-gray-600 whitespace-nowrap">description</th>
                                <th className="py-3 px-2 md:px-4 text-left font-semibold text-gray-600 whitespace-nowrap">links</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {results.length > 0 ? (
                                results.map(item => (
                                    <tr key={item.id}>
                                        <td className="py-2 px-2 md:px-4 font-mono text-xs border-r break-all max-w-[80px] md:max-w-xs">{item.id}</td>
                                        <td className="py-2 px-2 md:px-4 font-semibold border-r break-words max-w-[80px] md:max-w-xs">{item.campus}</td>
                                        <td className="py-2 px-2 md:px-4 border-r break-words max-w-[120px] md:max-w-sm">{item.title}</td>
                                        <td className="py-2 px-2 md:px-4 whitespace-nowrap border-r">{item.date}</td>
                                        <td className="py-2 px-2 md:px-4 border-r break-words max-w-[160px] md:max-w-md">{item.description}</td>
                                        <td className="py-2 px-2 md:px-4">
                                            <a href="#" className="text-blue-600 hover:underline">View Info</a>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-10 text-gray-500 text-base">
                                        {hasSearched ? "No results found for your query." : "null"}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </UserLayout>
    );
};

export default UniversityComparativeDataPage;