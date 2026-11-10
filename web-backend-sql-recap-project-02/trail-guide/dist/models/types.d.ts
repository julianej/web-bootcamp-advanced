export type Difficulty = 'easy' | 'moderate' | 'hard';
export interface Region {
    id: number;
    name: string;
    country: string;
}
export type RegionInput = Omit<Region, 'id'>;
export interface Trail {
    id: number;
    name: string;
    description: string | null;
    distance_km: number;
    elevation_m: number;
    difficulty: Difficulty;
    created_at: string;
    region_id: number;
    region_name: string;
    country: string;
}
export interface TrailInput {
    region_id: number;
    name: string;
    description: string | null;
    distance_km: number;
    elevation_m: number;
    difficulty: Difficulty;
}
//# sourceMappingURL=types.d.ts.map