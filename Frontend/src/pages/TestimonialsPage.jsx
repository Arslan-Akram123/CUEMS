// src/pages/TestimonialsPage.jsx
import UserLayout from '../components/UserLayout';
import { Link } from 'react-router-dom';
import TestimonialCard from '../components/TestimonialCard';

const mockTestimonials = [
    { id: 1, user: 'test', rating: 5, comment: 'Super Excellent Event', eventName: 'Become a Web Developer', eventId: 5 },
    { id: 2, user: 'test', rating: 4, comment: 'ardfdg btrth b', eventName: 'Baxter Spears', eventId: 1 },
    { id: 3, user: 'test', rating: 4, comment: 'i am very excited to join this event', eventName: 'ali birthday event', eventId: 6 },
];

const TestimonialsPage = () => {
    return (
        <UserLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Testimonials</h1>
                    <p className="text-gray-500"><Link to="/home">Dashboard</Link> / Testimonials</p>
                </div>

                <div className="space-y-8">
                    {mockTestimonials.map(testimonial => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    ))}
                </div>
            </div>
        </UserLayout>
    );
};

export default TestimonialsPage;