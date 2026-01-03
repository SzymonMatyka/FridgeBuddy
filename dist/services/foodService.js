"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFoodItem = exports.updateFoodItem = exports.createFoodItem = exports.getFoodItemById = exports.getAllFoodItems = exports.ValidationError = exports.FoodItemNotFoundError = void 0;
const FoodItemRepository_1 = require("../infrastructure/repositories/FoodItemRepository");
const foodItemService_1 = require("../domain/services/foodItemService");
class FoodItemNotFoundError extends Error {
    constructor(id) {
        super(`Food item with id ${id} not found`);
        this.name = 'FoodItemNotFoundError';
    }
}
exports.FoodItemNotFoundError = FoodItemNotFoundError;
class ValidationError extends Error {
    constructor(message, details) {
        super(message);
        this.name = 'ValidationError';
        this.details = details;
    }
}
exports.ValidationError = ValidationError;
const getAllFoodItems = async () => {
    return await FoodItemRepository_1.FoodItemRepository.findAll();
};
exports.getAllFoodItems = getAllFoodItems;
const getFoodItemById = async (id) => {
    const item = await FoodItemRepository_1.FoodItemRepository.findById(id);
    if (!item) {
        throw new FoodItemNotFoundError(id);
    }
    return item;
};
exports.getFoodItemById = getFoodItemById;
const createFoodItem = async (data) => {
    const validation = (0, foodItemService_1.validateCreateFoodItem)(data);
    if (!validation.isValid) {
        throw new ValidationError('Validation failed', validation.errors);
    }
    const normalizedDto = (0, foodItemService_1.normalizeCreateFoodItemDto)(data);
    return await FoodItemRepository_1.FoodItemRepository.create(normalizedDto);
};
exports.createFoodItem = createFoodItem;
const updateFoodItem = async (id, data) => {
    const validation = (0, foodItemService_1.validateUpdateFoodItem)(data);
    if (!validation.isValid) {
        throw new ValidationError('Validation failed', validation.errors);
    }
    const normalizedDto = (0, foodItemService_1.normalizeUpdateFoodItemDto)(data);
    const updatedItem = await FoodItemRepository_1.FoodItemRepository.update(id, normalizedDto);
    if (!updatedItem) {
        throw new FoodItemNotFoundError(id);
    }
    return updatedItem;
};
exports.updateFoodItem = updateFoodItem;
const deleteFoodItem = async (id) => {
    const deletedItem = await FoodItemRepository_1.FoodItemRepository.delete(id);
    if (!deletedItem) {
        throw new FoodItemNotFoundError(id);
    }
    return deletedItem;
};
exports.deleteFoodItem = deleteFoodItem;
//# sourceMappingURL=foodService.js.map