"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodItemRepository = void 0;
const FoodItem_1 = __importDefault(require("../../models/FoodItem"));
const mapToDomainEntity = (mongooseDoc) => {
    return {
        id: mongooseDoc._id.toString(),
        name: mongooseDoc.name,
        quantity: mongooseDoc.quantity,
        expirationDate: mongooseDoc.expirationDate,
        createdAt: mongooseDoc.createdAt,
        updatedAt: mongooseDoc.updatedAt,
    };
};
exports.FoodItemRepository = {
    findAll: async () => {
        const items = await FoodItem_1.default.find().sort({ expirationDate: 1 });
        return items.map(mapToDomainEntity);
    },
    findById: async (id) => {
        const item = await FoodItem_1.default.findById(id);
        return item ? mapToDomainEntity(item) : null;
    },
    create: async (dto) => {
        const item = new FoodItem_1.default({
            name: dto.name,
            quantity: dto.quantity,
            expirationDate: dto.expirationDate,
        });
        const savedItem = await item.save();
        return mapToDomainEntity(savedItem);
    },
    update: async (id, dto) => {
        const updatedItem = await FoodItem_1.default.findByIdAndUpdate(id, dto, { new: true, runValidators: true });
        return updatedItem ? mapToDomainEntity(updatedItem) : null;
    },
    delete: async (id) => {
        const deletedItem = await FoodItem_1.default.findByIdAndDelete(id);
        return deletedItem ? mapToDomainEntity(deletedItem) : null;
    },
};
//# sourceMappingURL=FoodItemRepository.js.map