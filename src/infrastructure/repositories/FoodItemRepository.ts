import FoodItemModel, { IFoodItem } from '../../models/FoodItem';
import { FoodItem, CreateFoodItemDto, UpdateFoodItemDto } from '../../domain/entities/FoodItem';

const mapToDomainEntity = (mongooseDoc: IFoodItem): FoodItem => {
  return {
    id: mongooseDoc._id.toString(),
    name: mongooseDoc.name,
    quantity: mongooseDoc.quantity,
    expirationDate: mongooseDoc.expirationDate,
    createdAt: mongooseDoc.createdAt,
    updatedAt: mongooseDoc.updatedAt,
  };
};

export interface IFoodItemRepository {
  findAll(): Promise<FoodItem[]>;
  findById(id: string): Promise<FoodItem | null>;
  create(dto: CreateFoodItemDto): Promise<FoodItem>;
  update(id: string, dto: UpdateFoodItemDto): Promise<FoodItem | null>;
  delete(id: string): Promise<FoodItem | null>;
}

export const FoodItemRepository: IFoodItemRepository = {
  findAll: async (): Promise<FoodItem[]> => {
    const items = await FoodItemModel.find().sort({ expirationDate: 1 });
    return items.map(mapToDomainEntity);
  },

  findById: async (id: string): Promise<FoodItem | null> => {
    const item = await FoodItemModel.findById(id);
    return item ? mapToDomainEntity(item) : null;
  },

  create: async (dto: CreateFoodItemDto): Promise<FoodItem> => {
    const item = new FoodItemModel({
      name: dto.name,
      quantity: dto.quantity,
      expirationDate: dto.expirationDate,
    });

    const savedItem = await item.save();
    return mapToDomainEntity(savedItem);
  },

  update: async (id: string, dto: UpdateFoodItemDto): Promise<FoodItem | null> => {
    const updatedItem = await FoodItemModel.findByIdAndUpdate(
      id,
      dto,
      { new: true, runValidators: true }
    );

    return updatedItem ? mapToDomainEntity(updatedItem) : null;
  },

  delete: async (id: string): Promise<FoodItem | null> => {
    const deletedItem = await FoodItemModel.findByIdAndDelete(id);
    return deletedItem ? mapToDomainEntity(deletedItem) : null;
  },
};

