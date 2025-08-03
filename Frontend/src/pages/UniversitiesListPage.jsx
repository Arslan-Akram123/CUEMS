// src/pages/UniversitiesListPage.jsx

import UserLayout from '../components/UserLayout';
import UniversityCard from '../components/UniversityCard';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// Mock data, as if from an API
// const mockUniversities = [
//   {
//     pathId: 'iub',
//     name: 'Islamiya University Bahawalpur',
//     description: 'The university boasts a dedicated team of faculty members who are highly qualified and experienced in their respective fields.',
//     logoUrl: 'https://via.placeholder.com/150/0284C7/FFFFFF?Text=IUB'
//   },
//   {
//     pathId: 'lums',
//     name: 'Lums University',
//     description: 'LUMS is an extraordinary place for learning, discovery and transformation. Here, you have the freedom to ask questions, challenge the ordinary and spark innovation.',
//     logoUrl: 'https://via.placeholder.com/150/166534/FFFFFF?Text=LUMS'
//   },
//   {
//     pathId: 'bzu',
//     name: 'Bahauddin Zakriya University',
//     description: 'public university in Multan, Pakistan. Named after the famous Sufi saint Bahauddin Zakariya, it offers a wide range of undergraduate programs.',
//     logoUrl: 'https://via.placeholder.com/150/7C3AED/FFFFFF?Text=BZU'
//   }
// ];

const UniversitiesListPage = () => {
  const [universities, setUniversities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUniversities, setFilteredUniversities] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8001/universities/getUniversities', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        setUniversities(data);
        setFilteredUniversities(data);
      })
      .catch(error => {
        console.error('Error fetching universities:', error);
        setUniversities([]);
        setFilteredUniversities([]);
      });
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredUniversities(universities);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredUniversities(
        universities.filter(uni =>
          uni.shortName?.toLowerCase().includes(term) ||
          uni.name?.toLowerCase().includes(term)
        )
      );
    }
  }, [searchTerm, universities]);

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar */}
        <aside className="w-full md:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-md ">
            <h2 className="text-xl font-bold mb-4">Campus Discovery</h2>
            <input
              type="text"
              placeholder="Search for universities by name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full border-gray-300 rounded-md py-2 px-2 shadow-sm focus:border-teal-500 focus:ring-teal-500 focus:outline-teal-500"
            />
            <Link to="/home" className="mt-6 w-full block text-center bg-teal-600 text-white  py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors">
              ← Back to Dashboard
            </Link>
          </div>
        </aside>

        {/* Right Main Content */}
        <main className="w-full md:w-3/4 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row gap-4 sm:gap-2 sm:justify-between sm:items-center">
             <div>
                <h1 className="text-2xl font-bold text-gray-800">Explore Universities</h1>
                <p className="text-gray-500"><Link to='/home'>Dashboard</Link> / Campuses</p>
             </div>
             <Link to="/compare-data" className="bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-700">
                University-Comparative-Data
             </Link>
          </div>

          <div className="space-y-6">
            {filteredUniversities.map(uni => (
              <UniversityCard key={uni._id} university={uni} />
            ))}
          </div>
        </main>
      </div>
    </UserLayout>
  );
};

export default UniversitiesListPage;