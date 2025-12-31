import mongoose, { Schema, Document } from 'mongoose';

export interface IFoodItem extends Document {
  name: string;
  quantity: number;
  expirationDate: Date;
}

const FoodItemSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IFoodItem>('FoodItem', FoodItemSchema);

