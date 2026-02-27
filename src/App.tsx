import React, { useState } from 'react';
import LandingForm from './components/LandingForm';
import ItineraryPlanner from './components/ItineraryPlanner';
import RestaurantFinder from './components/RestaurantFinder';
import SpecificPlacesExplorer from './components/SpecificPlacesExplorer';
import { TravelPlan } from './types';
import { generateItinerary, mockRestaurants, mockActivities, mockSeasonalEvents } from './data/mockData';

const App: React.FC = () => {
  const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);

  const handleFormSubmit = (plan: TravelPlan) => {
    setTravelPlan(plan);
  };

  const handleBackToHome = () => {
    setTravelPlan(null);
  };

  const renderContent = () => {
    if (!travelPlan) {
      return <LandingForm onSubmit={handleFormSubmit} />;
    }

    switch (travelPlan.explorationType) {
      case 'itinerary':
        const itinerary = generateItinerary(travelPlan.destination, travelPlan.days);
        return (
          <ItineraryPlanner
            destination={travelPlan.destination}
            days={travelPlan.days}
            itinerary={itinerary}
          />
        );
      
      case 'restaurant':
        return (
          <RestaurantFinder
            destination={travelPlan.destination}
            restaurants={mockRestaurants}
          />
        );
      
      case 'specific-places':
        return (
          <SpecificPlacesExplorer
            destination={travelPlan.destination}
            activities={mockActivities}
            seasonalEvents={mockSeasonalEvents}
          />
        );
      
      default:
        return <LandingForm onSubmit={handleFormSubmit} />;
    }
  };

  return (
    <div className="App">
      {travelPlan && (
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={handleBackToHome}
            className="bg-white text-gray-700 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-2"
          >
            <span>←</span>
            <span>Back to Home</span>
          </button>
        </div>
      )}
      {renderContent()}
    </div>
  );
};

export default App;
