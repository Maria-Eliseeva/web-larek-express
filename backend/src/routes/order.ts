import { Router } from 'express';
import createOrder from '../controllers/order';
import validateOrderBusiness from '../middlewares/validateOrderBusiness';
import { validateOrderBody } from '../middlewares/validateOrderBody';

const router = Router();

router.post('/', validateOrderBody, validateOrderBusiness, createOrder);

export default router;
