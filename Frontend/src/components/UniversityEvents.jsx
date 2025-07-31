// src/components/UniversityEvents.jsx
import { useParams } from 'react-router-dom';

// In a real app, you'd fetch this data based on the universityId
const allUniversityEvents = {
  MUL: [
    { id: 101, title: 'International Workshop on "Droughts over Pakistan"', date: '2025-02-26', imageUrl: 'https://via.placeholder.com/400x200.png/16A34A/FFFFFF?Text=IUB+Event' },
    { id: 102, title: 'International Webinar on "CLIMATE CHANGE AND HEALTH"', date: '2025-07-04', imageUrl: 'https://via.placeholder.com/400x200.png/16A34A/FFFFFF?Text=IUB+Event' },
    { id: 103, title: '3rd National Webinar under the Umbrella of "RAPID Technology..."', date: '2025-01-17', imageUrl: 'https://via.placeholder.com/400x200.png/16A34A/FFFFFF?Text=IUB+Event' },
  ],
  UMT: [
    { id: 201, title: 'UMT Live Session 61: Pakistani Music', date: '2021-04-08', imageUrl: 'https://via.placeholder.com/400x200.png/059669/FFFFFF?Text=LUMS+Event' },
    { id: 202, title: 'CSS Mentorship Session: Paper Solving Techniques', date: '2025-03-28', imageUrl: 'https://via.placeholder.com/400x200.png/059669/FFFFFF?Text=LUMS+Event' },
  ],
  UCP :[
    { id: 301, title: 'UCP Live Session 62: Pakistani Music', date: '2021-04-08', imageUrl: 'https://via.placeholder.com/400x200.png/DB2777/FFFFFF?Text=UCP+Event' },
    { id: 302, title: 'CSS Mentorship Session: Paper Solving Techniques', date: '2025-03-28', imageUrl: 'https://via.placeholder.com/400x200.png/DB2777/FFFFFF?Text=UCP+Event' }
  ]
  // Add more university events as needed
};

const UniversityEvents = () => {
    const { universityId } = useParams();
    const events = allUniversityEvents[universityId] || [];

    return (
        <div>
            <div className="flex justify-end mb-4">
                <input type="text" placeholder="Search for Events..." className="w-full md:w-1/2 px-2 py-2 focus:outline-teal-500 border border-teal-500 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"/>
            </div>
            {events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {events.map(event => (
                        <div key={event.id} className="bg-white border border-gray-200 rounded-lg p-4">
                            <img src={event.imageUrl} alt={event.title} className="w-full h-32 object-cover rounded-md mb-4"/>
                            <h4 className="text-lg font-bold truncate">{event.title}</h4>
                            <p className="text-sm text-gray-500">{event.date}</p>
                            <button className="mt-4 w-full bg-teal-500 text-white font-semibold py-2 rounded-lg hover:bg-teal-600">Read More</button>
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