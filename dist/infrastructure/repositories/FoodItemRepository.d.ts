import { FoodItem, CreateFoodItemDto, UpdateFoodItemDto } from '../../domain/entities/FoodItem';
export interface IFoodItemRepository {
    findAll(): Promise<FoodItem[]>;
    findById(id: string): Promise<FoodItem | null>;
    create(dto: CreateFoodItemDto): Promise<FoodItem>;
    update(id: string, dto: UpdateFoodItemDto): Promise<FoodItem | null>;
    delete(id: string): Promise<FoodItem | null>;
}
export declare const FoodItemRepository: IFoodItemRepository;
//# sourceMappingURL=FoodItemRepository.d.ts.map