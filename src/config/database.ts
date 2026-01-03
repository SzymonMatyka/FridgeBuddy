import mongoose from 'mongoose';

export const connectDatabase = async (mongoUri: string): Promise<void> => {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

