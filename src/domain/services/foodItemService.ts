import { CreateFoodItemDto, UpdateFoodItemDto } from '../entities/FoodItem';

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

const validateName = (name: unknown): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!name || typeof name !== 'string') {
    errors.push({ field: 'name', message: 'Name is required and must be a string' });
    return errors;
  }

  const trimmedName = name.trim();
  if (trimmedName.length === 0) {
    errors.push({ field: 'name', message: 'Name cannot be empty' });
  }

  return errors;
};

const validateQuantity = (quantity: unknown): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (quantity === undefined || quantity === null) {
    errors.push({ field: 'quantity', message: 'Quantity is required' });
    return errors;
  }

  const numQuantity = typeof quantity === 'string' ? parseFloat(quantity) : Number(quantity);

  if (isNaN(numQuantity)) {
    errors.push({ field: 'quantity', message: 'Quantity must be a valid number' });
    return errors;
  }

  if (numQuantity < 1) {
    errors.push({ field: 'quantity', message: 'Quantity must be at least 1' });
  }

  return errors;
};

const validateExpirationDate = (expirationDate: unknown): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!expirationDate) {
    errors.push({ field: 'expirationDate', message: 'Expiration date is required' });
    return errors;
  }

  const date = expirationDate instanceof Date 
    ? expirationDate 
    : new Date(expirationDate as string | number | Date);

  if (isNaN(date.getTime())) {
    errors.push({ field: 'expirationDate', message: 'Expiration date must be a valid date' });
  }

  return errors;
};

export const validateCreateFoodItem = (dto: Partial<CreateFoodItemDto>): ValidationResult => {
  const errors: ValidationError[] = [
    ...validateName(dto.name),
    ...validateQuantity(dto.quantity),
    ...validateExpirationDate(dto.expirationDate),
  ];

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateUpdateFoodItem = (dto: Partial<UpdateFoodItemDto>): ValidationResult => {
  const errors: ValidationError[] = [];

  if (dto.name !== undefined) {
    errors.push(...validateName(dto.name));
  }

  if (dto.quantity !== undefined) {
    errors.push(...validateQuantity(dto.quantity));
  }

  if (dto.expirationDate !== undefined) {
    errors.push(...validateExpirationDate(dto.expirationDate));
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const normalizeCreateFoodItemDto = (dto: Partial<CreateFoodItemDto>): CreateFoodItemDto => {
  const quantity = typeof dto.quantity === 'string' ? parseFloat(dto.quantity) : Number(dto.quantity);
  const expirationDate = dto.expirationDate instanceof Date 
    ? dto.expirationDate 
    : new Date(dto.expirationDate!);

  return {
    name: (dto.name as string).trim(),
    quantity,
    expirationDate,
  };
};

export const normalizeUpdateFoodItemDto = (dto: Partial<UpdateFoodItemDto>): UpdateFoodItemDto => {
  const normalized: UpdateFoodItemDto = {};

  if (dto.name !== undefined) {
    normalized.name = (dto.name as string).trim();
  }

  if (dto.quantity !== undefined) {
    normalized.quantity = typeof dto.quantity === 'string' 
      ? parseFloat(dto.quantity) 
      : Number(dto.quantity);
  }

  if (dto.expirationDate !== undefined) {
    normalized.expirationDate = dto.expirationDate instanceof Date 
      ? dto.expirationDate 
      : new Date(dto.expirationDate);
  }

  return normalized;
};

