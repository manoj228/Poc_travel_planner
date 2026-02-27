export interface TravelPlan {
  destination: string;
  days: number;
  explorationType: ExplorationType;
}

export type ExplorationType = 'itinerary' | 'restaurant' | 'specific-places';

export interface ItineraryDay {
  day: number;
  season: string;
  crowdLevel: 'low' | 'medium' | 'high';
  mustVisitPlaces: Place[];
  suggestions: string[];
  activities: Activity[];
}

export interface Place {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  bestTimeToVisit: string;
  estimatedDuration: string;
  imageUrl?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  customerReviews: number;
  googleRating: number;
  priceRange: string;
  location: string;
  imageUrl?: string;
  specialties: string[];
  distance?: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  season: string;
  duration: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  price: string;
  imageUrl?: string;
}

export interface SeasonalEvent {
  id: string;
  name: string;
  description: string;
  month: string;
  season: string;
  type: 'festival' | 'activity' | 'occasion';
  location: string;
}
