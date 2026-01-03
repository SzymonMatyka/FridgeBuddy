import express, { Express } from 'express';
import * as foodItemHandlers from '../controllers/handlers/foodItemHandlers';

export const registerRoutes = (app: Express): Express => {
  const apiRouter = express.Router();

  // Health check endpoint
  apiRouter.get('/health', (_req, res) => {
    res.json({ status: 'OK', message: 'Fridge Buddy API is running' });
  });

  // Food items routes
  const foodItemsRouter = express.Router();
  foodItemsRouter.get('/', foodItemHandlers.getAllFoodItems);
  foodItemsRouter.get('/:id', foodItemHandlers.getFoodItemById);
  foodItemsRouter.post('/', foodItemHandlers.createFoodItem);
  foodItemsRouter.put('/:id', foodItemHandlers.updateFoodItem);
  foodItemsRouter.delete('/:id', foodItemHandlers.deleteFoodItem);

  apiRouter.use('/food-items', foodItemsRouter);
  app.use('/api', apiRouter);

  return app;
};

