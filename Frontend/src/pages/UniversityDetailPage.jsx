// src/pages/UniversityDetailPage.jsx

import { useParams, Link, useLocation, Outlet } from 'react-router-dom';
import UserLayout from '../components/UserLayout';

// In a real app, this would be a single API call: /api/universities/:pathId
const mockUniversities = [
  { pathId: 'MUL', name: 'MUL University' },
  { pathId: 'UMT', name: 'UMT University' },
  { pathId: 'UCP', name: 'UCP University' }
];

const UniversityDetailPage = () => {
  const { universityId } = useParams();
  const location = useLocation(); // To check the current path

  // Find the university data
  const university = mockUniversities.find(uni => uni.pathId === universityId);

  if (!university) {
    return (
      <UserLayout>
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold">University not found!</h1>
          <Link to="/universities" className="text-teal-600 hover:underline mt-4 inline-block">
            ← Back to all universities
          </Link>
        </div>
      </UserLayout>
    );
  }

  // Helper to style the active link
  const getLinkClass = (path) => {
    const fullPath = `/universities/${universityId}/${path}`;
    return location.pathname === fullPath || (path === 'events' && location.pathname === `/universities/${universityId}`)
      ? 'bg-teal-500 text-white'
      : 'bg-white text-teal-600 border border-teal-500 hover:bg-teal-50';
  };

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Left Menu Sidebar */}
        <aside className="w-full md:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
            <h2 className="text-xl font-bold mb-4">Menu</h2>
            <ul className="space-y-2">
              <li>1. <Link to={`/universities/${universityId}/events`} className="hover:text-teal-600">Events-List</Link></li>
              <li>2. <Link to={`/universities/${universityId}/programs`} className="hover:text-teal-600">Programs</Link></li>
              <li>3. <Link to={`/universities/${universityId}/fees`} className="hover:text-teal-600">FeeStructure</Link></li>
            </ul>
            <Link to="/home" className="mt-6 w-full block text-center bg-teal-600 text-white  py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors">
              ← Back to Dashboard
            </Link>
          </div>
        </aside>

        {/* Right Main Content */}
        <main className="w-full md:w-3/4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800">{university.name}</h1>
              <p className="text-gray-500"><Link to='/home'>Dashboard</Link> / <Link to="/universities">Campuses</Link> / {university.pathId}</p>
            </div>
            <div className="flex flex-col gap-4 sm:gap-2 sm:flex-row sm:items-center sm:space-x-4">
              <Link to={`/universities/${universityId}/events`} className={`font-semibold py-2 px-6 rounded-lg transition-colors ${getLinkClass('events')}`}>
                Events-List
              </Link>
              <Link to={`/universities/${universityId}/programs`} className={`font-semibold py-2 px-6 rounded-lg transition-colors ${getLinkClass('programs')}`}>
                Programs
              </Link>
              <Link to={`/universities/${universityId}/fees`} className={`font-semibold py-2 px-6 rounded-lg transition-colors ${getLinkClass('fees')}`}>
                FeeStructure
              </Link>
            </div>

            <div className="mt-8">
              {/* React Router will render the matching child route component here */}
              <Outlet />
            </div>

          </div>
        </main>
      </div>
    </UserLayout>
  );
};

export default UniversityDetailPage;