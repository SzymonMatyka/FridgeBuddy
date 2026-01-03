import { Request, Response } from 'express';
import { FoodItemRepository } from '../../infrastructure/repositories/FoodItemRepository';
import {
  validateCreateFoodItem,
  validateUpdateFoodItem,
  normalizeCreateFoodItemDto,
  normalizeUpdateFoodItemDto,
} from '../../domain/services/foodItemService';
import { CreateFoodItemDto, UpdateFoodItemDto } from '../../domain/entities/FoodItem';

export const getAllFoodItems = async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await FoodItemRepository.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food items' });
  }
};

export const getFoodItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await FoodItemRepository.findById(id);

    if (!item) {
      res.status(404).json({ error: 'Food item not found' });
      return;
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food item' });
  }
};

export const createFoodItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = validateCreateFoodItem(req.body);

    if (!validation.isValid) {
      res.status(400).json({ 
        error: 'Validation failed', 
        details: validation.errors 
      });
      return;
    }

    const normalizedDto = normalizeCreateFoodItemDto(req.body as Partial<CreateFoodItemDto>);
    const createdItem = await FoodItemRepository.create(normalizedDto);
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create food item' });
  }
};

export const updateFoodItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const validation = validateUpdateFoodItem(req.body);

    if (!validation.isValid) {
      res.status(400).json({ 
        error: 'Validation failed', 
        details: validation.errors 
      });
      return;
    }

    const normalizedDto = normalizeUpdateFoodItemDto(req.body as Partial<UpdateFoodItemDto>);
    const updatedItem = await FoodItemRepository.update(id, normalizedDto);

    if (!updatedItem) {
      res.status(404).json({ error: 'Food item not found' });
      return;
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update food item' });
  }
};

export const deleteFoodItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedItem = await FoodItemRepository.delete(id);

    if (!deletedItem) {
      res.status(404).json({ error: 'Food item not found' });
      return;
    }

    res.json({ message: 'Food item deleted successfully', item: deletedItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete food item' });
  }
};

