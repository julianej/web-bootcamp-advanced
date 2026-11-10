import type { Trail, TrailInput } from './types.js';
export declare function getAllWithRegion(): Trail[];
export declare function getById(id: number): Trail | undefined;
export declare function getByRegion(regionId: number): Trail[];
export declare function create(input: TrailInput): Trail | undefined;
export declare function update(id: number, input: TrailInput): Trail | undefined;
export declare function remove(id: number): number;
//# sourceMappingURL=trailModel.d.ts.map