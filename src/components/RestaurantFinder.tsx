import React, { useState } from 'react';
import { Restaurant } from '../types';

interface RestaurantFinderProps {
  destination: string;
  restaurants: Restaurant[];
}

const RestaurantFinder: React.FC<RestaurantFinderProps> = ({ destination, restaurants }) => {
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'googleRating'>('rating');

  const sortedRestaurants = [...restaurants].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.customerReviews - a.customerReviews;
      case 'googleRating':
        return b.googleRating - a.googleRating;
      default:
        return 0;
    }
  });

  const getPriceRangeColor = (priceRange: string) => {
    switch (priceRange) {
      case '$': return 'text-green-600 bg-green-100';
      case '$$': return 'text-yellow-600 bg-yellow-100';
      case '$$$': return 'text-orange-600 bg-orange-100';
      case '$$$$': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('✨');
    }
    return stars.join('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🍽️ Best Restaurants in {destination}
          </h1>
          <p className="text-gray-600 text-lg">
            Top-rated dining experiences based on customer reviews and ratings
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="bg-white rounded-lg shadow-md p-4 inline-flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setSortBy('rating')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'rating'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Overall Rating
              </button>
              <button
                onClick={() => setSortBy('reviews')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'reviews'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Customer Reviews
              </button>
              <button
                onClick={() => setSortBy('googleRating')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'googleRating'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Google Rating
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow animate-slide-up">
              {restaurant.imageUrl && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{restaurant.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriceRangeColor(restaurant.priceRange)}`}>
                    {restaurant.priceRange}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3">{restaurant.cuisine}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Overall Rating</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium">{getRatingStars(restaurant.rating)}</span>
                      <span className="text-sm text-gray-600">({restaurant.rating})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Customer Reviews</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium">{restaurant.customerReviews.toLocaleString()}</span>
                      <span className="text-xs text-gray-500">reviews</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Google Rating</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-medium">{getRatingStars(restaurant.googleRating)}</span>
                      <span className="text-sm text-gray-600">({restaurant.googleRating})</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-700 mb-2">
                    📍 {restaurant.location}
                  </p>
                  {restaurant.distance && (
                    <p className="text-sm text-blue-600">
                      🚶 {restaurant.distance} from city center
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  🗺️ Get Directions
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 About Our Ratings</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Overall Rating</h4>
              <p className="text-gray-600">Combined score from multiple review platforms including food quality, service, and ambiance.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Customer Reviews</h4>
              <p className="text-gray-600">Total number of verified customer reviews from the past year, indicating popularity and consistency.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Google Rating</h4>
              <p className="text-gray-600">Real-time Google Maps rating reflecting recent customer experiences and feedback.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantFinder;
