import React, { useState } from 'react';
import { Activity, SeasonalEvent } from '../types';

interface SpecificPlacesExplorerProps {
  destination: string;
  activities: Activity[];
  seasonalEvents: SeasonalEvent[];
}

const SpecificPlacesExplorer: React.FC<SpecificPlacesExplorerProps> = ({ 
  destination, 
  activities, 
  seasonalEvents 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeason = selectedSeason === 'all' || activity.season === selectedSeason;
    return matchesSearch && matchesSeason;
  });

  const filteredEvents = seasonalEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMonth = selectedMonth === 'all' || event.month === selectedMonth;
    const matchesSeason = selectedSeason === 'all' || event.season === selectedSeason;
    return matchesSearch && matchesMonth && matchesSeason;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'challenging': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'festival': return 'text-purple-600 bg-purple-100';
      case 'activity': return 'text-blue-600 bg-blue-100';
      case 'occasion': return 'text-pink-600 bg-pink-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeasonEmoji = (season: string) => {
    switch (season) {
      case 'Spring': return '🌸';
      case 'Summer': return '☀️';
      case 'Fall': return '🍂';
      case 'Winter': return '❄️';
      default: return '🌍';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎯 Explore Specific Places in {destination}
          </h1>
          <p className="text-gray-600 text-lg">
            Discover special activities and seasonal events at your destination
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔍 Search Activities
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Search by name or description..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📅 Filter by Month
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Months</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🌤️ Filter by Season
              </label>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Seasons</option>
                {seasons.map(season => (
                  <option key={season} value={season}>
                    {getSeasonEmoji(season)} {season}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedMonth('all');
                  setSelectedSeason('all');
                }}
                className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                🔄 Reset Filters
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              🎪 Special Activities
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.map((activity) => (
                <div key={activity.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow animate-slide-up">
                  {activity.imageUrl && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={activity.imageUrl}
                        alt={activity.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-800">{activity.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
                        {activity.difficulty}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{activity.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">⏱️ Duration</span>
                        <span className="font-medium">{activity.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">💰 Price</span>
                        <span className="font-medium">{activity.price}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">🌸 Best Season</span>
                        <span className="font-medium">
                          {getSeasonEmoji(activity.season)} {activity.season}
                        </span>
                      </div>
                    </div>

                    <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                      📅 Book This Activity
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              🎉 Seasonal Events & Occasions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow animate-slide-up">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{event.name}</h3>
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl mb-1">📅</div>
                      <div className="text-sm font-medium text-gray-800">{event.month}</div>
                      <div className="text-xs text-gray-600">Month</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl mb-1">{getSeasonEmoji(event.season)}</div>
                      <div className="text-sm font-medium text-gray-800">{event.season}</div>
                      <div className="text-xs text-gray-600">Season</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-700">
                      📍 <span className="font-medium">Location:</span> {event.location}
                    </p>
                  </div>

                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all">
                    🎟️ Get Event Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {filteredActivities.length === 0 && filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Results Found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find activities and events.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecificPlacesExplorer;
