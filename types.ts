export interface Coordinates {
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
}

export interface Waypoint extends Coordinates {
  id: string;
  floorIndex: number; // 0 to 4
  label: string;
  duration?: number; // Time to travel to this point in seconds
  pauseDuration?: number; // Time to wait at this point in milliseconds
  description?: string;
}

export interface TourMap {
  floorIndex: number;
  name: string;
  imageUrl: string;
}
