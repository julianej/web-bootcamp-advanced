import type { Region, RegionInput } from './types.js';
export declare function getAll(): Region[];
export declare function getById(id: number): Region | undefined;
export declare function create({ name, country }: RegionInput): Region | undefined;
export declare function update(id: number, { name, country }: RegionInput): Region | undefined;
export declare function remove(id: number): number;
//# sourceMappingURL=regionModel.d.ts.map