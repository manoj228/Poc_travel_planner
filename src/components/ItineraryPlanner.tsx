import React from 'react';
import { ItineraryDay } from '../types';

interface ItineraryPlannerProps {
  destination: string;
  days: number;
  itinerary: ItineraryDay[];
}

const ItineraryPlanner: React.FC<ItineraryPlannerProps> = ({ destination, days, itinerary }) => {
  const getCrowdLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCrowdLevelIcon = (level: string) => {
    switch (level) {
      case 'low': return '🟢';
      case 'medium': return '🟡';
      case 'high': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🗺️ Your {destination} Itinerary
          </h1>
          <p className="text-gray-600 text-lg">
            {days}-day personalized travel plan with seasonal recommendations
          </p>
        </div>

        <div className="space-y-8">
          {itinerary.map((day) => (
            <div key={day.day} className="bg-white rounded-xl shadow-lg p-6 animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Day {day.day}
                </h2>
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    🌤️ {day.season}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCrowdLevelColor(day.crowdLevel)}`}>
                    {getCrowdLevelIcon(day.crowdLevel)} {day.crowdLevel.charAt(0).toUpperCase() + day.crowdLevel.slice(1)} Crowd
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    ⭐ Must-Visit Places
                  </h3>
                  <div className="space-y-3">
                    {day.mustVisitPlaces.map((place) => (
                      <div key={place.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start space-x-3">
                          {place.imageUrl && (
                            <img
                              src={place.imageUrl}
                              alt={place.name}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{place.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{place.description}</p>
                            <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                              <span>⏱️ {place.estimatedDuration}</span>
                              <span>⭐ {place.rating}</span>
                              <span>🏷️ {place.category}</span>
                            </div>
                            <p className="text-xs text-blue-600 mt-2">
                              💡 Best time: {place.bestTimeToVisit}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    🎯 Recommended Activities
                  </h3>
                  <div className="space-y-3">
                    {day.activities.map((activity) => (
                      <div key={activity.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start space-x-3">
                          {activity.imageUrl && (
                            <img
                              src={activity.imageUrl}
                              alt={activity.name}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">{activity.name}</h4>
                            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                            <div className="flex items-center mt-2 space-x-4 text-xs text-gray-500">
                              <span>⏱️ {activity.duration}</span>
                              <span>💰 {activity.price}</span>
                              <span>🏃 {activity.difficulty}</span>
                            </div>
                            <p className="text-xs text-green-600 mt-2">
                              🌸 Best in {activity.season}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  💡 Travel Tips & Suggestions
                </h3>
                <ul className="space-y-2">
                  {day.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
            📥 Download Itinerary
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPlanner;
