// src/components/ReviewCard.jsx
import { FiStar } from 'react-icons/fi';

const ReviewCard = ({ review }) => {
  // Helper to render star ratings
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        className={`inline-block h-5 w-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="flex items-start gap-4 py-4">
      {/* User Avatar */}
      <div className="flex-shrink-0">
        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
          {review.user.charAt(0).toUpperCase()}
        </div>
      </div>
      
      {/* Review Content */}
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <p className="font-bold text-gray-800">{review.user}</p>
          <p className="text-sm text-gray-500">{review.time}</p>
        </div>
        <div className="my-1">{renderStars(review.rating)}</div>
        <p className="text-gray-600">{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;