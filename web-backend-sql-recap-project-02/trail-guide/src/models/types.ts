export type Difficulty = 'easy' | 'moderate' | 'hard';

export interface Region {
  id: number;
  name: string;
  country: string;
}

// Omit is a built-in TypeScript helper 
// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RegionInput = Omit<Region, 'id'>;

// A trail row as returned by the INNER JOIN (includes region data)
export interface Trail {
  id: number;
  region_id: number;
  name: string;
  description: string;
  distance_km: number;
  elevation_m: number;
  difficulty: string;
  image: string | null;
  created_at: string;
  region_name: string;
  country: string;
}

export interface TrailInput {
  region_id: number;
  name: string;
  description: string;
  distance_km: number;
  elevation_m: number;
  difficulty: string;
  image: string | null;
}