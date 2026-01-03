import { CreateFoodItemDto, UpdateFoodItemDto } from '../entities/FoodItem';
export interface ValidationError {
    field: string;
    message: string;
}
export interface ValidationResult {
    isValid: boolean;
    errors: ValidationError[];
}
export declare const validateCreateFoodItem: (dto: Partial<CreateFoodItemDto>) => ValidationResult;
export declare const validateUpdateFoodItem: (dto: Partial<UpdateFoodItemDto>) => ValidationResult;
export declare const normalizeCreateFoodItemDto: (dto: Partial<CreateFoodItemDto>) => CreateFoodItemDto;
export declare const normalizeUpdateFoodItemDto: (dto: Partial<UpdateFoodItemDto>) => UpdateFoodItemDto;
//# sourceMappingURL=foodItemService.d.ts.map