import React, { useState } from 'react';
import { TravelPlan, ExplorationType } from '../types';

interface LandingFormProps {
  onSubmit: (plan: TravelPlan) => void;
}

const LandingForm: React.FC<LandingFormProps> = ({ onSubmit }) => {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState<number>(3);
  const [explorationType, setExplorationType] = useState<ExplorationType>('itinerary');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination && days > 0) {
      onSubmit({
        destination,
        days,
        explorationType
      });
    }
  };

  const explorationOptions: Array<{ value: ExplorationType; label: string; description: string }> = [
    {
      value: 'itinerary',
      label: 'Itinerary',
      description: 'Complete day-by-day travel plan with seasonal recommendations'
    },
    {
      value: 'restaurant',
      label: 'Restaurant',
      description: 'Find best restaurants based on reviews and ratings'
    },
    {
      value: 'specific-places',
      label: 'Specific Places',
      description: 'Explore special activities and events at specific locations'
    }
  ];

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            ✈️ Travel Planner
          </h1>
          <p className="text-gray-600 text-lg">
            Your intelligent travel companion for perfect trips
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
              🌍 Where you want to explore?
            </label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-200"
              placeholder="Enter your dream destination..."
              required
            />
          </div>

          <div>
            <label htmlFor="days" className="block text-sm font-medium text-gray-700 mb-2">
              📅 How many days are you planning?
            </label>
            <input
              type="number"
              id="days"
              value={days}
              onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              max="30"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              🎯 What would you like to explore?
            </label>
            <div className="space-y-3">
              {explorationOptions.map((option) => (
                <div
                  key={option.value}
                  className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    explorationType === option.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setExplorationType(option.value)}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      name="explorationType"
                      value={option.value}
                      checked={explorationType === option.value}
                      onChange={() => setExplorationType(option.value)}
                      className="mt-1 mr-3 text-primary-600 focus:ring-primary-500"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{option.label}</h3>
                      <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
          >
            Start Planning Your Trip ✨
          </button>
        </form>
      </div>
    </div>
  );
};

export default LandingForm;
