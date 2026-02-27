import { Place, Restaurant, Activity, SeasonalEvent, ItineraryDay } from '../types';

export const mockPlaces: Place[] = [
  {
    id: '1',
    name: 'Eiffel Tower',
    description: 'Iconic iron lattice tower and symbol of Paris',
    category: 'Landmark',
    rating: 4.6,
    bestTimeToVisit: 'Early morning or evening',
    estimatedDuration: '2-3 hours',
    imageUrl: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400'
  },
  {
    id: '2',
    name: 'Louvre Museum',
    description: 'World\'s largest art museum and historic monument',
    category: 'Museum',
    rating: 4.7,
    bestTimeToVisit: 'Wednesday or Friday evening',
    estimatedDuration: '4-5 hours',
    imageUrl: 'https://images.unsplash.com/photo-1566472237159-d6a0b2ac4ad1?w=400'
  },
  {
    id: '3',
    name: 'Notre-Dame Cathedral',
    description: 'Medieval Catholic cathedral on the Île de la Cité',
    category: 'Religious Site',
    rating: 4.5,
    bestTimeToVisit: 'Morning hours',
    estimatedDuration: '1-2 hours',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400'
  }
];

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Le Bernardin',
    cuisine: 'French Seafood',
    rating: 4.8,
    customerReviews: 2847,
    googleRating: 4.6,
    priceRange: '$$$',
    location: '155 W 51st St, New York, NY',
    specialties: ['Seafood', 'French cuisine', 'Wine pairing'],
    distance: '0.5 km',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400'
  },
  {
    id: '2',
    name: 'Eleven Madison Park',
    cuisine: 'Contemporary American',
    rating: 4.7,
    customerReviews: 1923,
    googleRating: 4.5,
    priceRange: '$$$$',
    location: '11 Madison Ave, New York, NY',
    specialties: ['Tasting menu', 'Farm-to-table', 'Wine selection'],
    distance: '1.2 km',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400'
  },
  {
    id: '3',
    name: 'Joe\'s Pizza',
    cuisine: 'Italian-American',
    rating: 4.4,
    customerReviews: 5632,
    googleRating: 4.3,
    priceRange: '$',
    location: '7 Carmine St, New York, NY',
    specialties: ['New York-style pizza', 'Classic slices', 'Italian dishes'],
    distance: '0.8 km',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'
  }
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    name: 'Sunset Photography Tour',
    description: 'Capture stunning sunset views from the best vantage points',
    season: 'Summer',
    duration: '3 hours',
    difficulty: 'easy',
    price: '$50',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
  },
  {
    id: '2',
    name: 'Historical Walking Tour',
    description: 'Explore the rich history and hidden stories of the city',
    season: 'Spring',
    duration: '2.5 hours',
    difficulty: 'easy',
    price: '$35',
    imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400'
  },
  {
    id: '3',
    name: 'Mountain Hiking Adventure',
    description: 'Challenging hike with breathtaking panoramic views',
    season: 'Fall',
    duration: '6 hours',
    difficulty: 'challenging',
    price: '$80',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e308?w=400'
  }
];

export const mockSeasonalEvents: SeasonalEvent[] = [
  {
    id: '1',
    name: 'Cherry Blossom Festival',
    description: 'Annual celebration of spring with beautiful cherry blossoms',
    month: 'April',
    season: 'Spring',
    type: 'festival',
    location: 'Central Park'
  },
  {
    id: '2',
    name: 'Summer Music Concert Series',
    description: 'Free outdoor concerts featuring local and international artists',
    month: 'July',
    season: 'Summer',
    type: 'activity',
    location: 'Riverside Park'
  },
  {
    id: '3',
    name: 'Fall Food Festival',
    description: 'Celebrate autumn harvest with local cuisine and craft beer',
    month: 'October',
    season: 'Fall',
    type: 'festival',
    location: 'Brooklyn Bridge Park'
  }
];

export const generateItinerary = (destination: string, days: number): ItineraryDay[] => {
  const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
  const crowdLevels: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];
  
  return Array.from({ length: days }, (_, index) => ({
    day: index + 1,
    season: seasons[index % 4],
    crowdLevel: crowdLevels[Math.floor(Math.random() * 3)],
    mustVisitPlaces: mockPlaces.slice(0, 2),
    suggestions: [
      'Try local cuisine at nearby restaurants',
      'Visit during early morning for fewer crowds',
      'Bring comfortable walking shoes',
      'Check weather conditions before visiting'
    ],
    activities: mockActivities.slice(0, 2)
  }));
};
