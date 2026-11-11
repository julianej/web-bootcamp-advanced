export type Difficulty = 'easy' | 'moderate' | 'hard';
export interface Region {
    id: number;
    name: string;
    country: string;
}
export type RegionInput = Omit<Region, 'id'>;
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
//# sourceMappingURL=types.d.ts.map