export interface ItineraryPlan {
    _id: string;
    budget: string;
    noOfDays: number;
    travelerId: string; 
    location: string;
    hotels: string[]; 
    itineraryItems: string[]; 
}

export interface ItineraryPlanInput {
    budget: string;
    noOfDays: number;
    travelerId: string; 
    location: string;
    hotels: string[]; 
    itineraryItems: string[]; 
};

export interface ApiKey {
    _id?: string;
    userId: string; 
    name?: string;
    key: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
  

export interface SignupInput {
    name: string;
    email: string;
    password: string;
}

export interface LoginInput {
    email: string;
    password: string;
}