import { FoodItem } from '../domain/entities/FoodItem';
export declare class FoodItemNotFoundError extends Error {
    constructor(id: string);
}
export declare class ValidationError extends Error {
    details: Array<{
        field: string;
        message: string;
    }>;
    constructor(message: string, details: Array<{
        field: string;
        message: string;
    }>);
}
export declare const getAllFoodItems: () => Promise<FoodItem[]>;
export declare const getFoodItemById: (id: string) => Promise<FoodItem>;
export declare const createFoodItem: (data: unknown) => Promise<FoodItem>;
export declare const updateFoodItem: (id: string, data: unknown) => Promise<FoodItem>;
export declare const deleteFoodItem: (id: string) => Promise<FoodItem>;
//# sourceMappingURL=foodService.d.ts.map