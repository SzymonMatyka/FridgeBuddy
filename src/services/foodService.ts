import { FoodItemRepository } from '../infrastructure/repositories/FoodItemRepository';
import {
  validateCreateFoodItem,
  validateUpdateFoodItem,
  normalizeCreateFoodItemDto,
  normalizeUpdateFoodItemDto,
} from '../domain/services/foodItemService';
import { FoodItem, CreateFoodItemDto, UpdateFoodItemDto } from '../domain/entities/FoodItem';

export class FoodItemNotFoundError extends Error {
  constructor(id: string) {
    super(`Food item with id ${id} not found`);
    this.name = 'FoodItemNotFoundError';
  }
}

export class ValidationError extends Error {
  public details: Array<{ field: string; message: string }>;

  constructor(message: string, details: Array<{ field: string; message: string }>) {
    super(message);
    this.name = 'ValidationError';
    this.details = details;
  }
}

export const getAllFoodItems = async (): Promise<FoodItem[]> => {
  return await FoodItemRepository.findAll();
};

export const getFoodItemById = async (id: string): Promise<FoodItem> => {
  const item = await FoodItemRepository.findById(id);

  if (!item) {
    throw new FoodItemNotFoundError(id);
  }

  return item;
};

export const createFoodItem = async (data: unknown): Promise<FoodItem> => {
  const validation = validateCreateFoodItem(data as Partial<CreateFoodItemDto>);

  if (!validation.isValid) {
    throw new ValidationError('Validation failed', validation.errors);
  }

  const normalizedDto = normalizeCreateFoodItemDto(data as Partial<CreateFoodItemDto>);
  return await FoodItemRepository.create(normalizedDto);
};

export const updateFoodItem = async (id: string, data: unknown): Promise<FoodItem> => {
  const validation = validateUpdateFoodItem(data as Partial<UpdateFoodItemDto>);

  if (!validation.isValid) {
    throw new ValidationError('Validation failed', validation.errors);
  }

  const normalizedDto = normalizeUpdateFoodItemDto(data as Partial<UpdateFoodItemDto>);
  const updatedItem = await FoodItemRepository.update(id, normalizedDto);

  if (!updatedItem) {
    throw new FoodItemNotFoundError(id);
  }

  return updatedItem;
};

export const deleteFoodItem = async (id: string): Promise<FoodItem> => {
  const deletedItem = await FoodItemRepository.delete(id);

  if (!deletedItem) {
    throw new FoodItemNotFoundError(id);
  }

  return deletedItem;
};

