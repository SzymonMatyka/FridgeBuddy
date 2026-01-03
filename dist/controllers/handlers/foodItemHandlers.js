"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFoodItem = exports.updateFoodItem = exports.createFoodItem = exports.getFoodItemById = exports.getAllFoodItems = void 0;
const foodService_1 = require("../../services/foodService");
const getAllFoodItems = async (_req, res) => {
    try {
        const items = await (0, foodService_1.getAllFoodItems)();
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
        const item = await (0, foodService_1.getFoodItemById)(id);
        res.json(item);
    }
    catch (error) {
        if (error instanceof foodService_1.FoodItemNotFoundError) {
            res.status(404).json({ error: error.message });
            return;
        }
        res.status(500).json({ error: 'Failed to fetch food item' });
    }
};
exports.getFoodItemById = getFoodItemById;
const createFoodItem = async (req, res) => {
    try {
        const item = await (0, foodService_1.createFoodItem)(req.body);
        res.status(201).json(item);
    }
    catch (error) {
        if (error instanceof foodService_1.ValidationError) {
            res.status(400).json({
                error: error.message,
                details: error.details,
            });
            return;
        }
        res.status(400).json({ error: 'Failed to create food item' });
    }
};
exports.createFoodItem = createFoodItem;
const updateFoodItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await (0, foodService_1.updateFoodItem)(id, req.body);
        res.json(item);
    }
    catch (error) {
        if (error instanceof foodService_1.ValidationError) {
            res.status(400).json({
                error: error.message,
                details: error.details,
            });
            return;
        }
        if (error instanceof foodService_1.FoodItemNotFoundError) {
            res.status(404).json({ error: error.message });
            return;
        }
        res.status(400).json({ error: 'Failed to update food item' });
    }
};
exports.updateFoodItem = updateFoodItem;
const deleteFoodItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await (0, foodService_1.deleteFoodItem)(id);
        res.json({ message: 'Food item deleted successfully', item: deletedItem });
    }
    catch (error) {
        if (error instanceof foodService_1.FoodItemNotFoundError) {
            res.status(404).json({ error: error.message });
            return;
        }
        res.status(500).json({ error: 'Failed to delete food item' });
    }
};
exports.deleteFoodItem = deleteFoodItem;
//# sourceMappingURL=foodItemHandlers.js.map