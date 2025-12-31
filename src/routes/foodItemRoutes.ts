import express from 'express';
import * as foodItemController from '../controllers/foodItemController';

const router = express.Router();

router.get('/', foodItemController.getAllFoodItems);
router.post('/', foodItemController.createFoodItem);
router.put('/:id', foodItemController.updateFoodItem);
router.delete('/:id', foodItemController.deleteFoodItem);

export default router;

