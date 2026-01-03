"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeUpdateFoodItemDto = exports.normalizeCreateFoodItemDto = exports.validateUpdateFoodItem = exports.validateCreateFoodItem = void 0;
const validateName = (name) => {
    const errors = [];
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
const validateQuantity = (quantity) => {
    const errors = [];
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
const validateExpirationDate = (expirationDate) => {
    const errors = [];
    if (!expirationDate) {
        errors.push({ field: 'expirationDate', message: 'Expiration date is required' });
        return errors;
    }
    const date = expirationDate instanceof Date
        ? expirationDate
        : new Date(expirationDate);
    if (isNaN(date.getTime())) {
        errors.push({ field: 'expirationDate', message: 'Expiration date must be a valid date' });
    }
    return errors;
};
const validateCreateFoodItem = (dto) => {
    const errors = [
        ...validateName(dto.name),
        ...validateQuantity(dto.quantity),
        ...validateExpirationDate(dto.expirationDate),
    ];
    return {
        isValid: errors.length === 0,
        errors,
    };
};
exports.validateCreateFoodItem = validateCreateFoodItem;
const validateUpdateFoodItem = (dto) => {
    const errors = [];
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
exports.validateUpdateFoodItem = validateUpdateFoodItem;
const normalizeCreateFoodItemDto = (dto) => {
    const quantity = typeof dto.quantity === 'string' ? parseFloat(dto.quantity) : Number(dto.quantity);
    const expirationDate = dto.expirationDate instanceof Date
        ? dto.expirationDate
        : new Date(dto.expirationDate);
    return {
        name: dto.name.trim(),
        quantity,
        expirationDate,
    };
};
exports.normalizeCreateFoodItemDto = normalizeCreateFoodItemDto;
const normalizeUpdateFoodItemDto = (dto) => {
    const normalized = {};
    if (dto.name !== undefined) {
        normalized.name = dto.name.trim();
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
exports.normalizeUpdateFoodItemDto = normalizeUpdateFoodItemDto;
//# sourceMappingURL=foodItemService.js.map