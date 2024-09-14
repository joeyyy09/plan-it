// Core Data Types
export type Coordinates = {
    latitude: number;
    longitude: number;
};

// User Authentication Types
export type AuthUser = {
    id: string;
    name: string;
    email: string;
};

export type AuthToken = {
    token: string;
    user: AuthUser;
};

export type AuthContextType = {
    authState: AuthToken;
    setAuthState: (token: AuthToken) => void;
    isAuthenticated: () => boolean;
};

// Form Types
export type SignInForm = {
    email: string;
    password: string;
};

  
export type SignUpForm = {
    name: string;
    email: string;
    password: string;
};

// Itinerary Type
export type TravelItinerary = {
    [x: string]: any;
    id: string;
    budget: string;
    duration: number; // Duration in days
    user: string; // User ID who created the itinerary
    destination: string; // Trip location or destination
    hotels: HotelDetails[]; // Array of hotel details
    places: TravelPlace[]; // List of places to visit
    createdOn?: string; // Optional date of creation
    updatedOn?: string; // Optional last updated date
};


export type GeoCoordinates = [latitude: number, longitude: number];

export type TravelPlace = {
    name: string;
    details: string;
    imageUrl: string;
    coordinates: Coordinates;
    ticketPrice: string;
    rating: number; // Out of 5, for example
    travelTime: string;
    bestVisitTime: string;
};

export type HotelDetails = {
    name: string;
    address: string;
    pricePerNight: string;
    imageUrl: string;
    coordinates: Coordinates;
    rating: number; // Hotel rating, out of 5
    description: string;
};
