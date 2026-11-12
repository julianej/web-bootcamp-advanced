export type Difficulty = 'easy' | 'moderate' | 'hard';

// REGION
export interface Region {
  id: number;
  name: string;
  country: string;
}

export type RegionInput = Omit<Region, 'id'>;

// TRAIL

export interface Trail {
  id: number;
  region_id: number;
  name: string;
  slug: string;
  description: string;
  distance_km: number;
  elevation_m: number;
  difficulty: Difficulty;
  image: string | null;
  created_at: number;
}

// TEST DATA
export interface SeedTrail {
  region: string;
  name: string;
  slug: string;
  description: string;
  distance: number;
  elevation: number;
  difficulty: Difficulty;
  image: string;
}

// TRAIL + REGION (INNER JOIN) COUNTRY
export interface TrailWithRegion extends Trail {
  region_name: string;
  region_country: string;
}

export type TrailInput = Omit<Trail, 'id' | 'slug' | 'created_at'>;