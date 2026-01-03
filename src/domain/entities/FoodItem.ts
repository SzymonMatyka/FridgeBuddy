export interface FoodItem {
  id: string;
  name: string;
  quantity: number;
  expirationDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateFoodItemDto {
  name: string;
  quantity: number;
  expirationDate: Date;
}

export interface UpdateFoodItemDto {
  name?: string;
  quantity?: number;
  expirationDate?: Date;
}

