// src/components/UniversityEvents.jsx
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


const UniversityEvents = () => {
    const { universityId } = useParams();
    console.log(universityId);
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        fetch(`http://localhost:8001/scraping/getsepcificEvents/${universityId}`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
               
                setEvents(data || []);
                
            })
            .catch(err => {
                console.error('Failed to fetch events:', err);
                setEvents([]);
            });
    }, []);

    

    return (
        <div>
            <div className="flex justify-end mb-4">
                <input
                    type="text"
                    placeholder="Search for Events..."
                    className="w-full md:w-1/2 px-2 py-2 focus:outline-teal-500 border border-teal-500 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            {(events.length > 0) ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {events
                        .filter(event =>
                            event.title && event.title.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map(event => (
                            <div key={event._id} className="bg-white border border-gray-200 rounded-lg p-4">
                                <img src={event.image} alt={event.title} className="w-full h-32 object-cover rounded-md mb-4"/>
                                <h4 className="text-lg font-bold truncate">{event.title}</h4>
                                <p className="text-sm text-gray-500">{event.date}</p>
                                <p className="text-sm text-gray-500">{event.description}</p>
                                <Link to={event.link} target="_blank" rel="noopener noreferrer">
                                    <button
                                        className="mt-3 px-4 py-2 bg-teal-500 text-white rounded-md shadow hover:bg-teal-600 transition-colors font-semibold text-sm"
                                        type="button"
                                    >
                                        Read more
                                    </button>
                                </Link>
                            </div>
                        ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 py-8">No events found for this university.</p>
            )}
        </div>
    );
};

export default UniversityEvents;