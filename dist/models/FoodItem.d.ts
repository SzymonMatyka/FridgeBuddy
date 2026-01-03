import mongoose, { Document } from 'mongoose';
export interface IFoodItem extends Document {
    name: string;
    quantity: number;
    expirationDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
declare const _default: mongoose.Model<IFoodItem, {}, {}, {}, mongoose.Document<unknown, {}, IFoodItem, {}, {}> & IFoodItem & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=FoodItem.d.ts.map