import { Request, Response } from 'express';
import FoodItem from '../models/FoodItem';

export const getAllFoodItems = async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await FoodItem.find().sort({ expirationDate: 1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food items' });
  }
};

export const createFoodItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, quantity, expirationDate } = req.body;

    if (!name || !quantity || !expirationDate) {
      res.status(400).json({ error: 'Missing required fields: name, quantity, expirationDate' });
      return;
    }

    const foodItem = new FoodItem({
      name,
      quantity: Number(quantity),
      expirationDate: new Date(expirationDate),
    });

    const savedItem = await foodItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create food item' });
  }
};

export const updateFoodItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, quantity, expirationDate } = req.body;

    if (!name || !quantity || !expirationDate) {
      res.status(400).json({ error: 'Missing required fields: name, quantity, expirationDate' });
      return;
    }

    const updatedItem = await FoodItem.findByIdAndUpdate(
      id,
      {
        name,
        quantity: Number(quantity),
        expirationDate: new Date(expirationDate),
      },
      { new: true, runValidators: true }
    );

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
    const deletedItem = await FoodItem.findByIdAndDelete(id);

    if (!deletedItem) {
      res.status(404).json({ error: 'Food item not found' });
      return;
    }

    res.json({ message: 'Food item deleted successfully', item: deletedItem });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete food item' });
  }
};

