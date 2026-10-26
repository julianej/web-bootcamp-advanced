import type { ApiResponse } from "./types.js";
export declare function ok<T>(data: T): ApiResponse<T>;
export declare function findById<T extends {
    id: number;
}>(items: T[], id: number): T | undefined;
//# sourceMappingURL=api.d.ts.map