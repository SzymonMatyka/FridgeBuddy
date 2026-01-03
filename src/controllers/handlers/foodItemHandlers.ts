import { Request, Response } from 'express';
import {
  getAllFoodItems as getAllFoodItemsService,
  getFoodItemById as getFoodItemByIdService,
  createFoodItem as createFoodItemService,
  updateFoodItem as updateFoodItemService,
  deleteFoodItem as deleteFoodItemService,
  FoodItemNotFoundError,
  ValidationError,
} from '../../services/foodService';

export const getAllFoodItems = async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await getAllFoodItemsService();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food items' });
  }
};

export const getFoodItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await getFoodItemByIdService(id);
    res.json(item);
  } catch (error) {
    if (error instanceof FoodItemNotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Failed to fetch food item' });
  }
};

export const createFoodItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await createFoodItemService(req.body);
    res.status(201).json(item);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({
        error: error.message,
        details: error.details,
      });
      return;
    }
    res.status(400).json({ error: 'Failed to create food item' });
  }
};

export const updateFoodItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await updateFoodItemService(id, req.body);
    res.json(item);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({
        error: error.message,
        details: error.details,
      });
      return;
    }
    if (error instanceof FoodItemNotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(400).json({ error: 'Failed to update food item' });
  }
};

export const deleteFoodItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedItem = await deleteFoodItemService(id);
    res.json({ message: 'Food item deleted successfully', item: deletedItem });
  } catch (error) {
    if (error instanceof FoodItemNotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Failed to delete food item' });
  }
};
