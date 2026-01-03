"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFoodItem = exports.updateFoodItem = exports.createFoodItem = exports.getFoodItemById = exports.getAllFoodItems = void 0;
const FoodItemRepository_1 = require("../../infrastructure/repositories/FoodItemRepository");
const foodItemService_1 = require("../../domain/services/foodItemService");
const getAllFoodItems = async (_req, res) => {
    try {
        const items = await FoodItemRepository_1.FoodItemRepository.findAll();
        res.json(items);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch food items' });
    }
};
exports.getAllFoodItems = getAllFoodItems;
const getFoodItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await FoodItemRepository_1.FoodItemRepository.findById(id);
        if (!item) {
            res.status(404).json({ error: 'Food item not found' });
            return;
        }
        res.json(item);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch food item' });
    }
};
exports.getFoodItemById = getFoodItemById;
const createFoodItem = async (req, res) => {
    try {
        const validation = (0, foodItemService_1.validateCreateFoodItem)(req.body);
        if (!validation.isValid) {
            res.status(400).json({
                error: 'Validation failed',
                details: validation.errors
            });
            return;
        }
        const normalizedDto = (0, foodItemService_1.normalizeCreateFoodItemDto)(req.body);
        const createdItem = await FoodItemRepository_1.FoodItemRepository.create(normalizedDto);
        res.status(201).json(createdItem);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create food item' });
    }
};
exports.createFoodItem = createFoodItem;
const updateFoodItem = async (req, res) => {
    try {
        const { id } = req.params;
        const validation = (0, foodItemService_1.validateUpdateFoodItem)(req.body);
        if (!validation.isValid) {
            res.status(400).json({
                error: 'Validation failed',
                details: validation.errors
            });
            return;
        }
        const normalizedDto = (0, foodItemService_1.normalizeUpdateFoodItemDto)(req.body);
        const updatedItem = await FoodItemRepository_1.FoodItemRepository.update(id, normalizedDto);
        if (!updatedItem) {
            res.status(404).json({ error: 'Food item not found' });
            return;
        }
        res.json(updatedItem);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update food item' });
    }
};
exports.updateFoodItem = updateFoodItem;
const deleteFoodItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await FoodItemRepository_1.FoodItemRepository.delete(id);
        if (!deletedItem) {
            res.status(404).json({ error: 'Food item not found' });
            return;
        }
        res.json({ message: 'Food item deleted successfully', item: deletedItem });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete food item' });
    }
};
exports.deleteFoodItem = deleteFoodItem;
//# sourceMappingURL=foodItemHandlers.js.map